import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="prose prose-gray max-w-none">
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: BlockObjectResponse }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4">
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3">
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-xl font-bold mt-4 mb-2">
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="ml-4 list-disc">
          <RichText richText={block.bulleted_list_item.rich_text} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="ml-4 list-decimal">
          <RichText richText={block.numbered_list_item.rich_text} />
        </li>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto my-4">
          <code className="text-sm">
            {block.code.rich_text.map((t) => t.plain_text).join("")}
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-8 border-gray-200" />;

    case "image":
      const src =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption?.[0]?.plain_text || "";
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption} className="rounded-lg w-full" />
          {caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      // TODO: Add support for more block types as needed (toggle, callout, table, etc.)
      return null;
  }
}

interface RichTextItem {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
  };
  href: string | null;
}

function RichText({ richText }: { richText: RichTextItem[] }) {
  if (!richText || richText.length === 0) {
    return null;
  }

  return (
    <>
      {richText.map((text, index) => {
        let content: React.ReactNode = text.plain_text;

        if (text.annotations.bold) {
          content = <strong key={"b" + index}>{content}</strong>;
        }
        if (text.annotations.italic) {
          content = <em key={"i" + index}>{content}</em>;
        }
        if (text.annotations.strikethrough) {
          content = <del key={"s" + index}>{content}</del>;
        }
        if (text.annotations.underline) {
          content = <u key={"u" + index}>{content}</u>;
        }
        if (text.annotations.code) {
          content = (
            <code key={"c" + index} className="bg-gray-100 px-1 rounded text-sm">
              {content}
            </code>
          );
        }
        if (text.href) {
          content = (
            <a
              key={"a" + index}
              href={text.href}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return <span key={index}>{content}</span>;
      })}
    </>
  );
}
