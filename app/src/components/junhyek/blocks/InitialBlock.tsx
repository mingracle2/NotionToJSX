import { NotionBasicBlock, NotionRichText } from "@/type/notion.type.junhyek";
import { addColorAndCodeClass, classNames } from "@/utils/functions";

interface InitialBlockProps {
  className: string;
  block: NotionBasicBlock;
}

const InitialBlock = ({ className, block }: InitialBlockProps) => {
  return (
    <div>
      <div key={block.id} className={classNames("", className)}>
        {block[block.type]?.rich_text?.map(
          (text: NotionRichText, index: number) => {
            return (
              <a
                key={text?.plain_text + block?.id + index}
                href={text.href}
                className={addColorAndCodeClass(text, block[block.type].color)}
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
    </div>
  );
};

export default InitialBlock;
