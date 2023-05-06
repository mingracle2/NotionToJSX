import { NotionBlockAllDoc } from "@/type/notion.type";
import { getNotionBlocks } from "@/utils/getNotionBlocks";
import { useEffect, useState } from "react";
import NotionBlock from "./notionBlock";

export interface NotionBlockListProps {
  targetId: string;
}

const NotionBlockList = ({ targetId }: NotionBlockListProps) => {
  const [notionBlocks, setNotionBlocks] = useState<NotionBlockAllDoc[]>([]);

  useEffect(() => {
    if (targetId) {
      const getNotionData = async () => {
        const notionBlockList: NotionBlockAllDoc[] = await getNotionBlocks(
          targetId
        );
        setNotionBlocks(notionBlockList);
      };
      getNotionData();
    }
  }, [targetId]);

  if (!notionBlocks) {
    return <>No Blocks</>;
  }

  return (
    <ol>
      {notionBlocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </ol>
  );
};

export default NotionBlockList;
