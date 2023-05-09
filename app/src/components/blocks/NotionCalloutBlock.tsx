import { NotionCalloutBlockDoc, NotionRichText } from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCalloutBlockProps {
  className?: string;
  block: NotionCalloutBlockDoc;
}

const NotionCalloutBlock = ({ className, block }: NotionCalloutBlockProps) => {
  return (
    <div>
      <span className={classNames("notion-page-icon", "notion-emoji")}>
        {block?.[block.type].icon.emoji}
      </span>
      <span key={block.id} className="notion-callout-text">
        {block[block.type].rich_text.map(
          (text: NotionRichText, index: number) => {
            return (
              <a
                key={text.plain_text + block.id + index}
                href={text.href}
                className={classNames(
                  addColorAndCodeClass(text, block[block.type].color)
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
      </span>
    </div>
  );
};

export default NotionCalloutBlock;
