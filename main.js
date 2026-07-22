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

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
