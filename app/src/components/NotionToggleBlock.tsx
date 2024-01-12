import { NotionToggleBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionToggleBlockProps {
  className?: string;
  block: NotionToggleBlockDoc;
}

const NotionToggleBlock = ({
  className = "",
  block,
}: NotionToggleBlockProps) => {
  return (
    <InitialBlock className={cn(className, "inline-block")} block={block} />
  );
};

export default NotionToggleBlock;
