import { notionBlockNamesDoc } from "@/type/blockNames.type";
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

  const notionBlockList: NotionAllTypes[] = [];
  blockResponse.results.map((result: NotionAllTypes) => {
    let blockType: notionBlockNamesDoc = result.type;
    switch (blockType) {
      case notionBlockNamesDoc.PARAGRAPH:
      case notionBlockNamesDoc.QUOTE:
      case notionBlockNamesDoc.BULLETED_LIST_ITEM:
      case notionBlockNamesDoc.NUMBERED_LIST_ITEM:
      case notionBlockNamesDoc.TOGGLE:
        const textTypeBlock: NotionAllTypes = result;
        notionBlockList.push(textTypeBlock);
        break;
      case notionBlockNamesDoc.HEADING_1:
      case notionBlockNamesDoc.HEADING_2:
      case notionBlockNamesDoc.HEADING_3:
        const headingBlock: NotionAllTypes = result;
        notionBlockList.push(headingBlock);
        break;
      case notionBlockNamesDoc.TO_DO:
        const todoBlock: NotionAllTypes = result;
        notionBlockList.push(todoBlock);
        break;
      case notionBlockNamesDoc.CODE:
        const codeBlock: NotionAllTypes = result;
        notionBlockList.push(codeBlock);
        break;
      case notionBlockNamesDoc.CALLOUT:
        const calloutBlock: NotionAllTypes = result;
        notionBlockList.push(calloutBlock);
        break;
      case notionBlockNamesDoc.DIVIDER:
        const dividerBlock: NotionAllTypes = result;
        notionBlockList.push(dividerBlock);
        break;
      default:
    }
  });
  return notionBlockList;
};
