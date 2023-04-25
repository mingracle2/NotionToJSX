import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  NotionBlockBasicDoc,
  NotionBlockDetailDoc,
  NotionBlockDoc,
  NotionBlockDetailUpdatedDoc,
} from "@/type/notion.type";
import BlockRenderer from "@/src/components/blockRenderer";

// const load = () => { return Promise.resolve()}

// const makeJson = async (block) => {
//   const blockObject = await load(block.id);
//   return {
//     childrens: blockObject.childrens.map(block => makeJson(block))
//   }
// }

// const Block = ({id, block}) => {
//   const [blocks, setBlocks] = useState();
//   const Component = block.type == "a" ? ABlock : BBlock;

//   useEffect(() => {
//     load(id).then(blocks => { setBlocks(blocks) })
//   }, []);
//   if (!blocks) {
//     return <>List</>;
//   }
//   return <Component>
//       {blocks.map(block => <Block id={block.id} block={block}/>)}
//     </Component>;
// };

// 오ㅑ

const IndexPage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [blockProperties, setBlockProperties] = useState<
    NotionBlockDetailUpdatedDoc[]
  >([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    setApiResponse("Ready");
  }, [inputText]);

  const getBlocksFromPage = async () => {
    // Call API and receive response
    const blockResponse = await (
      await fetch("api/notion/notionContent", {
        method: "POST",
        body: JSON.stringify({ value: inputText }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    const blockList: NotionBlockDoc[] = blockResponse.results
      ? blockResponse.results
      : "";

    setApiResponse("Loading...Please Wait");
    await getBlockContents(blockList, 0);
    setApiResponse("");
  };

  const getBlockContents = async (
    blockList: NotionBlockDoc[],
    numberOfTabs: number
  ) => {
    let i;
    for (i = 0; i < 1000; i++) {
      const block: NotionBlockDoc = blockList[i];
      if (block) {
        const blockId = block.id;
        const blockHasChild = block.has_children;
        switch (block.type) {
          case "heading_1":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.heading_1,
                numberOfTabs: numberOfTabs,
                type: "heading_1",
                id: blockId,
              },
            ]);
            break;
          case "heading_2":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.heading_1,
                numberOfTabs: numberOfTabs,
                type: "heading_1",
                id: blockId,
              },
            ]);
            break;
          case "heading_3":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.heading_3,
                numberOfTabs: numberOfTabs,
                type: "heading_3",
                id: blockId,
              },
            ]);
            break;
          case "paragraph":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.paragraph,
                numberOfTabs: numberOfTabs,
                type: "paragraph",
                id: blockId,
              },
            ]);
            break;
          case "bulleted_list_item":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.bulleted_list_item,
                numberOfTabs: numberOfTabs,
                type: "bulleted_list_item",
                id: blockId,
              },
            ]);
            break;
          case "numbered_list_item":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.numbered_list_item,
                numberOfTabs: numberOfTabs,
                type: "numbered_list_item",
                id: blockId,
              },
            ]);
            break;
          case "to_do":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.to_do,
                numberOfTabs: numberOfTabs,
                type: "to_do",
                id: blockId,
              },
            ]);
            break;
          case "toggle":
            setBlockProperties((prevBlockProperties) => [
              ...prevBlockProperties,
              {
                ...block.toggle,
                numberOfTabs: numberOfTabs,
                type: "toggle",
                id: blockId,
              },
            ]);
            break;
          default:
        }
        // console.log(blockId + " " + block.type + " " + blockText);
        if (blockHasChild) {
          const childBlockResponse = await (
            await fetch(`/api/notion/notionContent`, {
              method: "POST",
              body: JSON.stringify({ value: blockId }),
              headers: {
                "Content-Type": "application/json",
              },
            })
          ).json();
          const childBlocks: NotionBlockDoc[] = childBlockResponse.results
            ? childBlockResponse.results
            : "";
          await getBlockContents(childBlocks, numberOfTabs + 1);
        }
      }
      // console.log(blockId);
    }
  };

  return (
    <div className="notion">
      <h1 className="notion-h1">Search Page</h1>
      <input
        type="text"
        value={inputText}
        size={50}
        onChange={handleInputChange}
        placeholder="Enter search query"
      />
      <button onClick={getBlocksFromPage}>Search</button>
      {apiResponse && <p>{apiResponse}</p>}
      <BlockRenderer blocks={blockProperties} />
    </div>
  );
};

export default IndexPage;
