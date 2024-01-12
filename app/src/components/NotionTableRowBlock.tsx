import {
  BlockTypes,
  NotionBasicBlockDoc,
  NotionRichText,
} from "../../types/notion.type";
import { cn } from "../../utils/functions";
import { addColorAndCodeClass, addColorClass } from "../../utils/functions";

interface NotionTableRowBlockProps {
  className?: string;
  block: NotionBasicBlockDoc;
  has_column_header: boolean;
  has_row_header: boolean;
  is_first_row: boolean;
}

const NotionTableRowBlock = ({
  className,
  block,
  has_column_header,
  has_row_header,
  is_first_row,
}: NotionTableRowBlockProps) => {
  return (
    <tr
      className={cn(
        addColorClass(block[block.type].color),
        className || "",
        "notion-to-jsx",
        "notion-simple-table",
        is_first_row && has_column_header ? " bg-gray-300" : ""
      )}
      style={
        is_first_row && has_column_header ? { background: "#87837826" } : {}
      }
    >
      {block[block.type].cells.map((cells: NotionRichText[], index: number) => {
        return (
          <td
            key={block.id + index}
            className={cn(has_row_header && index === 0 ? "bg-gray-300" : "")}
          >
            {cells.map((text: NotionRichText, index: number) => {
              const brString = text.plain_text.replace(/\n/g, "<br>");
              return (
                <a
                  key={text.plain_text + block.id + index}
                  href={text.href}
                  className={
                    text.href
                      ? cn(
                          addColorAndCodeClass(text, block[block.type].color),
                          "notion-href"
                        )
                      : addColorAndCodeClass(text, block[block.type].color)
                  }
                  style={{
                    ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                    ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
                    ...(text.annotations.underline
                      ? { textDecoration: "underline" }
                      : {}),
                    ...(text.annotations.strikethrough
                      ? { textDecoration: "line-through" }
                      : {}),
                    ...(text.href ? { opacity: "70%" } : {}),
                  }}
                  dangerouslySetInnerHTML={{ __html: brString }}
                ></a>
              );
            })}
          </td>
        );
      })}
    </tr>
  );
};

export default NotionTableRowBlock;
