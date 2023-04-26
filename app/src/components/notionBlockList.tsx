import { notionBlockNamesDoc } from "@/type/blockNames.type";
import {
  NotionTextTypedoc,
  NotionHeadingDoc,
  NotionTodoDoc,
  NotionCodeDoc,
  NotionCalloutDoc,
  NotionDividerDoc,
  NotionAllTypes,
  NotionRichTextDoc,
} from "@/type/notion.type";
import { getNotionBlocks } from "@/utils/getNotionBlocks";
import { useCallback, useEffect, useState } from "react";
import NotionBlock from "./notionBlock";

export interface NotionBlockListProps {
  targetId: string;
}

const NotionBlockList = ({ targetId }: NotionBlockListProps) => {
  const [notionBlocks, setNotionBlocks] = useState<NotionAllTypes[]>([]);

  useEffect(() => {
    const getNotionData = async () => {
      const notionBlockList: NotionAllTypes[] = await getNotionBlocks(targetId);
      setNotionBlocks(notionBlockList);
    };
    getNotionData();
  }, [targetId]);

  if (!notionBlocks) {
    return <>List</>;
  }

  return (
    <>
      {notionBlocks.map((block, index) => (
        <NotionBlock block={block} key={block.id} />
      ))}
    </>
  );
};

export default NotionBlockList;
