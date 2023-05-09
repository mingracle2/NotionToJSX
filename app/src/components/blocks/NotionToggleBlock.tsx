import { NotionToggleBlockDoc, NotionRichText } from "@/type/notion.type";
import { addColorAndCodeClass, classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionToggleBlockProps {
  className?: string;
  block: NotionToggleBlockDoc;
}

const NotionToggleBlock = ({ className, block }: NotionToggleBlockProps) => {
  return (
    <div>
      <InitialBlock className={classNames("", className)} block={block} />
    </div>
  );
};

export default NotionToggleBlock;
