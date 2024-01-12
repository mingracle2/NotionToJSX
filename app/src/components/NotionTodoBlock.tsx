import { NotionTodoBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import { useState } from "react";
import InitialBlock from "./InitialBlock";
import { addColorClass } from "../../utils/functions";

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
    <div className="notion-todo">
      <input
        style={{ marginRight: "5px", marginTop: "1px" }}
        type="checkbox"
        id="checkbox"
        name=""
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <div
        className={
          className
            ? cn(addColorClass(block[block.type].color), className)
            : cn(addColorClass(block[block.type].color))
        }
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
            <InitialBlock
              className={className ? cn(className) : ""}
              block={block}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotionTodoBlock;
