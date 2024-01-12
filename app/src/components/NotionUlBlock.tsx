import { NotionBulletedListItemBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionUlBlockProps {
  className?: string;
  block: NotionBulletedListItemBlockDoc;
}

const NotionUlBlock = ({ className, block }: NotionUlBlockProps) => {
  return (
    <li key={block.id}>
      <InitialBlock className={className ? cn(className) : ""} block={block} />
    </li>
  );
};

export default NotionUlBlock;
