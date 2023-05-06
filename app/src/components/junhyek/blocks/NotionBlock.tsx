import { BlockTypes, NotionBasicBlock } from "@/type/notion.type.junhyek";
import { getNotionBlocks } from "@/utils/junhyek/getNotionBlocks";
import { useCallback, useEffect, useState } from "react";
import NotionTodoBlock from "./NotionTodoBlock";
import NotionPBlock from "./NotionPBlock";
import NotionH1Block from "./NotionH1Block";

const renderBlock = (block: NotionBasicBlock) => {
  switch (block.type) {
    case BlockTypes.paragraph:
      return <NotionPBlock block={block} />;
    case BlockTypes.bulleted_list_item:
    case BlockTypes.callout:
    case BlockTypes.code:
    case BlockTypes.numbered_list_item:
    case BlockTypes.quote:
    case BlockTypes.toggle:
    case BlockTypes.divider:
    case BlockTypes.image:
    case BlockTypes.video:
    case BlockTypes.embed:
    case BlockTypes.column_list:
    case BlockTypes.column:
    case BlockTypes.bookmark:
    case BlockTypes.heading_1:
      return <NotionH1Block block={block} />;
    case BlockTypes.heading_2:
    case BlockTypes.heading_3:
    case BlockTypes.to_do:
      return <NotionTodoBlock block={block} />;
    default:
      return <div>{block.type}</div>;
  }
};

interface NotionAsyncBlockProps {
  pageId?: string; // page id로 불러오는 경우,
  block?: NotionBasicBlock; // block data로 불러오는 경우,
}

/* useEffect를 통해 async로 자식 Block 을 불러오는 Component 입니다 */
export const NotionAsyncBlock = ({ pageId, block }: NotionAsyncBlockProps) => {
  const [childrenBlocks, setChildrenBlocks] = useState<NotionBasicBlock[]>([]);

  const fetchChildren = useCallback(async (blockId: string) => {
    const blocks = await getNotionBlocks(blockId);
    console.log({ blocks });
    setChildrenBlocks(() => blocks);
  }, []);

  useEffect(() => {
    if (block?.has_children && block?.id) {
      fetchChildren(block.id);
    }
  }, [block]);

  useEffect(() => {
    if (pageId) {
      fetchChildren(pageId);
    }
  }, [pageId]);

  return (
    <>
      {/* Render Block */}
      {block && renderBlock(block)}
      {/* Render Children */}
      {childrenBlocks.map((childBlock) => {
        return <NotionBlock block={childBlock} />;
      })}
    </>
  );
};

interface AsyncNotionBlock extends NotionBasicBlock {
  childrenBlocks: AsyncNotionBlock[];
}

interface NotionSyncBlockProps {
  block: AsyncNotionBlock; // 자식 block 들이 포함된 block 입니다.
}

/* TODO. SSR을 위해 모든 children을 재귀로 호출하여 결합한 JSON을 만들어 아래 Component에 주입합니다. */
export const NotionSyncBlock = ({ block }: NotionSyncBlockProps) => {
  return (
    <>
      {/* Render Block */}
      {block && renderBlock(block)}
      {/* Render Children */}
      {block.childrenBlocks.map((childBlock) => {
        return <NotionBlock block={childBlock} />;
      })}
    </>
  );
};
const NotionBlock = NotionAsyncBlock; // SSR을 위해 NotionSyncBlock을 개발하여 변경합니다. 필요에 따라 import하여 사용할 수 있도록 합니다.

export default NotionBlock;
