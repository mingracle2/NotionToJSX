import { NotionDividerBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionDBlockProps {
  className?: string;
  block: NotionDividerBlockDoc;
}

const NotionDBlock = ({ className, block }: NotionDBlockProps) => {
  return <hr className="notion-hr" />;
};

export default NotionDBlock;
