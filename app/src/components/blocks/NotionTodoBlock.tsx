import { NotionTodoBlockDoc } from "@/type/notion.type";
import { addColorClass, classNames } from "@/utils/functions";
import { useState } from "react";
import InitialBlock from "./InitialBlock";

interface NotionTodoBlockProps {
  className?: string;
  block: NotionTodoBlockDoc;
}

const NotionTodoBlock = ({ className, block }: NotionTodoBlockProps) => {
  const [isChecked, setIsChecked] = useState(block.to_do.checked);
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div
      style={{
        paddingTop: "2.5px",
        paddingBottom: "2.5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        style={{ marginRight: "5px", marginTop: "1px" }}
        type="checkbox"
        id="checkbox"
        name=""
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <div
        className={classNames(
          addColorClass(block[block.type].color),
          className
        )}
      >
        {block[block.type].rich_text.length === 0 ? (
          <br></br>
        ) : (
          <div
            key={block.id}
            style={
              isChecked
                ? {
                    textDecoration: "line-through",
                    textDecorationColor: "#999DA0",
                  }
                : {}
            }
          >
            <InitialBlock className={classNames(className)} block={block} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotionTodoBlock;
