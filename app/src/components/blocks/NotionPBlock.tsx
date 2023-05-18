import { NotionParagraphBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionPBlockProps {
  className?: string;
  block: NotionParagraphBlockDoc;
}

const NotionPBlock = ({ className, block }: NotionPBlockProps) => {
  return (
    <InitialBlock
      className={classNames("notion-page", className)}
      block={block}
    />
  );
};

export default NotionPBlock;
