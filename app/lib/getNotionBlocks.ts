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
  NotionTableBlockDoc,
  NotionTableRowBlockDoc,
} from "@/type/notion.type";

export const getNotionBlocks = async (targetId: string) => {
  // Call API and receive response
  const blockResponse = await (
    await fetch(
      "https://notion-to-jsx-git-minki-serversideprops-mingracle2.vercel.app/api/notion/notionBlockContent",
      {
        method: "POST",
        body: JSON.stringify({ value: targetId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  const notionBlockList: NotionBasicBlockDoc[] = [];
  blockResponse.results.map((result: NotionBasicBlockDoc) => {
    const blockType: BlockTypes = result.type;
    // console.log(result.id + " " + blockType);
    switch (blockType) {
      case BlockTypes.paragraph:
        notionBlockList.push(result as NotionParagraphBlockDoc);
        break;
      case BlockTypes.quote:
        notionBlockList.push(result as NotionQuoteBlockDoc);
        break;
      case BlockTypes.bulleted_list_item:
        notionBlockList.push(result as NotionBulletedListItemBlockDoc);
        break;
      case BlockTypes.numbered_list_item:
        notionBlockList.push(result as NotionNumberedListItemBlockDoc);
        break;
      case BlockTypes.toggle:
        notionBlockList.push(result as NotionToggleBlockDoc);
        break;
      case BlockTypes.heading_1:
        notionBlockList.push(result as NotionHeading1BlockDoc);
        break;
      case BlockTypes.heading_2:
        notionBlockList.push(result as NotionHeading2BlockDoc);
        break;
      case BlockTypes.heading_3:
        notionBlockList.push(result as NotionHeading3BlockDoc);
        break;
      case BlockTypes.to_do:
        notionBlockList.push(result as NotionTodoBlockDoc);
        break;
      case BlockTypes.code:
        notionBlockList.push(result as NotionCodeBlockDoc);
        break;
      case BlockTypes.callout:
        notionBlockList.push(result as NotionCalloutBlockDoc);
        break;
      case BlockTypes.divider:
        notionBlockList.push(result as NotionDividerBlockDoc);
        break;
      case BlockTypes.image:
        notionBlockList.push(result as NotionImageBlockDoc);
        break;
      case BlockTypes.video:
        notionBlockList.push(result as NotionVideoBlockDoc);
        break;
      case BlockTypes.embed:
        notionBlockList.push(result as NotionEmbedBlockDoc);
        break;
      case BlockTypes.column_list:
        notionBlockList.push(result as NotionColumnListBlockDoc);
        break;
      case BlockTypes.column:
        notionBlockList.push(result as NotionColumnBlockDoc);
        break;
      case BlockTypes.bookmark:
        notionBlockList.push(result as NotionBookmarkBlockDoc);
        break;
      case BlockTypes.link_preview:
        notionBlockList.push(result as NotionLinkPreviewBlockDoc);
        break;
      case BlockTypes.table:
        notionBlockList.push(result as NotionTableBlockDoc);
        break;
      case BlockTypes.table_row:
        notionBlockList.push(result as NotionTableRowBlockDoc);
        break;
      default:
    }
  });

  return notionBlockList;
};
