import { NotionBookmarkBlockDoc } from "../../types/notion.type";
import { cn } from "../../utils/functions";
import { useEffect, useState } from "react";

interface NotionBookmarkBlockProps {
  className?: string;
  block: NotionBookmarkBlockDoc;
}

const NotionBookmarkBlock = ({
  className,
  block,
}: NotionBookmarkBlockProps) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${window.location.origin}/api/meta?url=${block.bookmark.url}`)
      .then((response) => response.json())
      .then((result) => {
        setLink(result.ogUrl ? result.ogUrl : result.requestUrl);
        result.ogTitle
          ? setTitle(result.ogTitle)
          : setTitle(result.ogUrl ? result.ogUrl : result.requestUrl);
        setDescription(result.ogDescription);
        setImage(result.ogImage?.url);
      });
  }, [block.bookmark.url]);

  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={cn("notion-bookmark")}
        href={link}
      >
        <div>
          <div className="notion-bookmark-title">{title}</div>
          {description && (
            <div className="notion-bookmark-description">{description}</div>
          )}

          <div className="notion-bookmark-link">
            <div>{link}</div>
          </div>
        </div>
        {image && (
          <div className="notion-bookmark-image">
            <img src={image} />
          </div>
        )}
      </a>
    </div>
  );
};

export default NotionBookmarkBlock;
