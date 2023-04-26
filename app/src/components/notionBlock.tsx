import { notionBlockNamesDoc } from "@/type/blockNames.type";
import {
  NotionTextTypedoc,
  NotionHeadingDoc,
  NotionTodoDoc,
  NotionCodeDoc,
  NotionCalloutDoc,
  NotionDividerDoc,
  NotionAllTypes,
  NotionRichTextDoc,
} from "@/type/notion.type";
import NotionBlockList from "./notionBlockList";

export interface NotionBlockProps {
  block: NotionAllTypes;
}

const NotionBlock = ({ block }: NotionBlockProps) => {
  const blockType: string =
    block.type === notionBlockNamesDoc.BULLETED_LIST_ITEM
      ? "notion-list notion-list-disc"
      : block.type === notionBlockNamesDoc.CALLOUT
      ? "notion-callout notion-callout-text"
      : block.type === notionBlockNamesDoc.CODE
      ? "notion-code"
      : block.type === notionBlockNamesDoc.HEADING_1
      ? "notion-h1"
      : block.type === notionBlockNamesDoc.HEADING_2
      ? "notion-h1"
      : block.type === notionBlockNamesDoc.HEADING_3
      ? "notion-h1"
      : block.type === notionBlockNamesDoc.NUMBERED_LIST_ITEM
      ? "notion-list notion-list-numbered"
      : block.type === notionBlockNamesDoc.PARAGRAPH
      ? "notion"
      : block.type === notionBlockNamesDoc.QUOTE
      ? "notion-quote"
      : block.type === notionBlockNamesDoc.TO_DO
      ? "notion"
      : block.type === notionBlockNamesDoc.TOGGLE
      ? "notion-toggle"
      : "notion";
  const classIs = "notion-red";
  return (
    <div key={block.id}>
      {block[block.type].rich_text.map((text: NotionRichTextDoc) => {
        return (
          <div className={blockType} key={text.plain_text}>
            {text.plain_text}
          </div>
        );
      })}
      <NotionBlockList targetId={block.id} />
    </div>
  );
};

export default NotionBlock;
