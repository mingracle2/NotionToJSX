import {
  BlockTypes,
  NotionBasicBlockDoc,
  NotionRichText,
  NotionTableRowBlockDoc,
  SyncNotionBlockDoc,
} from "@/type/notion.type";
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
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import { constructNotionSyncBlocks } from "@/utils/constructNotionSyncBlocks";
import NotionTableRowBlock from "./NotionTableRowBlock";

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
      return <div>{block.id}</div>;
  }
};

interface NotionAsyncBlockProps {
  pageId?: string; // page id로 불러오는 경우,
  block?: NotionBasicBlockDoc; // block data로 불러오는 경우,
}

/* useEffect를 통해 async로 자식 Block 을 불러오는 Component 입니다 */
export const NotionAsyncBlock = ({ pageId, block }: NotionAsyncBlockProps) => {
  const [childrenBlocks, setChildrenBlocks] = useState<NotionBasicBlockDoc[]>(
    []
  );
  const [numOfChildrenBlocks, setNumOfChildrenBlocks] = useState(0);

  const fetchChildren = useCallback(async (blockId: string) => {
    const blocks = await getNotionBlocks(blockId);
    // console.log({ blocks });
    setChildrenBlocks(() => blocks);
    setNumOfChildrenBlocks(blocks.length);
  }, []);

  const needToggle: boolean =
    block?.type === BlockTypes.toggle ||
    ((block?.type === BlockTypes.heading_1 ||
      block?.type === BlockTypes.heading_2 ||
      block?.type === BlockTypes.heading_3) &&
      block[block.type].is_toggleable === true);

  const isColumnList: boolean = block?.type === BlockTypes.column_list;
  const isColumn: boolean = block?.type === BlockTypes.column;
  const isCallout: boolean = block?.type === BlockTypes.callout;

  const widthOfChildrenColumns =
    (
      (100 * (1 - 0.35 * (numOfChildrenBlocks - 1))) /
      numOfChildrenBlocks
    ).toFixed(0) + "%";

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
    <span
      onClick={(e) => {
        e.stopPropagation();
        console.log(block?.id, block?.type, { block });
      }}
    >
      {needToggle ? (
        <details className="notion-toggle">
          <summary style={{ marginLeft: "5px" }}>
            <span>{block && renderBlock(block)}</span>
          </summary>
          <ul>
            {childrenBlocks.map((childBlock) => {
              return (
                <NotionAsyncBlock key={childBlock.id} block={childBlock} />
              );
            })}
          </ul>
        </details>
      ) : isColumnList ? (
        <>
          {childrenBlocks.map((childBlock, index) => {
            return (
              <div
                className="notion-row"
                style={{ flex: 1, width: widthOfChildrenColumns }}
              >
                <NotionAsyncBlock key={childBlock.id} block={childBlock} />
                <div className="notion-spacer" style={{ width: "3.5%" }} />
              </div>
            );
          })}
        </>
      ) : isColumn ? (
        <>
          <div className="notion-column">
            <ul style={{ flex: 1, width: "100%" }}>
              {childrenBlocks.map((childBlock) => {
                return (
                  <NotionAsyncBlock key={childBlock.id} block={childBlock} />
                );
              })}
            </ul>
          </div>
        </>
      ) : isCallout ? (
        <div
          className={classNames(
            addColorClass(block?.[block.type].color),
            "notion-callout"
          )}
        >
          {block && renderBlock(block)}
          {/* Render Children */}
          <div>
            <ul style={{ paddingLeft: "35px" }}>
              {childrenBlocks.map((childBlock) => {
                return (
                  <NotionAsyncBlock key={childBlock.id} block={childBlock} />
                );
              })}
            </ul>
          </div>
        </div>
      ) : block ? (
        <>
          {/* Render Block */}
          {block && renderBlock(block)}
          {/* Render Children */}
          <ul>
            {childrenBlocks.map((childBlock) => {
              return (
                <NotionAsyncBlock key={childBlock.id} block={childBlock} />
              );
            })}
          </ul>
        </>
      ) : (
        <>
          {/* Render Block */}
          {block && renderBlock(block)}
          {/* Render Children */}
          <ul style={{ paddingLeft: "0px" }}>
            {childrenBlocks.map((childBlock) => {
              return (
                <NotionAsyncBlock key={childBlock.id} block={childBlock} />
              );
            })}
          </ul>
        </>
      )}
    </span>
  );
};

interface NotionSyncBlockProps {
  block: SyncNotionBlockDoc; // 자식 block 들이 포함된 block 입니다.
}

