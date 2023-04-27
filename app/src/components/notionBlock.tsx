import { NotionBlockNamesDoc } from "@/type/blockNames.type";
import { NotionAllTypes } from "@/type/notion.type";
import {
  NotionBulletedListItemBlock,
  NotionCalloutBlock,
  NotionCodeBlock,
  NotionHeading1Block,
  NotionHeading2Block,
  NotionHeading3Block,
  NotionNumberedListItemBlock,
  NotionParagraphBlock,
  NotionQuoteBlock,
  NotionTodoBlock,
  NotionToggleBlock,
  NotionDividerBlock,
  NotionImageBlock,
  NotionColumnListBlock,
  NotionColumnBlock,
} from "@/utils/notionBlockClasses";

export interface NotionBlockProps {
  block: NotionAllTypes;
}

const NotionBlock = ({ block }: NotionBlockProps) => {
  switch (block.type) {
    case NotionBlockNamesDoc.BULLETED_LIST_ITEM:
      const bulletedListItemBlock = new NotionBulletedListItemBlock(block);
      return bulletedListItemBlock.renderTextJsx();
    case NotionBlockNamesDoc.CALLOUT:
      const calloutBlock = new NotionCalloutBlock(block);
      return calloutBlock.renderTextJsx();
    case NotionBlockNamesDoc.CODE:
      const codeBlock = new NotionCodeBlock(block);
      return codeBlock.renderTextJsx();
    case NotionBlockNamesDoc.HEADING_1:
      const heading1Block = new NotionHeading1Block(block);
      return heading1Block.renderTextJsx();
    case NotionBlockNamesDoc.HEADING_2:
      const heading2Block = new NotionHeading2Block(block);
      return heading2Block.renderTextJsx();
    case NotionBlockNamesDoc.HEADING_3:
      const heading3Block = new NotionHeading3Block(block);
      return heading3Block.renderTextJsx();
    case NotionBlockNamesDoc.NUMBERED_LIST_ITEM:
      const numberedListBlock = new NotionNumberedListItemBlock(block);
      return numberedListBlock.renderTextJsx();
    case NotionBlockNamesDoc.PARAGRAPH:
      const paragraphBlock = new NotionParagraphBlock(block);
      return paragraphBlock.renderTextJsx();
    case NotionBlockNamesDoc.QUOTE:
      const quoteBlock = new NotionQuoteBlock(block);
      return quoteBlock.renderTextJsx();
    case NotionBlockNamesDoc.TO_DO:
      const todoBlock = new NotionTodoBlock(block);
      return todoBlock.renderTextJsx();
    case NotionBlockNamesDoc.TOGGLE:
      const toggleBlock = new NotionToggleBlock(block);
      return toggleBlock.renderTextJsx();
    case NotionBlockNamesDoc.DIVIDER:
      const dividerBlock = new NotionDividerBlock(block);
      return dividerBlock.getChild();
    case NotionBlockNamesDoc.IMAGE:
      const imageBlock = new NotionImageBlock(block);
      return imageBlock.getImage();
    case NotionBlockNamesDoc.COLUMN_LIST:
      const columnListBlock = new NotionColumnListBlock(block);
      return columnListBlock.renderColumnList();
    case NotionBlockNamesDoc.COLUMN:
      const columnBlock = new NotionColumnBlock(block);
      return columnBlock.renderColumn();
    default:
      return <div></div>;
  }
};

export default NotionBlock;
