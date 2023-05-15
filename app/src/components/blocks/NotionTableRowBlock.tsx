import {
  BlockTypes,
  NotionBasicBlockDoc,
  NotionRichText,
} from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";

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
      className={classNames(
        addColorClass(block[block.type].color),
        className,
        "notion",
        "notion-simple-table"
      )}
      style={
        is_first_row && has_column_header ? { background: "#87837826" } : {}
      }
    >
      {block[block.type].cells.map((cells: NotionRichText[], index: number) => {
        return (
          <td
            key={block.id + index}
            style={
              has_row_header && index === 0 ? { background: "#87837826" } : {}
            }
          >
            {cells.map((text: NotionRichText, index: number) => {
              const brString = text.plain_text.replace(/\n/g, "<br>");
              return (
                <a
                  key={text.plain_text + block.id + index}
                  href={text.href}
                  className={addColorAndCodeClass(
                    text,
                    block[block.type].color
                  )}
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
