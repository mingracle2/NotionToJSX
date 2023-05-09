import { NotionTodoBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionTodoBlockProps {
  className?: string;
  block: NotionTodoBlockDoc;
}

const NotionTodoBlock = ({ className, block }: NotionTodoBlockProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        style={{ marginRight: "5px", marginTop: "1px" }}
        type="checkbox"
        id="checkbox"
        name=""
      />
      <InitialBlock className={classNames(className)} block={block} />
    </div>
  );
};

export default NotionTodoBlock;
