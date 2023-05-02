import { NotionBlockAllDoc } from "@/type/notion.type";
import { getNotionBlocks } from "@/utils/getNotionBlocks";
import { useEffect, useState } from "react";
import NotionBlock from "./notionBlock";

export interface NotionBlockListProps {
  targetId: string;
}

const NotionBlockList = ({ targetId }: NotionBlockListProps) => {
  const [notionBlocks, setNotionBlocks] = useState<NotionBlockAllDoc[]>([]);
  const [numberOfIndents, setNumberOfIndents] = useState(0);

  useEffect(() => {
    const getNotionData = async () => {
      const notionBlockList: NotionBlockAllDoc[] = await getNotionBlocks(
        targetId
      );
      // notionBlockList.forEach((block) => {
      //   console.log(block.type);
      // });
      setNotionBlocks(notionBlockList);
    };
    getNotionData();
  }, [targetId]);

  if (!notionBlocks) {
    return <>No Blocks</>;
  }

  return (
    <>
      {notionBlocks.map((block) => (
        <NotionBlock block={block} key={block.id} />
      ))}
    </>
  );
};

export default NotionBlockList;
