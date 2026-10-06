import type { MDXComponents } from "mdx/types";
import { isValidElement } from "react";
import { Code } from "@/components/mdx/Code";
import { S, Note, Flow, Illustrative } from "@/components/mdx/Blocks";

type CodeProps = { className?: string; children?: string };

/** Fenced code blocks become build-time-highlighted <Code>. A title can follow the language: ```python title=src/x.py */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    S,
    Note,
    Flow,
    Illustrative,
    Code,
    pre: ({ children }) => {
      if (!isValidElement<CodeProps>(children)) return <pre>{children}</pre>;
      const lang = (children.props.className ?? "language-text").replace("language-", "");
      return <Code code={String(children.props.children ?? "")} lang={lang} />;
    },
  };
}
