import {
  BlockTypes,
  NotionBasicBlockDoc,
  NotionRichText,
} from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";

interface InitialBlockProps {
  className: string;
  block: NotionBasicBlockDoc;
}

const InitialBlock = ({ className, block }: InitialBlockProps) => {
  return (
    <div>
      {block[block.type].rich_text.length === 0 ? (
        <br></br>
      ) : (
        <pre
          key={block.id}
          style={{ whiteSpace: "pre-wrap" }}
          className={classNames(
            addColorClass(block[block.type].color),
            className,
            "notion"
          )}
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

export default InitialBlock;
