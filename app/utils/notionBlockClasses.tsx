import NotionBlockList from "@/src/components/notionBlockList";
import { colorType } from "@/type/color.type";
import { NotionBlockAllDoc, NotionRichTextDoc } from "@/type/notion.type";
import { addColorAndCodeClass, classNames } from "./functions";

export class NotionBasicBlock {
  block: NotionBlockAllDoc;
  className: string;
  constructor(block: NotionBlockAllDoc) {
    this.block = block;
    this.className = "";
  }
  renderChildren = () => {
    return (
      <>
        <NotionBlockList targetId={this.block.id} />
      </>
    );
  };
}

export class NotionTextTypeBlock extends NotionBasicBlock {
  renderInitialBlock = () => {
    return (
      <div>
        <div key={this.block.id} className={this.className}>
          {this.block[this.block.type].rich_text.map(
            (text: NotionRichTextDoc, index: number) => {
              return (
                <a
                  href={text.href}
                  className={addColorAndCodeClass(
                    text,
                    this.block[this.block.type].color
                  )}
                  key={text.plain_text + this.block.id + index}
                  style={{
                    ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                    ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
                    ...(text.annotations.underline
                      ? { textDecoration: "underline" }
                      : {}),
                    ...(text.annotations.strikethrough
                      ? { textDecoration: "line-through" }
                      : {}),
                  }}
                >
                  {text.plain_text}
                </a>
              );
            }
          )}
        </div>
        <>{this.renderChildren()}</>
      </div>
    );
  };
}

export class NotionBulletedListItemBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames(
      "notion-list",
      "notion-list-disc",
      this.className
    );
    return (
      <div>
        <ul>
          {/* <li key={this.block.id} className={this.className}> */}
          <li>
            {this.block[this.block.type].rich_text.map(
              (text: NotionRichTextDoc, index: number) => {
                return (
                  <a
                    href={text.href}
                    className={addColorAndCodeClass(
                      text,
                      this.block[this.block.type].color
                    )}
                    key={text.plain_text + this.block.id + index}
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
                    }}
                  >
                    {text.plain_text}
                  </a>
                );
              }
            )}
          </li>
        </ul>
        {this.renderChildren()}
        {/* </li> */}
      </div>
    );
  };
}

export class NotionNumberedListItemBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames(
      "notion-list",
      "notion-list-numbered",
      this.className
    );
    return (
      <li>
        {this.block[this.block.type].rich_text.map(
          (text: NotionRichTextDoc, index: number) => {
            return (
              <a
                href={text.href}
                className={addColorAndCodeClass(
                  text,
                  this.block[this.block.type].color
                )}
                key={text.plain_text + this.block.id + index}
                style={{
                  ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                  ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
                  ...(text.annotations.underline
                    ? { textDecoration: "underline" }
                    : {}),
                  ...(text.annotations.strikethrough
                    ? { textDecoration: "line-through" }
                    : {}),
                }}
              >
                {text.plain_text}
              </a>
            );
          }
        )}
        <ol>{this.renderChildren()}</ol>
      </li>
    );
  };
}

export class NotionCalloutBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames(
      "notion-callout",
      "notion-callout-text",
      this.className
    );
    return this.renderInitialBlock();
  };
}

export class NotionCodeBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-code", this.className);
    return this.renderInitialBlock();
  };
}

export class NotionHeading1Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h1", this.className);
    return this.renderInitialBlock();
  };
}

export class NotionHeading2Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h2", this.className);
    return this.renderInitialBlock();
  };
}

export class NotionHeading3Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h3", this.className);
    return this.renderInitialBlock();
  };
}

export class NotionParagraphBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    return this.renderInitialBlock();
  };
}

export class NotionQuoteBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-quote", this.className);
    return this.renderInitialBlock();
  };
}

export class NotionTodoBlock extends NotionTextTypeBlock {
  renderTodoBox = () => {
    return (
      <div>
        <input
          style={{ float: "left" }}
          type="checkbox"
          id="checkbox"
          name=""
        />
        {this.renderInitialBlock()}
      </div>
    );
  };
}

export class NotionToggleBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-toggle", this.className);
    return (
      <details className="notion-toggle">
        <summary key={this.block.id} className={this.className}>
          {this.block[this.block.type].rich_text.map(
            (text: NotionRichTextDoc, index: number) => {
              return (
                <a
                  href={text.href}
                  className={addColorAndCodeClass(
                    text,
                    this.block[this.block.type].color
                  )}
                  key={text.plain_text + this.block.id + index}
                  style={{
                    ...(text.annotations.bold ? { fontWeight: "bold" } : {}),
                    ...(text.annotations.italic ? { fontStyle: "italic" } : {}),
                    ...(text.annotations.underline
                      ? { textDecoration: "underline" }
                      : {}),
                    ...(text.annotations.strikethrough
                      ? { textDecoration: "line-through" }
                      : {}),
                  }}
                >
                  {text.plain_text}
                </a>
              );
            }
          )}
        </summary>
        <div>{this.renderChildren()}</div>
      </details>
    );
  };
}

export class NotionDividerBlock extends NotionBasicBlock {
  getChild = () => {
    return (
      <div key={this.block.id}>
        <hr className="notion-hr" />
        <NotionBlockList targetId={this.block.id} />
      </div>
    );
  };
}

export class NotionImageBlock extends NotionBasicBlock {
  getImageUrl = () => {
    return this.block.image?.type === "file"
      ? this.block.image?.file?.url
      : this.block.image?.external?.url;
  };
  getImage = () => {
    return (
      <div key={this.block.id}>
        <figure className="notion-asset-wrapper">
          <img src={this.getImageUrl()} />
        </figure>
        <>{this.renderChildren()}</>
      </div>
    );
  };
}

export class NotionVideoBlock extends NotionBasicBlock {
  getVideoUrl = () => {
    return this.block.video?.type === "file"
      ? this.block.video?.file?.url
      : this.block.video?.external?.url;
  };
  renderVideo = () => {
    return (
      <div key={this.block.id}>
        <figure className="notion-asset-wrapper">
          <iframe width="100%" height="500" src={this.getVideoUrl()} />
        </figure>
        <>{this.renderChildren()}</>
      </div>
    );
  };
}

export class NotionEmbedBlock extends NotionBasicBlock {
  getEmbedUrl = () => {
    return this.block.embed?.url;
  };
  renderEmbed = () => {
    return (
      <div key={this.block.id}>
        <figure className="notion-asset-wrapper">
          <iframe width="100%" height="500" src={this.getEmbedUrl()} />
        </figure>
        <>{this.renderChildren()}</>
      </div>
    );
  };
}

export class NotionColumnListBlock extends NotionBasicBlock {
  renderColumnList = () => {
    return <div className="notion-row">{this.renderChildren()}</div>;
  };
}

export class NotionColumnBlock extends NotionBasicBlock {
  renderColumn = () => {
    return (
      <>
        <div className="notion-column" style={{ flex: 1, maxWidth: "100%" }}>
          {this.renderChildren()}
        </div>
        <div className="notion-spacer" style={{ width: 40 }} />
      </>
    );
  };
}

export class NotionBookmarkBlock extends NotionBasicBlock {
  renderBookmark = () => {
    return (
      <div key={this.block.id} className="notion-row">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="notion-bookmark"
          href={this.block.bookmark?.url}
        >
          <div className="notion-bookmark-title">{this.block.id}</div>
        </a>
        <>{this.renderChildren()}</>
      </div>
    );
  };
}
