import {
  BlockTypes,
  NotionHeading2BlockDoc,
  NotionToggleBlockDoc,
} from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH2BlockProps {
  className?: string;
  block: NotionHeading2BlockDoc;
}

const NotionH2Block = ({ className, block }: NotionH2BlockProps) => {
  const toggleblock: NotionToggleBlockDoc = {
    ...block,
    type: BlockTypes.toggle,
    toggle: {
      rich_text: block.heading_2.rich_text,
      color: block.heading_2.color,
    },
  };
  return (
    <>
      {block.heading_2.is_toggleable && (
        <NotionToggleBlock
          className={cn("notion-h2", className || "")}
          block={toggleblock}
        />
      )}
      {!block.heading_2.is_toggleable && (
        <InitialBlock
          className={cn("notion-h2", className || "")}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH2Block;
