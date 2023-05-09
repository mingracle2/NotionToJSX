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
    // console.log(result.id + " " + blockType);
    switch (blockType) {
      case BlockTypes.paragraph:
        const paragraphBlock = result as NotionParagraphBlockDoc;
        notionBlockList.push(paragraphBlock);
        break;
      case BlockTypes.quote:
        const quoteBlock = result as NotionQuoteBlockDoc;
        notionBlockList.push(quoteBlock);
        break;
      case BlockTypes.bulleted_list_item:
        const bulletedListItemBlock = result as NotionBulletedListItemBlockDoc;
        notionBlockList.push(bulletedListItemBlock);
        break;
      case BlockTypes.numbered_list_item:
        const numberedListItemBlock = result as NotionNumberedListItemBlockDoc;
        notionBlockList.push(numberedListItemBlock);
        break;
      case BlockTypes.toggle:
        const toggleBlock = result as NotionToggleBlockDoc;
        notionBlockList.push(toggleBlock);
        break;
      case BlockTypes.heading_1:
        const heading1Block = result as NotionHeading1BlockDoc;
        notionBlockList.push(heading1Block);
        break;
      case BlockTypes.heading_2:
        const heading2Block = result as NotionHeading2BlockDoc;
        notionBlockList.push(heading2Block);
        break;
      case BlockTypes.heading_3:
        const heading3Block = result as NotionHeading3BlockDoc;
        notionBlockList.push(heading3Block);
        break;
      case BlockTypes.to_do:
        const todoBlock = result as NotionTodoBlockDoc;
        notionBlockList.push(todoBlock);
        break;
      case BlockTypes.code:
        const codeBlock = result as NotionCodeBlockDoc;
        notionBlockList.push(codeBlock);
        break;
      case BlockTypes.callout:
        const calloutBlock = result as NotionCalloutBlockDoc;
        notionBlockList.push(calloutBlock);
        break;
      case BlockTypes.divider:
        const dividerBlock = result as NotionDividerBlockDoc;
        notionBlockList.push(dividerBlock);
        break;
      case BlockTypes.image:
        const imageBlock = result as NotionImageBlockDoc;
        notionBlockList.push(imageBlock);
        break;
      case BlockTypes.video:
        const videoBlock = result as NotionVideoBlockDoc;
        notionBlockList.push(videoBlock);
        break;
      case BlockTypes.embed:
        const embedBlock = result as NotionEmbedBlockDoc;
        notionBlockList.push(embedBlock);
        break;
      case BlockTypes.column_list:
        const columnListBlock = result as NotionColumnListBlockDoc;
        notionBlockList.push(columnListBlock);
        break;
      case BlockTypes.column:
        const columnBlock = result as NotionColumnBlockDoc;
        notionBlockList.push(columnBlock);
        break;
      case BlockTypes.bookmark:
        const bookmarkBlock = result as NotionBookmarkBlockDoc;
        notionBlockList.push(bookmarkBlock);
        break;
      case BlockTypes.link_preview:
        const linkPreviewBlock = result as NotionLinkPreviewBlockDoc;
        notionBlockList.push(linkPreviewBlock);
      default:
    }
  });

  return notionBlockList;
};
