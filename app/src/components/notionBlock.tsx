import { notionBlockNamesDoc } from "@/type/blockNames.type";
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
} from "@/utils/notionBlockClasses";

export interface NotionBlockProps {
  block: NotionAllTypes;
}

const NotionBlock = ({ block }: NotionBlockProps) => {
  switch (block.type) {
    case notionBlockNamesDoc.BULLETED_LIST_ITEM:
      const bulletedListItemBlock = new NotionBulletedListItemBlock(block);
      return bulletedListItemBlock.getTextJsx();
    case notionBlockNamesDoc.CALLOUT:
      const calloutBlock = new NotionCalloutBlock(block);
      return calloutBlock.getTextJsx();
    case notionBlockNamesDoc.CODE:
      const codeBlock = new NotionCodeBlock(block);
      return codeBlock.getTextJsx();
    case notionBlockNamesDoc.HEADING_1:
      const heading1Block = new NotionHeading1Block(block);
      return heading1Block.getTextJsx();
    case notionBlockNamesDoc.HEADING_2:
      const heading2Block = new NotionHeading2Block(block);
      return heading2Block.getTextJsx();
    case notionBlockNamesDoc.HEADING_3:
      const heading3Block = new NotionHeading3Block(block);
      return heading3Block.getTextJsx();
    case notionBlockNamesDoc.NUMBERED_LIST_ITEM:
      const numberedListBlock = new NotionNumberedListItemBlock(block);
      return numberedListBlock.getTextJsx();
    case notionBlockNamesDoc.PARAGRAPH:
      const paragraphBlock = new NotionParagraphBlock(block);
      return paragraphBlock.getTextJsx();
    case notionBlockNamesDoc.QUOTE:
      const quoteBlock = new NotionQuoteBlock(block);
      return quoteBlock.getTextJsx();
    case notionBlockNamesDoc.TO_DO:
      const todoBlock = new NotionTodoBlock(block);
      return todoBlock.getTextJsx();
    case notionBlockNamesDoc.TOGGLE:
      const toggleBlock = new NotionToggleBlock(block);
      return toggleBlock.getTextJsx();
    case notionBlockNamesDoc.DIVIDER:
      const dividerBlock = new NotionDividerBlock(block);
      return dividerBlock.getChild();
    case notionBlockNamesDoc.IMAGE:
      console.log("image accessed");
      const imageBlock = new NotionImageBlock(block);
      return imageBlock.getImage();
    default:
      return <></>;
  }
};

export default NotionBlock;
