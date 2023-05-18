import {
  NotionBulletedListItemBlockDoc,
  NotionRichText,
} from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionUlBlockProps {
  className?: string;
  block: NotionBulletedListItemBlockDoc;
}

const NotionUlBlock = ({ className, block }: NotionUlBlockProps) => {
  return (
    <li key={block.id}>
      <InitialBlock className={classNames(className)} block={block} />
    </li>
  );
};

export default NotionUlBlock;
