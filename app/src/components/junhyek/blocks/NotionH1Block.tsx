import { NotionBasicBlock } from "@/type/notion.type.junhyek";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionH1BlockProps {
  className?: string;
  block: NotionBasicBlock;
}

const NotionH1Block = ({ className, block }: NotionH1BlockProps) => {
  return (
    <InitialBlock
      className={classNames("notion-h1", className)}
      block={block}
    />
  );
};

export default NotionH1Block;
