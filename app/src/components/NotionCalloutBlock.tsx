import { NotionCalloutBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCalloutBlockProps {
  className?: string;
  block: NotionCalloutBlockDoc;
}

const NotionCalloutBlock = ({ className, block }: NotionCalloutBlockProps) => {
  return (
    <div style={{ display: "flex" }}>
      <div className={cn("notion-page-icon", "notion-emoji")}>
        {block?.[block.type].icon.emoji}
      </div>
      <InitialBlock
        className={cn("notion-callout-text", className || "")}
        block={block}
      />
    </div>
  );
};

export default NotionCalloutBlock;
