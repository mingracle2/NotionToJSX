import { NotionBlockDetailUpdatedDoc } from "@/type/notion.type";
import React from "react";

const renderNotionBlocks = (blocks: NotionBlockDetailUpdatedDoc[]) => {
  return blocks.map((block) =>
    block.type === "heading_1" ? (
      <h1 className="notion-h1" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </h1>
    ) : block.type === "heading_2" ? (
      <h2 className="notion-h2" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </h2>
    ) : block.type === "heading_3" ? (
      <h3 className="notion-h3" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </h3>
    ) : block.type === "paragraph" ? (
      <div key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : block.type === "quote" ? (
      <div className="notion-quote" key={block.id}>
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : block.type === "bulleted_list_item" ? (
      <div className="notion-list notion-list-disc" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : block.type === "numbered_list_item" ? (
      <div className="notion-list notion-list-number" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : block.type === "to_do" ? (
      <div key={block.id}>
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : block.type === "toggle" ? (
      <div className="notion-toggle" key={block.id}>
        {Array(block.numberOfTabs)
          .fill(null)
          .map((_, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {" "}
            </span>
          ))}
        {block.rich_text[0].plain_text}
        <br />
      </div>
    ) : (
      <div></div>
    )
  );
};

// Example usage in a Next.js component
const BlockRenderer = ({
  blocks,
}: {
  blocks: NotionBlockDetailUpdatedDoc[];
}) => {
  return <div>{renderNotionBlocks(blocks)}</div>;
};

export default BlockRenderer;
