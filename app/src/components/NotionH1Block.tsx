import {
  BlockTypes,
  NotionHeading1BlockDoc,
  NotionToggleBlockDoc,
} from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH1BlockProps {
  className?: string;
  block: NotionHeading1BlockDoc;
}

const NotionH1Block = ({ className, block }: NotionH1BlockProps) => {
  const toggleblock: NotionToggleBlockDoc = {
    ...block,
    type: BlockTypes.toggle,
    toggle: {
      rich_text: block.heading_1.rich_text,
      color: block.heading_1.color,
    },
  };
  return (
    <>
      {block.heading_1.is_toggleable && (
        <NotionToggleBlock
          className={cn("notion-h1", className || "")}
          block={toggleblock}
        />
      )}
      {!block.heading_1.is_toggleable && (
        <InitialBlock
          className={cn("notion-h1", className || "")}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH1Block;
