import {
  NotionBasicBlockDoc,
  BlockTypes,
  NotionHeading1BlockDoc,
  NotionHeading2BlockDoc,
  NotionHeading3BlockDoc,
  NotionTodoBlockDoc,
  NotionBulletedListItemBlockDoc,
  NotionNumberedListItemBlockDoc,
  NotionBookmarkBlockDoc,
  NotionCalloutBlockDoc,
  NotionCodeBlockDoc,
  NotionColumnBlockDoc,
  NotionColumnListBlockDoc,
  NotionDividerBlockDoc,
  NotionEmbedBlockDoc,
  NotionImageBlockDoc,
  NotionParagraphBlockDoc,
  NotionQuoteBlockDoc,
  NotionToggleBlockDoc,
  NotionVideoBlockDoc,
  NotionLinkPreviewBlockDoc,
} from "@/type/notion.type";

export const getNotionBlocks = async (targetId: string) => {
  // Call API and receive response
  const blockResponse = await (
    await fetch("/api/notion/notionBlockContent", {
      method: "POST",
      body: JSON.stringify({ value: targetId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  const notionBlockList: any[] = [];
  blockResponse.results.map((result: any, index: Number) => {
    const blockType: BlockTypes = result.type;
    console.log(result.id + " " + blockType);
    switch (blockType) {
      case BlockTypes.paragraph:
        const paragraphBlock: NotionParagraphBlockDoc = result;
        notionBlockList.push(paragraphBlock);
        break;
      case BlockTypes.quote:
        const quoteBlock: NotionQuoteBlockDoc = result;
        notionBlockList.push(quoteBlock);
        break;
      case BlockTypes.bulleted_list_item:
        const bulletedListItemBlock: NotionBulletedListItemBlockDoc = result;
        notionBlockList.push(bulletedListItemBlock);
        break;
      case BlockTypes.numbered_list_item:
        const numberedListItemBlock: NotionNumberedListItemBlockDoc = result;
        notionBlockList.push(numberedListItemBlock);
        break;
      case BlockTypes.toggle:
        const toggleBlock: NotionToggleBlockDoc = result;
        notionBlockList.push(toggleBlock);
        break;
      case BlockTypes.heading_1:
        const heading1Block: NotionHeading1BlockDoc = result;
        notionBlockList.push(heading1Block);
        break;
      case BlockTypes.heading_2:
        const heading2Block: NotionHeading2BlockDoc = result;
        notionBlockList.push(heading2Block);
        break;
      case BlockTypes.heading_3:
        const heading3Block: NotionHeading3BlockDoc = result;
        notionBlockList.push(heading3Block);
        break;
      case BlockTypes.to_do:
        const todoBlock: NotionTodoBlockDoc = result;
        notionBlockList.push(todoBlock);
        break;
      case BlockTypes.code:
        const codeBlock: NotionCodeBlockDoc = result;
        notionBlockList.push(codeBlock);
        break;
      case BlockTypes.callout:
        const calloutBlock: NotionCalloutBlockDoc = result;
        notionBlockList.push(calloutBlock);
        break;
      case BlockTypes.divider:
        const dividerBlock: NotionDividerBlockDoc = result;
        notionBlockList.push(dividerBlock);
        break;
      case BlockTypes.image:
        const imageBlock: NotionImageBlockDoc = result;
        notionBlockList.push(imageBlock);
        break;
      case BlockTypes.video:
        const videoBlock: NotionVideoBlockDoc = result;
        notionBlockList.push(videoBlock);
        break;
      case BlockTypes.embed:
        const embedBlock: NotionEmbedBlockDoc = result;
        notionBlockList.push(embedBlock);
        break;
      case BlockTypes.column_list:
        const columnListBlock: NotionColumnListBlockDoc = result;
        notionBlockList.push(columnListBlock);
        break;
      case BlockTypes.column:
        const columnBlock: NotionColumnBlockDoc = result;
        notionBlockList.push(columnBlock);
        break;
      case BlockTypes.bookmark:
        const bookmarkBlock: NotionBookmarkBlockDoc = result;
        notionBlockList.push(bookmarkBlock);
        break;
      case BlockTypes.link_preview:
        const linkPreviewBlock: NotionLinkPreviewBlockDoc = result;
        notionBlockList.push(linkPreviewBlock);
      default:
    }
  });

  return notionBlockList;
};
