import {
  NotionImageBlockDoc,
  NotionRichText,
  NotionTextColors,
} from "@/type/notion.type";
import {
  addColorAndCodeClass,
  addColorClass,
  classNames,
} from "@/utils/functions";
import Image from "next/image";
import { useEffect, useState } from "react";
import InitialBlock from "./InitialBlock";

interface NotionImageBlockProps {
  className?: string;
  block: NotionImageBlockDoc;
}

interface ImageSize {
  width: number;
  height: number;
}

const NotionImageBlock = ({ className, block }: NotionImageBlockProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);

  useEffect(() => {
    if (block) {
      const rawUrl = block.image.file
        ? block.image.file.url
        : block.image.external
        ? block.image.external.url
        : "";
      setImageUrl(rawUrl);
    }
  }, [block]);

  useEffect(() => {
    if (imageUrl) {
      const getImageSize = async () => {
        try {
          const img = document.createElement("img");
          img.src = imageUrl;

          img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
          };

          img.onerror = (error) => {
            console.error("Error loading image:", error);
          };
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };

      getImageSize();
    }
  }, [imageUrl]);

  return (
    <div>
      <figure className="notion-asset-wrapper">
        {imageUrl && imageSize && (
          <Image
            src={imageUrl}
            // className="w-full h-auto"
            width={imageSize.width}
            height={imageSize.height}
            alt="Description of the image"
            style={{ height: "auto" }}
            priority={true}
          />
        )}
      </figure>
      {block.image.caption.length !== 0 && (
        <figcaption>
          <pre
            key={block.id}
            className={classNames(className, "notion", "notion-image-caption")}
          >
            {block[block.type].caption?.map(
              (text: NotionRichText, index: number) => {
                const brString = text.plain_text.replace(/\n/g, "<br>");
                return (
                  <a
                    key={text.plain_text + block.id + index}
                    href={text.href}
                    className={addColorAndCodeClass(
                      text,
                      NotionTextColors.default
                    )}
                    style={{
                      ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                      ...(text.annotations.italic
                        ? { fontStyle: "italic" }
                        : {}),
                      ...(text.annotations.underline
                        ? { textDecoration: "underline" }
                        : {}),
                      ...(text.annotations.strikethrough
                        ? { textDecoration: "line-through" }
                        : {}),
                      ...(text.href ? { opacity: "70%" } : {}),
                    }}
                    dangerouslySetInnerHTML={{ __html: brString }}
                  ></a>
                );
              }
            )}
          </pre>
        </figcaption>
      )}
    </div>
  );
};

export default NotionImageBlock;
