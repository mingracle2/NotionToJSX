import {
  BlockTypes,
  NotionBasicBlockDoc,
  NotionImageMetaDoc,
  SyncNotionBlockDoc,
} from "../../types/notion.type";
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
import NotionTableRowBlock from "./NotionTableRowBlock";
import { cn, addColorClass } from "../../utils/functions";

const renderBlock = (block: any, imageMetaData: NotionImageMetaDoc[]) => {
  switch (block.type) {
    case BlockTypes.paragraph:
      return <NotionPBlock key={block.id} block={block} />;
    case BlockTypes.quote:
      return <NotionQuoteBlock key={block.id} block={block} />;
    case BlockTypes.bulleted_list_item:
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
      return (
        <NotionImageBlock
          key={block.id}
          block={block}
          imageMetaData={imageMetaData}
        />
      );
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

interface NotionBlockProps {
  pageId?: string;
  // isAsync: boolean;
  block?: NotionBasicBlockDoc | SyncNotionBlockDoc; // 자식 block 들이 포함된 block 입니다.
  syncBlocks?: SyncNotionBlockDoc[];
  imageMetaData: NotionImageMetaDoc[];
}

/* TODO. SSR을 위해 모든 children을 재귀로 호출하여 결합한 JSON을 만들어 아래 Component에 주입합니다. */
export const NotionBlock = ({
  pageId,
  block,
  syncBlocks,
  imageMetaData,
}: NotionBlockProps) => {
  const [childrenBlocks, setChildrenBlocks] = useState<
    NotionBasicBlockDoc[] | SyncNotionBlockDoc[]
  >(syncBlocks || block?.childrenBlocks || []);

  const togglable: boolean =
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

  return block ? (
    <span>
      {togglable ? (
        <details className="notion-toggle">
          <summary>
            <span>{renderBlock(block, imageMetaData)}</span>
          </summary>
          <div>
            {childrenBlocks.map(
              (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
                return (
                  <NotionBlock
                    key={childBlock.id}
                    block={childBlock}
                    imageMetaData={imageMetaData}
                  />
                );
              }
            )}
          </div>
        </details>
      ) : isColumnList ? (
        <div className="notion-row">
          {childrenBlocks.map(
            (
              childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc,
              index: number
            ) => {
              return (
                <div
                  key={childBlock.id + index}
                  style={{
                    ...(index === 0 ? {} : { marginLeft: "15px" }),
                    flex: 1,
                  }}
                >
                  <NotionBlock
                    key={childBlock.id}
                    block={childBlock}
                    imageMetaData={imageMetaData}
                  />
                </div>
              );
            }
          )}
        </div>
      ) : isColumn ? (
        <div className="notion-column">
          {childrenBlocks.map(
            (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
              return (
                <NotionBlock
                  key={childBlock.id}
                  block={childBlock}
                  imageMetaData={imageMetaData}
                />
              );
            }
          )}
        </div>
      ) : isCallout ? (
        <div
          className={cn(
            addColorClass(block[block.type].color),
            "notion-callout"
          )}
        >
          {renderBlock(block, imageMetaData)}
          <div style={{ paddingLeft: "34px" }}>
            {childrenBlocks.map(
              (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
                return (
                  <NotionBlock
                    key={childBlock.id}
                    block={childBlock}
                    imageMetaData={imageMetaData}
                  />
                );
              }
            )}
          </div>
        </div>
      ) : isTable ? (
        <div className={cn("w-[100%] overflow-x-auto")}>
          <table className={cn("notion-simple-table ")}>
            <tbody>
              {childrenBlocks.map(
                (
                  childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc,
                  index: number
                ) => {
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
        </div>
      ) : isUl ? (
        <>
          {renderBlock(block, imageMetaData)}
          <ul>
            {childrenBlocks.map(
              (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
                return (
                  <NotionBlock
                    key={childBlock.id}
                    block={childBlock}
                    imageMetaData={imageMetaData}
                  />
                );
              }
            )}
          </ul>
        </>
      ) : (
        <>
          {/* Render Block */}
          {renderBlock(block, imageMetaData)}
          {/* Render Children */}
          <div style={{ marginLeft: "25px" }}>
            {childrenBlocks.map(
              (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
                return (
                  <NotionBlock
                    key={childBlock.id}
                    block={childBlock}
                    imageMetaData={imageMetaData}
                  />
                );
              }
            )}
          </div>
        </>
      )}
    </span>
  ) : pageId ? (
    <>
      {childrenBlocks.map(
        (childBlock: NotionBasicBlockDoc | SyncNotionBlockDoc) => {
          return (
            <NotionBlock
              key={childBlock.id}
              block={childBlock}
              imageMetaData={imageMetaData}
            />
          );
        }
      )}
    </>
  ) : (
    <></>
  );
};

export default NotionBlock;
