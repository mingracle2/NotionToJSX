import { NotionToggleBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionToggleBlockProps {
  className?: string;
  block: NotionToggleBlockDoc;
}

const NotionToggleBlock = ({ className, block }: NotionToggleBlockProps) => {
  return <InitialBlock className={classNames("", className)} block={block} />;
};

export default NotionToggleBlock;
