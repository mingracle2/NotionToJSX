import {
  BlockTypes,
  NotionHeading1BlockDoc,
  NotionToggleBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";
import NotionToggleBlock from "./NotionToggleBlock";

interface NotionH1BlockProps {
  className?: string;
  block: NotionHeading1BlockDoc;
}

const NotionH1Block = ({ className, block }: NotionH1BlockProps) => {
  const tblock: NotionToggleBlockDoc = {
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
          className={classNames("notion-h1", className)}
          block={tblock}
        />
      )}
      {!block.heading_1.is_toggleable && (
        <InitialBlock
          className={classNames("notion-h1", className)}
          block={block}
        />
      )}
    </>
  );
};

export default NotionH1Block;
