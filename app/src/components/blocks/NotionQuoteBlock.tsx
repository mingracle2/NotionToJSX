import { NotionQuoteBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionQuoteBlockProps {
  className?: string;
  block: NotionQuoteBlockDoc;
}

const NotionQuoteBlock = ({ className, block }: NotionQuoteBlockProps) => {
  return (
    <InitialBlock
      className={classNames("notion-quote", className)}
      block={block}
    />
  );
};

export default NotionQuoteBlock;
