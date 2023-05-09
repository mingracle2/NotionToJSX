import { NotionEmbedBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionEmbedBlockProps {
  className?: string;
  block: NotionEmbedBlockDoc;
}

const NotionEmbedBlock = ({ className, block }: NotionEmbedBlockProps) => {
  const getEmbedUrl = () => {
    return block.embed.url;
  };
  return (
    <figure className="notion-asset-wrapper">
      <iframe width="100%" height="500" src={getEmbedUrl()} />
    </figure>
  );
};

export default NotionEmbedBlock;
