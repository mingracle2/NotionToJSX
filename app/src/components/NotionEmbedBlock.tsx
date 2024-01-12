import { NotionEmbedBlockDoc } from '../../types/notion.type';

interface NotionEmbedBlockProps {
  className?: string;
  block: NotionEmbedBlockDoc;
}

const NotionEmbedBlock = ({ className, block }: NotionEmbedBlockProps) => {
  const embedUrl = block.embed.url;
  return (
    <figure className="notion-asset-wrapper">
      <iframe width="100%" height="500" src={embedUrl} />
    </figure>
  );
};

export default NotionEmbedBlock;
