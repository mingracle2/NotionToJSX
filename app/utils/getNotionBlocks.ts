import { NotionBlockNamesDoc } from "@/type/blockNames.type";
import { NotionAllTypes } from "@/type/notion.type";

export const getNotionBlocks = async (targetId: string) => {
  // Call API and receive response
  const blockResponse = await (
    await fetch("api/notion/notionBlockContent", {
      method: "POST",
      body: JSON.stringify({ value: targetId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  //   console.log(blockResponse);
  const notionBlockList: NotionAllTypes[] = [];
  blockResponse.results.map((result: NotionAllTypes, index: Number) => {
    let blockType: NotionBlockNamesDoc = result.type;
    console.log(result.id + " " + blockType);
    switch (blockType) {
      case NotionBlockNamesDoc.PARAGRAPH:
      case NotionBlockNamesDoc.QUOTE:
      case NotionBlockNamesDoc.BULLETED_LIST_ITEM:
      case NotionBlockNamesDoc.NUMBERED_LIST_ITEM:
      case NotionBlockNamesDoc.TOGGLE:
        const textTypeBlock: NotionAllTypes = result;
        notionBlockList.push(textTypeBlock);
        break;
      case NotionBlockNamesDoc.HEADING_1:
      case NotionBlockNamesDoc.HEADING_2:
      case NotionBlockNamesDoc.HEADING_3:
        const headingBlock: NotionAllTypes = result;
        notionBlockList.push(headingBlock);
        break;
      case NotionBlockNamesDoc.TO_DO:
        const todoBlock: NotionAllTypes = result;
        notionBlockList.push(todoBlock);
        break;
      case NotionBlockNamesDoc.CODE:
        const codeBlock: NotionAllTypes = result;
        notionBlockList.push(codeBlock);
        break;
      case NotionBlockNamesDoc.CALLOUT:
        const calloutBlock: NotionAllTypes = result;
        notionBlockList.push(calloutBlock);
        break;
      case NotionBlockNamesDoc.DIVIDER:
        const dividerBlock: NotionAllTypes = result;
        notionBlockList.push(dividerBlock);
        break;
      case NotionBlockNamesDoc.IMAGE:
        const imageBlock: NotionAllTypes = result;
        notionBlockList.push(imageBlock);
        break;
      case NotionBlockNamesDoc.COLUMN_LIST:
        const columnListBlock: NotionAllTypes = result;
        notionBlockList.push(columnListBlock);
        break;
      case NotionBlockNamesDoc.COLUMN:
        const columnBlock: NotionAllTypes = result;
        notionBlockList.push(columnBlock);
        break;
      default:
    }
  });
  return notionBlockList;
};
