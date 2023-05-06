import { NotionBlockNamesDoc } from "@/type/blockNames.type";
import { NotionBlockAllDoc } from "@/type/notion.type";

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

  //   console.log(blockResponse);
  const notionBlockList: NotionBlockAllDoc[] = [];
  blockResponse.results.map((result: NotionBlockAllDoc, index: Number) => {
    let blockType: NotionBlockNamesDoc = result.type;
    console.log(result.id + " " + blockType);
    switch (blockType) {
      case NotionBlockNamesDoc.PARAGRAPH:
      case NotionBlockNamesDoc.QUOTE:
      case NotionBlockNamesDoc.BULLETED_LIST_ITEM:
      case NotionBlockNamesDoc.NUMBERED_LIST_ITEM:
      case NotionBlockNamesDoc.TOGGLE:
        const textTypeBlock: NotionBlockAllDoc = result;

        notionBlockList.push(textTypeBlock);
        break;
      case NotionBlockNamesDoc.HEADING_1:
      case NotionBlockNamesDoc.HEADING_2:
      case NotionBlockNamesDoc.HEADING_3:
        const headingBlock: NotionBlockAllDoc = result;
        notionBlockList.push(headingBlock);
        break;
      case NotionBlockNamesDoc.TO_DO:
        const todoBlock: NotionBlockAllDoc = result;
        notionBlockList.push(todoBlock);
        break;
      case NotionBlockNamesDoc.CODE:
        const codeBlock: NotionBlockAllDoc = result;
        notionBlockList.push(codeBlock);
        break;
      case NotionBlockNamesDoc.CALLOUT:
        const calloutBlock: NotionBlockAllDoc = result;
        notionBlockList.push(calloutBlock);
        break;
      case NotionBlockNamesDoc.DIVIDER:
        const dividerBlock: NotionBlockAllDoc = result;
        notionBlockList.push(dividerBlock);
        break;
      case NotionBlockNamesDoc.IMAGE:
        const imageBlock: NotionBlockAllDoc = result;
        notionBlockList.push(imageBlock);
        break;
      case NotionBlockNamesDoc.VIDEO:
        const videoBlock: NotionBlockAllDoc = result;
        notionBlockList.push(videoBlock);
        break;
      case NotionBlockNamesDoc.EMBED:
        const embedBlock: NotionBlockAllDoc = result;
        notionBlockList.push(embedBlock);
        break;
      case NotionBlockNamesDoc.COLUMN_LIST:
        const columnListBlock: NotionBlockAllDoc = result;
        notionBlockList.push(columnListBlock);
        break;
      case NotionBlockNamesDoc.COLUMN:
        const columnBlock: NotionBlockAllDoc = result;
        notionBlockList.push(columnBlock);
        break;
      case NotionBlockNamesDoc.BOOKMARK:
        const bookmarkBlock: NotionBlockAllDoc = result;
        notionBlockList.push(bookmarkBlock);
        break;
      default:
    }
  });
  return notionBlockList;
};
