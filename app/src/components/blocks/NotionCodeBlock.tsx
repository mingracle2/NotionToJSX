import { NotionCodeBlockDoc, NotionRichText } from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCodeBlockProps {
  className?: string;
  block: NotionCodeBlockDoc;
}

const NotionCodeBlock = ({ className, block }: NotionCodeBlockProps) => {
  return (
    <div
      className={classNames(
        addColorClass(block[block.type].color),
        className,
        "notion-code"
      )}
    >
      {block[block.type].rich_text.length === 0 ? (
        <br></br>
      ) : (
        <pre key={block.id}>
          {block[block.type].rich_text.map(
            (text: NotionRichText, index: number) => {
              const brString = text.plain_text.replace(/\n/g, "<br>");
              return (
                <a
                  key={text.plain_text + block.id + index}
                  href={text.href}
                  className={addColorAndCodeClass(
                    text,
                    block[block.type].color
                  )}
                  style={{
                    ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                    ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
                    ...(text.annotations.underline
                      ? { textDecoration: "underline" }
                      : {}),
                    ...(text.annotations.strikethrough
                      ? { textDecoration: "line-through" }
                      : {}),
                  }}
                  dangerouslySetInnerHTML={{ __html: brString }}
                ></a>
              );
            }
          )}
        </pre>
      )}
    </div>
  );
};

export default NotionCodeBlock;
