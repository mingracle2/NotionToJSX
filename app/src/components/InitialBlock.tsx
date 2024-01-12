import { cn } from "../../utils/functions";
import {
  NotionBasicBlockDoc,
  NotionRichText,
  SyncNotionBlockDoc,
} from "../../types/notion.type";
import { addColorAndCodeClass, addColorClass } from "../../utils/functions";

interface InitialBlockProps {
  className: string;
  block: NotionBasicBlockDoc | SyncNotionBlockDoc;
}

const InitialBlock = ({ className, block }: InitialBlockProps) => {
  if (block[block.type]?.rich_text.length === 0) return <br />;
  return (
    <pre
      style={{ whiteSpace: "pre-wrap" }}
      className={cn(
        "notion-to-jsx",
        addColorClass(block[block.type].color),
        className
      )}
    >
      {block[block.type].rich_text.map(
        (text: NotionRichText, index: number) => {
          const brString = text.plain_text.replace(/\n/g, "<br>");
          const style = {
            ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
            ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
            ...(text.annotations.underline
              ? { textDecoration: "underline" }
              : {}),
            ...(text.annotations.strikethrough
              ? { textDecoration: "line-through" }
              : {}),
            ...(text.annotations.code ? {} : { margin: "-3px -2px" }),
          };
          if (!text.href) {
            return (
              <span
                key={text.plain_text + block.id + index}
                className={cn(
                  addColorAndCodeClass(text, block[block.type].color)
                )}
                style={style}
                dangerouslySetInnerHTML={{ __html: brString }}
              />
            );
          }
          return (
            <a
              key={text.plain_text + block.id + index}
              href={text.href}
              className={cn(
                addColorAndCodeClass(text, block[block.type].color),
                text.href ? "notion-href" : ""
              )}
              style={style}
              dangerouslySetInnerHTML={{ __html: brString }}
            />
          );
        }
      )}
    </pre>
  );
};

export default InitialBlock;
