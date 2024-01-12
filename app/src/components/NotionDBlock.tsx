import { NotionDividerBlockDoc } from '../../types/notion.type';

interface NotionDBlockProps {
  className?: string;
  block: NotionDividerBlockDoc;
}

const NotionDBlock = ({ className, block }: NotionDBlockProps) => {
  return <hr className="notion-hr" />;
};

export default NotionDBlock;
