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

interface NotionImageBlockProps {
  className?: string;
  block: NotionImageBlockDoc;
}

const NotionImageBlock = ({ className, block }: NotionImageBlockProps) => {
  const getImageUrl = () => {
    // block.image.type === "file"
    //   ? console.log(block.image.file?.url)
    //   : console.log(block.image.external?.url);
    return block.image.type === "file"
      ? block.image.file?.url
      : block.image.external?.url;
  };

  return (
    <div>
      <figure className="notion-asset-wrapper">
        <img src={getImageUrl()} />
      </figure>
      {block.image.caption.length !== 0 && (
        <figcaption>
          <pre
            key={block.id}
            style={{ whiteSpace: "pre-wrap" }}
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
