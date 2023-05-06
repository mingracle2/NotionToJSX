import { NotionBasicBlock } from "@/type/notion.type.junhyek";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionTodoBlockProps {
  className?: string;
  block: NotionBasicBlock;
}

const NotionTodoBlock = ({ className, block }: NotionTodoBlockProps) => {
  return (
    <div>
      <input style={{ float: "left" }} type="checkbox" id="checkbox" name="" />
      <InitialBlock
        className={classNames("notion-h1", className)}
        block={block}
      />
    </div>
  );
};

export default NotionTodoBlock;
