import {
  NotionBulletedListItemBlockDoc,
  NotionRichText,
} from "@/type/notion.type";
import { addColorAndCodeClass, classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionUlBlockProps {
  className?: string;
  block: NotionBulletedListItemBlockDoc;
}

const NotionUlBlock = ({ className, block }: NotionUlBlockProps) => {
  return (
    <li key={block.id} className={classNames("", className)}>
      <span style={{ marginLeft: "-7px" }}>
        {block[block.type].rich_text.map(
          (text: NotionRichText, index: number) => {
            return (
              <a
                key={text.plain_text + block.id + index}
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
                  ...(text.href ? { opacity: "70%" } : {}),
                  // marginLeft: "-7px",
                }}
              >
                {text.plain_text}
              </a>
            );
          }
        )}
      </span>
    </li>
  );
};

export default NotionUlBlock;
