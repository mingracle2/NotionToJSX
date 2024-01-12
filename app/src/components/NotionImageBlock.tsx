import {
  NotionBasicBlockDoc,
  NotionImageBlockDoc,
  NotionImageMetaDoc,
  NotionRenderedContent,
  NotionRichText,
  NotionTextColors,
} from "../../types/notion.type";
import { cn, addColorAndCodeClass } from "../../utils/functions";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface NotionImageBlockProps {
  className?: string;
  block: NotionImageBlockDoc;
  imageMetaData: NotionImageMetaDoc[];
}

interface ImageSize {
  width: number;
  height: number;
}

const NotionImageBlock = ({
  className,
  block,
  imageMetaData,
}: NotionImageBlockProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    if (block) {
      imageMetaData.forEach((image: NotionImageMetaDoc) => {
        if (image.blockId === block.id) {
          setImageTitle(() => image.imageTitle);
          setImageDescription(() => image.imageDescription);
          setImageUrl(() => image.imageUrl);
        }
      });
    }
  }, [block, imageMetaData]);

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
          <img
            src={imageUrl}
            // className="w-full h-auto"
            width={imageSize.width}
            height={imageSize.height}
            alt={imageDescription ?? ""}
            style={{ height: "auto" }}
            title={imageTitle}
          />
          // <Image
          //   src={imageUrl}
          //   // className="w-full h-auto"
          //   width={imageSize.width}
          //   height={imageSize.height}
          //   alt={imageDescription ?? ''}
          //   style={{ height: 'auto' }}
          //   priority={true}
          //   title={imageTitle}
          // />
        )}
      </figure>
      {block.image.caption.length !== 0 && (
        <figcaption>
          <pre
            key={block.id}
            className={
              className
                ? cn(className, "notion-to-jsx", "notion-image-caption")
                : cn("notion-to-jsx", "notion-image-caption")
            }
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
