import {
  NotionBookmarkBlockDoc,
  NotionImageBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import { useState } from "react";
import InitialBlock from "./InitialBlock";

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

  fetch(`${window.location.origin}/api/notion/meta?url=${block.bookmark.url}`)
    .then((response) => response.json())
    .then((result) => {
      setLink(result.ogUrl ? result.ogUrl : result.requestUrl);
      result.ogTitle
        ? setTitle(result.ogTitle)
        : setTitle(result.ogUrl ? result.ogUrl : result.requestUrl);
      setDescription(result.ogDescription);
      setImage(result.ogImage?.url);
    });

  return (
    <div className="notion-row">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classNames("notion-bookmark")}
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
