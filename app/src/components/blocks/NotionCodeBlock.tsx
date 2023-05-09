import { NotionCodeBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionCodeBlockProps {
  className?: string;
  block: NotionCodeBlockDoc;
}

const NotionCodeBlock = ({ className, block }: NotionCodeBlockProps) => {
  return (
    <InitialBlock
      className={classNames("notion-code", className)}
      block={block}
    />
  );
};

export default NotionCodeBlock;
