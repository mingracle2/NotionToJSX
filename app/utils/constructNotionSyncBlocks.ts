import { getNotionBlocks } from "./getNotionBlocks";
import { SyncNotionBlockDoc } from "@/src/components/blocks/NotionBlock";
import { NotionBasicBlockDoc } from "@/type/notion.type";

interface ConstructNotionSyncBlocksProps {
  pageId: string;
}

export const constructNotionSyncBlocks = async ({
  pageId,
}: ConstructNotionSyncBlocksProps) => {
  const initialBlocks: NotionBasicBlockDoc[] = await getNotionBlocks(pageId);
  const updatedBlocks: SyncNotionBlockDoc[] = await Promise.all(
    initialBlocks.map(async (block) => {
      const result = await getChildrenBlocks({ block });
      return result;
    })
  );
  //   console.log(updatedBlocks);
  return updatedBlocks;
};

interface GetChildrenBlocksProps {
  block: NotionBasicBlockDoc;
}

const getChildrenBlocks = async ({ block }: GetChildrenBlocksProps) => {
  const childrenBlocks: SyncNotionBlockDoc[] = [];
  await getNotionBlocks(block.id).then((blocks) => {
    blocks.forEach((childBlock) => {
      Promise.resolve(getChildrenBlocks({ block: childBlock })).then((result) =>
        childrenBlocks.push(result)
      );
    });
  });
  const updatedBlock: SyncNotionBlockDoc = {
    ...block,
    childrenBlocks: childrenBlocks,
  };
  return updatedBlock;
};
