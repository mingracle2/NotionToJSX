import { NotionParagraphBlockDoc, NotionRichText } from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionPBlockProps {
  className?: string;
  block: NotionParagraphBlockDoc;
}

const NotionPBlock = ({ className, block }: NotionPBlockProps) => {
  return (
    <div
      className={classNames(addColorClass(block[block.type].color), className)}
      style={{ paddingTop: "2.5px", paddingBottom: "2.5px" }}
    >
      {block[block.type].rich_text.length === 0 ? (
        <br></br>
      ) : (
        <pre
          key={block.id}
          className="notion notion-page"
          style={{ whiteSpace: "pre-line" }}
        >
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

export default NotionPBlock;
