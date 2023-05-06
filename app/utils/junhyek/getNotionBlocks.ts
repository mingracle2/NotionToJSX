import { NotionBasicBlock, BlockTypes } from "@/type/notion.type.junhyek";

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

  const notionBlockList: NotionBasicBlock[] = [];
  blockResponse.results.map((result: NotionBasicBlock, index: Number) => {
    const blockType: BlockTypes = result.type;
    console.log(result.id + " " + blockType);
    switch (blockType) {
      case BlockTypes.paragraph:
      case BlockTypes.quote:
      case BlockTypes.bulleted_list_item:
      case BlockTypes.numbered_list_item:
      case BlockTypes.toggle:
        const textTypeBlock: NotionBasicBlock = result;
        notionBlockList.push(textTypeBlock);
        break;
      case BlockTypes.heading_1:
      case BlockTypes.heading_2:
      case BlockTypes.heading_3:
        const headingBlock: NotionBasicBlock = result;
        notionBlockList.push(headingBlock);
        break;
      case BlockTypes.to_do:
        const todoBlock: NotionBasicBlock = result;
        notionBlockList.push(todoBlock);
        break;
      case BlockTypes.code:
        const codeBlock: NotionBasicBlock = result;
        notionBlockList.push(codeBlock);
        break;
      case BlockTypes.callout:
        const calloutBlock: NotionBasicBlock = result;
        notionBlockList.push(calloutBlock);
        break;
      case BlockTypes.divider:
        const dividerBlock: NotionBasicBlock = result;
        notionBlockList.push(dividerBlock);
        break;
      case BlockTypes.image:
        const imageBlock: NotionBasicBlock = result;
        notionBlockList.push(imageBlock);
        break;
      case BlockTypes.video:
        const videoBlock: NotionBasicBlock = result;
        notionBlockList.push(videoBlock);
        break;
      case BlockTypes.embed:
        const embedBlock: NotionBasicBlock = result;
        notionBlockList.push(embedBlock);
        break;
      case BlockTypes.column_list:
        const columnListBlock: NotionBasicBlock = result;
        notionBlockList.push(columnListBlock);
        break;
      case BlockTypes.column:
        const columnBlock: NotionBasicBlock = result;
        notionBlockList.push(columnBlock);
        break;
      case BlockTypes.bookmark:
        const bookmarkBlock: NotionBasicBlock = result;
        notionBlockList.push(bookmarkBlock);
        break;
      default:
    }
  });

  return notionBlockList;
};
