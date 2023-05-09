import {
  BlockTypes,
  NotionHeading3BlockDoc,
  NotionToggleBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH3BlockProps {
  className?: string;
  block: NotionHeading3BlockDoc;
}

const NotionH3Block = ({ className, block }: NotionH3BlockProps) => {
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
      rich_text: block.heading_3.rich_text,
      color: block.heading_3.color,
    },
  };
  return (
    <>
      {block.heading_3.is_toggleable && (
        <NotionToggleBlock
          className={classNames("notion-h3", className)}
          block={tblock}
        />
      )}
      {!block.heading_3.is_toggleable && (
        <InitialBlock
          className={classNames("notion-h3", className)}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH3Block;
