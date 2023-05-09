import { NotionBasicBlockDoc, NotionRichText } from "@/type/notion.type";
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
    <div
      className={classNames(addColorClass(block[block.type].color), className)}
    >
      {block[block.type].rich_text.length === 0 ? (
        <br></br>
      ) : (
        <div key={block.id}>
          {block[block.type].rich_text.map(
            (text: NotionRichText, index: number) => {
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
                >
                  {text.plain_text}
                </a>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default InitialBlock;
