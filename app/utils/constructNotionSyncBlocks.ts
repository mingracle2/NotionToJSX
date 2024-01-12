import { getNotionBlocks } from './getNotionBlocks';
import { NotionBasicBlockDoc, SyncNotionBlockDoc } from '../types/notion.type';

interface ConstructNotionSyncBlocksProps {
  pageId: string;
}

export const constructNotionSyncBlocks = async ({ pageId }: ConstructNotionSyncBlocksProps) => {
  const initialBlocks: NotionBasicBlockDoc[] = await getNotionBlocks(pageId);
  const updatedBlocks: SyncNotionBlockDoc[] = await Promise.all(
    initialBlocks.map(async (block) => {
      const result = await getChildrenBlocks({ block });
      return result;
    })
  );
  return updatedBlocks;
};

interface GetChildrenBlocksProps {
  block: NotionBasicBlockDoc;
}

const getChildrenBlocks = async ({ block }: GetChildrenBlocksProps) => {
  const initialBlocks: NotionBasicBlockDoc[] = await getNotionBlocks(block.id);
  const childrenBlocks: SyncNotionBlockDoc[] = await Promise.all(
    initialBlocks.map(async (childBlock) => {
      const result = await getChildrenBlocks({ block: childBlock });
      return result;
    })
  );
  const updatedBlock: SyncNotionBlockDoc = {
    ...block,
    childrenBlocks: childrenBlocks,
  };
  return updatedBlock;
};
