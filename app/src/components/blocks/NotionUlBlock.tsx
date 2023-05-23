import { NotionBulletedListItemBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
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
