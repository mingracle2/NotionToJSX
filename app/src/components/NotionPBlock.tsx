import { NotionParagraphBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionPBlockProps {
  className?: string;
  block: NotionParagraphBlockDoc;
}

const NotionPBlock = ({ className, block }: NotionPBlockProps) => {
  return <InitialBlock className={className || ""} block={block} />;
};

export default NotionPBlock;
