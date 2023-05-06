import { NotionBasicBlock } from "@/type/notion.type.junhyek";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionPBlockProps {
  className?: string;
  block: NotionBasicBlock;
}

const NotionPBlock = ({ className, block }: NotionPBlockProps) => {
  return <InitialBlock className={classNames("", className)} block={block} />;
};

export default NotionPBlock;
