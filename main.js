/* main.js — renders project and video cards from data.js. No dependencies. */

(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  function projectCard(p) {
    var chips = (p.stack || [])
      .map(function (s) { return '<li>' + esc(s) + "</li>"; })
      .join("");
    var star = p.featured ? '<span class="badge">Featured</span>' : "";
    return (
      '<article class="card">' +
        '<header class="card-top">' +
          '<h3>' + esc(p.name) + "</h3>" +
          star +
        "</header>" +
        '<p class="card-tag">' + esc(p.tag) + "</p>" +
        '<p class="card-problem"><span>Problem.</span> ' + esc(p.problem) + "</p>" +
        '<p class="card-approach"><span>Approach.</span> ' + esc(p.approach) + "</p>" +
        '<ul class="stack">' + chips + "</ul>" +
        '<a class="card-link" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' +
          "View on GitHub →</a>" +
      "</article>"
    );
  }

  function videoCard(v) {
    if (v.youtube) {
      return (
        '<article class="video">' +
          '<div class="video-frame">' +
            '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.youtube) + '" ' +
              'title="' + esc(v.title) + '" loading="lazy" ' +
              'allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
              "allowfullscreen></iframe>" +
          "</div>" +
          '<h3>' + esc(v.title) + "</h3>" +
          '<p>' + esc(v.blurb) + "</p>" +
        "</article>"
      );
    }
    return (
      '<article class="video video-empty">' +
        '<div class="video-frame placeholder"><span>▶</span></div>' +
        '<h3>' + esc(v.title) + "</h3>" +
        '<p>' + esc(v.blurb) + "</p>" +
      "</article>"
    );
  }

  function render(id, items, fn) {
    var el = document.getElementById(id);
    if (!el) return;
    if (!items || !items.length) {
      el.innerHTML = '<p class="muted">Nothing here yet.</p>';
      return;
    }
    el.innerHTML = items.map(fn).join("");
  }

  render("projects", typeof PROJECTS !== "undefined" ? PROJECTS : [], projectCard);
  render("video-grid", typeof VIDEOS !== "undefined" ? VIDEOS : [], videoCard);

  // All repositories — fetched live from the GitHub API so the list stays current.
  var repoEl = document.getElementById("all-repos");
  if (repoEl) {
    var skip = { "kavya2693": 1 }; // the profile-README repo, not a project
    fetch("https://api.github.com/users/kavya2693/repos?per_page=100&sort=pushed")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        var list = repos
          .filter(function (r) { return !r.fork && !r.archived && !skip[r.name]; })
          .sort(function (a, b) {
            return (b.stargazers_count - a.stargazers_count) ||
                   (new Date(b.pushed_at) - new Date(a.pushed_at));
          });
        repoEl.innerHTML = list.map(function (r) {
          var desc = r.description ? esc(r.description) : "";
          var lang = r.language ? '<span class="lang">' + esc(r.language) + "</span>" : "";
          var star = r.stargazers_count ? "<span>★ " + r.stargazers_count + "</span>" : "";
          return '<a class="repo" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' +
            '<span class="rname">' + esc(r.name) + "</span>" +
            '<span class="rdesc">' + desc + "</span>" +
            '<span class="rmeta">' + lang + star + "</span></a>";
        }).join("") || '<p class="muted">No public repositories.</p>';
      })
      .catch(function () {
        repoEl.innerHTML = '<p class="muted">View all on ' +
          '<a href="https://github.com/kavya2693" target="_blank" rel="noopener" style="color:var(--accent)">GitHub →</a></p>';
      });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