/* TODO. SSR을 위해 모든 children을 재귀로 호출하여 결합한 JSON을 만들어 아래 Component에 주입합니다. */
export const NotionSyncBlock = ({ block }: NotionSyncBlockProps) => {
  // console.log(block.id);

  const needToggle: boolean =
    block?.type === BlockTypes.toggle ||
    ((block?.type === BlockTypes.heading_1 ||
      block?.type === BlockTypes.heading_2 ||
      block?.type === BlockTypes.heading_3) &&
      block[block.type].is_toggleable === true);

  const isColumnList: boolean = block?.type === BlockTypes.column_list;
  const isColumn: boolean = block?.type === BlockTypes.column;
  const isCallout: boolean = block?.type === BlockTypes.callout;
  const isTable: boolean = block?.type === BlockTypes.table;
  const isUl: boolean =
    block?.type === BlockTypes.bulleted_list_item ||
    block?.type === BlockTypes.numbered_list_item;

  const numOfChildrenBlocks = block.childrenBlocks.length;

  const widthOfChildrenColumns =
    (
      (100 * (1 - 0.35 * (numOfChildrenBlocks - 1))) /
      numOfChildrenBlocks
    ).toFixed(0) + "%";

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        console.log(block?.id, block?.type, { block });
      }}
    >
      {needToggle ? (
        <details className="notion-toggle">
          <summary style={{ marginLeft: "5px" }}>
            <span>{block && renderBlock(block)}</span>
          </summary>
          <ul>
            {block.childrenBlocks.map((childBlock) => {
              return <NotionSyncBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </details>
      ) : isColumnList ? (
        <div className="notion-row flex space-x-4">
          {block.childrenBlocks.map((childBlock, index) => {
            return (
              <div
                key={childBlock.id + index}
                style={{
                  ...(index === numOfChildrenBlocks - 1
                    ? {}
                    : { marginRight: "15px" }),
                  flex: 1,
                  width: widthOfChildrenColumns,
                }}
              >
                <NotionSyncBlock key={childBlock.id} block={childBlock} />
              </div>
            );
          })}
        </div>
      ) : isColumn ? (
        <>
          <div className="notion-column">
            <ul style={{ flex: 1, width: "100%" }}>
              {block.childrenBlocks.map((childBlock) => {
                return (
                  <NotionSyncBlock key={childBlock.id} block={childBlock} />
                );
              })}
            </ul>
          </div>
        </>
      ) : isCallout ? (
        <div
          className={classNames(
            addColorClass(block?.[block.type].color),
            "notion-callout"
          )}
        >
          {block && renderBlock(block)}
          {/* Render Children */}
          <div>
            <ul style={{ paddingLeft: "35px" }}>
              {block.childrenBlocks.map((childBlock) => {
                return (
                  <NotionSyncBlock key={childBlock.id} block={childBlock} />
                );
              })}
            </ul>
          </div>
        </div>
      ) : isTable ? (
        <table
          className={classNames("notion-simple-table")}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <tbody>
            {block.childrenBlocks.map(
              (childBlock: NotionBasicBlockDoc, index: number) => {
                return (
                  <NotionTableRowBlock
                    key={childBlock.id}
                    block={childBlock}
                    has_column_header={block[block.type].has_column_header}
                    has_row_header={block[block.type].has_row_header}
                    is_first_row={index === 0}
                  />
                );
              }
            )}
          </tbody>
        </table>
      ) : isUl ? (
        <li key={block.id} className={classNames("")}>
          <span style={{ marginLeft: "-7px" }}>
            {block[block.type].rich_text.map(
              (text: NotionRichText, index: number) => {
                return (
                  <a
                    key={text.plain_text + block.id + index}
                    href={text.href}
                    className={addColorAndCodeClass(
                      text,
                      block[block.type].color
                    )}
                    style={{
                      ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                      ...(text.annotations.italic
                        ? { fontStyle: "italic" }
                        : {}),
                      ...(text.annotations.underline
                        ? { textDecoration: "underline" }
                        : {}),
                      ...(text.annotations.strikethrough
                        ? { textDecoration: "line-through" }
                        : {}),
                      ...(text.href ? { opacity: "70%" } : {}),
                      // marginLeft: "-7px",
                    }}
                  >
                    {text.plain_text}
                  </a>
                );
              }
            )}
          </span>
          <ul>
            {block.childrenBlocks.map((childBlock) => {
              return <NotionSyncBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </li>
      ) : block ? (
        <>
          {/* Render Block */}
          {block && renderBlock(block)}
          {/* Render Children */}
          <ul>
            {block.childrenBlocks.map((childBlock) => {
              return <NotionSyncBlock key={childBlock.id} block={childBlock} />;
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </span>
  );
};

const NotionBlock = NotionSyncBlock; // SSR을 위해 NotionSyncBlock을 개발하여 변경합니다. 필요에 따라 import하여 사용할 수 있도록 합니다.

export default NotionBlock;
