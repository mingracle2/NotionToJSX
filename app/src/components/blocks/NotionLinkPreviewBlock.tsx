import {
  NotionLinkPreviewBlockDoc,
  NotionImageBlockDoc,
} from "@/type/notion.type";

interface NotionLinkPreviewBlockProps {
  className?: string;
  block: NotionLinkPreviewBlockDoc;
}

const NotionLinkPreviewBlock = ({
  className,
  block,
}: NotionLinkPreviewBlockProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="notion-bookmark"
      href={block.link_preview.url}
    >
      <div className="notion-bookmark-title">{block.link_preview.url}</div>
    </a>
  );
};

export default NotionLinkPreviewBlock;
