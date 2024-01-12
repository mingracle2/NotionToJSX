import {
  BlockTypes,
  NotionHeading3BlockDoc,
  NotionToggleBlockDoc,
} from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH3BlockProps {
  className?: string;
  block: NotionHeading3BlockDoc;
}

const NotionH3Block = ({ className, block }: NotionH3BlockProps) => {
  const toggleblock: NotionToggleBlockDoc = {
    ...block,
    type: BlockTypes.toggle,
    toggle: {
      rich_text: block.heading_3.rich_text,
      color: block.heading_3.color,
    },
  };
  return (
    <>
      {block.heading_3.is_toggleable && (
        <NotionToggleBlock
          className={cn("notion-h3", className || "")}
          block={toggleblock}
        />
      )}
      {!block.heading_3.is_toggleable && (
        <InitialBlock
          className={cn("notion-h3", className || "")}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH3Block;
