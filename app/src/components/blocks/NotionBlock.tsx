import { BlockTypes, NotionBasicBlockDoc } from "@/type/notion.type";
import { getNotionBlocks } from "@/utils/getNotionBlocks";
import { useCallback, useEffect, useState } from "react";
import NotionTodoBlock from "./NotionTodoBlock";
import NotionPBlock from "./NotionPBlock";
import NotionH1Block from "./NotionH1Block";
import NotionH2Block from "./NotionH2Block";
import NotionH3Block from "./NotionH3Block";
import NotionToggleBlock from "./NotionToggleBlock";
import NotionCalloutBlock from "./NotionCalloutBlock";
import NotionCodeBlock from "./NotionCodeBlock";
import NotionDBlock from "./NotionDBlock";
import NotionImageBlock from "./NotionImageBlock";
import NotionQuoteBlock from "./NotionQuoteBlock";
import NotionVideoBlock from "./NotionVideoBlock";
import NotionEmbedBlock from "./NotionEmbedBlock";
import NotionUlBlock from "./NotionUlBlock";
import NotionBookmarkBlock from "./NotionBookmarkBlock";
import NotionLinkPreviewBlock from "./NotionLinkPreviewBlock";

const renderBlock = (block: any) => {
  switch (block.type) {
    case BlockTypes.paragraph:
      return <NotionPBlock key={block.id} block={block} />;
    case BlockTypes.quote:
      return <NotionQuoteBlock key={block.id} block={block} />;
    case BlockTypes.bulleted_list_item:
      return <NotionUlBlock key={block.id} block={block} />;
    case BlockTypes.numbered_list_item:
      return <NotionUlBlock key={block.id} block={block} />;
    case BlockTypes.toggle:
      return <NotionToggleBlock key={block.id} block={block} />;
    case BlockTypes.heading_1:
      return <NotionH1Block key={block.id} block={block} />;
    case BlockTypes.heading_2:
      return <NotionH2Block key={block.id} block={block} />;
    case BlockTypes.heading_3:
      return <NotionH3Block key={block.id} block={block} />;
    case BlockTypes.to_do:
      return <NotionTodoBlock key={block.id} block={block} />;
    case BlockTypes.code:
      return <NotionCodeBlock key={block.id} block={block} />;
    case BlockTypes.callout:
      return <NotionCalloutBlock key={block.id} block={block} />;
    case BlockTypes.divider:
      return <NotionDBlock key={block.id} block={block} />;
    case BlockTypes.image:
      return <NotionImageBlock key={block.id} block={block} />;
    case BlockTypes.video:
      return <NotionVideoBlock key={block.id} block={block} />;
    case BlockTypes.embed:
      return <NotionEmbedBlock key={block.id} block={block} />;
    case BlockTypes.bookmark:
      return <NotionBookmarkBlock key={block.id} block={block} />;
    case BlockTypes.link_preview:
      return <NotionLinkPreviewBlock key={block.id} block={block} />;
    default:
      return <div>{block.type}</div>;
  }
};

interface NotionAsyncBlockProps {
  pageId?: string; // page id로 불러오는 경우,
  block?: NotionBasicBlockDoc; // block data로 불러오는 경우,
}

/* useEffect를 통해 async로 자식 Block 을 불러오는 Component 입니다 */
export const NotionAsyncBlock = ({ pageId, block }: NotionAsyncBlockProps) => {
  const [childrenBlocks, setChildrenBlocks] = useState<any[]>([]);

  const fetchChildren = useCallback(async (blockId: string) => {
    const blocks = await getNotionBlocks(blockId);
    console.log({ blocks });
    setChildrenBlocks(() => blocks);
  }, []);

  const needToggle: boolean =
    block?.type === BlockTypes.toggle ||
    ((block?.type === BlockTypes.heading_1 ||
      block?.type === BlockTypes.heading_2 ||
      block?.type === BlockTypes.heading_3) &&
      block[block.type].is_toggleable === true);

  const isColumnList: boolean = block?.type === BlockTypes.column_list;
  const isColumn: boolean = block?.type === BlockTypes.column;

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
    <span>
      {needToggle ? (
        <details className="notion-toggle">
          <summary>{block && renderBlock(block)}</summary>
          <ul>
            {childrenBlocks.map((childBlock) => {
              return <NotionBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </details>
      ) : isColumnList ? (
        <div className="notion-row">
          <ul>
            {childrenBlocks.map((childBlock) => {
              return <NotionBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </div>
      ) : isColumn ? (
        <>
          <div className="notion-column" style={{ flex: 1, maxWidth: "100%" }}>
            <ul>
              {childrenBlocks.map((childBlock) => {
                return <NotionBlock key={childBlock.id} block={childBlock} />;
              })}
            </ul>
          </div>
          <div className="notion-spacer" style={{ width: 40 }} />
        </>
      ) : (
        <>
          {/* Render Block */}
          {block && renderBlock(block)}
          {/* Render Children */}
          <ul>
            {childrenBlocks.map((childBlock) => {
              return <NotionBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </>
      )}
    </span>
  );
};

interface AsyncNotionBlockDoc extends NotionBasicBlockDoc {
  childrenBlocks: AsyncNotionBlockDoc[];
}

interface NotionSyncBlockProps {
  block: AsyncNotionBlockDoc; // 자식 block 들이 포함된 block 입니다.
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
