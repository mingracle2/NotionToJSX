import { NotionToggleBlockDoc, NotionRichText } from "@/type/notion.type";
import { addColorAndCodeClass, classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionToggleBlockProps {
  className?: string;
  block: NotionToggleBlockDoc;
}

const NotionToggleBlock = ({ className, block }: NotionToggleBlockProps) => {
  return (
    <span key={block.id} className={className}>
      {block[block.type].rich_text.map(
        (text: NotionRichText, index: number) => {
          return (
            <a
              key={text?.plain_text + block.id + index}
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
    </span>
  );
};

export default NotionToggleBlock;
