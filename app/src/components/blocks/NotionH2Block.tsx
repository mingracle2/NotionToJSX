import {
  BlockTypes,
  NotionHeading2BlockDoc,
  NotionToggleBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH2BlockProps {
  className?: string;
  block: NotionHeading2BlockDoc;
}

const NotionH2Block = ({ className, block }: NotionH2BlockProps) => {
  const tblock: NotionToggleBlockDoc = {
    object: block.object,
    id: block.id,
    parent: block.parent,
    created_time: block.created_time,
    last_edited_time: block.last_edited_time,
    created_by: block.created_by,
    last_edited_by: block.last_edited_by,
    has_children: block.has_children,
    archived: block.archived,
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
          className={classNames("notion-h2", className)}
          block={tblock}
        />
      )}
      {!block.heading_2.is_toggleable && (
        <InitialBlock
          className={classNames("notion-h2", className)}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH2Block;
