import { NotionQuoteBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionQuoteBlockProps {
  className?: string;
  block: NotionQuoteBlockDoc;
}

const NotionQuoteBlock = ({ className, block }: NotionQuoteBlockProps) => {
  return (
    <InitialBlock
      className={className ? cn("notion-quote", className) : cn("notion-quote")}
      block={block}
    />
  );
};

export default NotionQuoteBlock;
