import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  NotionBlockDetailUpdatedDoc,
  NotionTextTypedoc,
  NotionHeadingDoc,
  NotionTodoDoc,
  NotionCodeDoc,
  NotionCalloutDoc,
  NotionDividerDoc,
  NotionAllTypes,
} from "@/type/notion.type";
import BlockRenderer from "@/src/components/notionBlock";
import { notionBlockNamesDoc } from "@/type/blockNames.type";
import NotionBlockList from "@/src/components/notionBlockList";
import NotionBlock from "@/src/components/notionBlockList";

const load = () => {
  return Promise.resolve();
};

const makeJson = async (block) => {
  const blockObject = await load(block.id);
  return {
    childrens: blockObject.childrens.map((block) => makeJson(block)),
  };
};

const Block = ({ id, block }) => {
  const [blocks, setBlocks] = useState();
  const Component = block.type == "a" ? ABlock : BBlock;

  useEffect(() => {
    load(id).then((blocks) => {
      setBlocks(blocks);
    });
  }, []);
  if (!blocks) {
    return <>List</>;
  }
  return (
    <Component>
      {blocks.map((block) => (
        <Block id={block.id} block={block} />
      ))}
    </Component>
  );
};

const IndexPage: React.FC = () => {
  const [pageId, setPageId] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [tempId, setTempId] = useState("");

  const handleInputChange = () => {
    console.log(tempId);
    setPageId(tempId);
  };

  useEffect(() => {
    setApiResponse("Ready");
  }, []);

  return (
    <div className="notion">
      <h1 className="notion-h1">Search Page</h1>
      <input
        type="text"
        value={tempId}
        size={50}
        onChange={(e) => setTempId(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleInputChange}>Search</button>
      {apiResponse && <p>{apiResponse}</p>}
      {pageId && <NotionBlockList targetId={pageId} />}
    </div>
  );
};

export default IndexPage;
