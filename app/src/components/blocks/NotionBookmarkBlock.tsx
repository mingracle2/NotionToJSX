import {
  NotionBookmarkBlockDoc,
  NotionImageBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import InitialBlock from "./InitialBlock";

interface NotionBookmarkBlockProps {
  className?: string;
  block: NotionBookmarkBlockDoc;
}

const NotionBookmarkBlock = ({
  className,
  block,
}: NotionBookmarkBlockProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="notion-bookmark"
      href={block.bookmark.url}
    >
      <div className="notion-bookmark-title">{block.bookmark.url}</div>
    </a>
  );
};

export default NotionBookmarkBlock;
