import { NotionCodeBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCodeBlockProps {
  className?: string;
  block: NotionCodeBlockDoc;
}

const NotionCodeBlock = ({ className, block }: NotionCodeBlockProps) => {
  return (
    <InitialBlock
      className={className ? cn("notion-code", className) : cn("notion-code")}
      block={block}
    />
  );
};

export default NotionCodeBlock;
