import { NotionImageBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionImageBlockProps {
  className?: string;
  block: NotionImageBlockDoc;
}

const NotionImageBlock = ({ className, block }: NotionImageBlockProps) => {
  const getImageUrl = () => {
    // block.image.type === "file"
    //   ? console.log(block.image.file?.url)
    //   : console.log(block.image.external?.url);
    return block.image.type === "file"
      ? block.image.file?.url
      : block.image.external?.url;
  };
  return (
    <figure className="notion-asset-wrapper">
      <img src={getImageUrl()} />
    </figure>
  );
};

export default NotionImageBlock;
