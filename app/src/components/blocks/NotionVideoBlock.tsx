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
      <iframe
        width="560"
        height="315"
        src={getVideoUrl()}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </figure>
  );
};

export default NotionVideoBlock;
