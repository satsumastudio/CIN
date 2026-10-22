import type { ReactNode } from "react";
import { CmsImage } from "@/components/cms-image";

// Renders the rich-text article from Tina. The editor's toolbar is limited
// to subheadings, bold, italic, links, lists, quotes, photos and dividers
// (tina/config.ts), so only those nodes are handled; anything else falls
// back to its text so a stray node can never break the page.

type Node = {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  alt?: string;
  caption?: string;
  children?: Node[];
};

function renderChildren(nodes: Node[] | undefined, keyPrefix: string): ReactNode[] {
  return (nodes ?? []).map((node, i) => renderNode(node, `${keyPrefix}-${i}`));
}

function renderText(node: Node, key: string): ReactNode {
  let out: ReactNode = node.text ?? "";
  if (node.italic) out = <em>{out}</em>;
  if (node.bold) out = <strong>{out}</strong>;
  return <span key={key}>{out}</span>;
}

function renderNode(node: Node, key: string): ReactNode {
  const kids = () => renderChildren(node.children, key);

  switch (node.type) {
    case "text":
      return renderText(node, key);
    case "p": {
      // A photo on its own line arrives wrapped in a paragraph; a <figure>
      // can't sit inside <p>, so lift it out.
      const onlyImages = (node.children ?? []).every(
        (c) => c.type === "img" || (c.type === "text" && !c.text?.trim())
      );
      if (onlyImages && node.children?.some((c) => c.type === "img")) return <div key={key}>{kids()}</div>;
      return <p key={key}>{kids()}</p>;
    }
    case "h2":
      return <h2 key={key}>{kids()}</h2>;
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return <h3 key={key}>{kids()}</h3>;
    case "a": {
      const external = /^https?:\/\//.test(node.url ?? "");
      return (
        <a
          key={key}
          href={node.url}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {kids()}
        </a>
      );
    }
    case "ul":
      return <ul key={key}>{kids()}</ul>;
    case "ol":
      return <ol key={key}>{kids()}</ol>;
    case "li":
      return <li key={key}>{kids()}</li>;
    case "lic":
      return <span key={key}>{kids()}</span>;
    case "blockquote":
      return <blockquote key={key}>{kids()}</blockquote>;
    case "img":
      return node.url ? (
        <figure key={key}>
          <CmsImage
            src={node.url}
            alt={node.alt ?? ""}
            width={1600}
            height={1000}
            sizes="(min-width: 768px) 48rem, 100vw"
            style={{ width: "100%", height: "auto" }}
          />
          {node.caption && <figcaption>{node.caption}</figcaption>}
        </figure>
      ) : null;
    case "hr":
      return <hr key={key} />;
    case "break":
      return <br key={key} />;
    default:
      return node.children ? <span key={key}>{kids()}</span> : null;
  }
}

export function RichText({ content }: { content: unknown }) {
  const root = content as Node | null;
  if (!root?.children?.length) return null;
  return <>{renderChildren(root.children, "rt")}</>;
}
