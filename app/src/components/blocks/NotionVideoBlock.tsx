import { NotionVideoBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionVideoBlockProps {
  className?: string;
  block: NotionVideoBlockDoc;
}

const NotionVideoBlock = ({ className, block }: NotionVideoBlockProps) => {
  const getVideoUrl = () => {
    return block.video.type === "file"
      ? block.video.file?.url
      : block.video.external?.url;
  };
  return (
    <figure className="notion-asset-wrapper">
      <iframe width="100%" height="500" src={getVideoUrl()} />
    </figure>
  );
};

export default NotionVideoBlock;
