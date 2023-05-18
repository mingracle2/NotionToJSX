import { NotionCalloutBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCalloutBlockProps {
  className?: string;
  block: NotionCalloutBlockDoc;
}

const NotionCalloutBlock = ({ className, block }: NotionCalloutBlockProps) => {
  return (
    <div style={{ display: "flex" }}>
      <div className={classNames("notion-page-icon", "notion-emoji")}>
        {block?.[block.type].icon.emoji}
      </div>
      <InitialBlock
        className={classNames("notion-callout-text", className)}
        block={block}
      />
    </div>
  );
};

export default NotionCalloutBlock;
