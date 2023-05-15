import {
  NotionLinkPreviewBlockDoc,
  NotionImageBlockDoc,
} from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import { useState } from "react";

interface NotionLinkPreviewBlockProps {
  className?: string;
  block: NotionLinkPreviewBlockDoc;
}

const NotionLinkPreviewBlock = ({
  className,
  block,
}: NotionLinkPreviewBlockProps) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  fetch(
    `${window.location.origin}/api/notion/meta?url=${block.link_preview.url}`
  )
    .then((response) => response.json())
    .then((result) => {
      setLink(result.ogUrl);
      result.ogTitle ? setTitle(result.ogTitle) : setTitle(result.ogUrl);
      setDescription(result.ogDescription);
      setImage(result.ogImage.url);
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

export default NotionLinkPreviewBlock;
