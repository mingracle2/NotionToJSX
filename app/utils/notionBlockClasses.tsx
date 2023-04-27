import NotionBlockList from "@/src/components/notionBlockList";
import { NotionAllTypes, NotionRichTextDoc } from "@/type/notion.type";
import { addColorAndCodeClass, classNames } from "./functions";

export class NotionBasicBlock {
  block: NotionAllTypes;
  className: string;
  constructor(block: NotionAllTypes) {
    this.block = block;
    this.className = "";
  }
  getBlockDetails = () => {
    return this.block[this.block.type];
  };
}

export class NotionTextTypeBlock extends NotionBasicBlock {
  renderinitialBlock = () => {
    return (
      <div>
        <div key={this.block.id} className={this.className}>
          {this.block[this.block.type].rich_text.map(
            (text: NotionRichTextDoc, index: number) => {
              return (
                <span
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
                </span>
              );
            }
          )}
        </div>
        <NotionBlockList targetId={this.block.id} />
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
    return this.renderinitialBlock();
  };
}

export class NotionNumberedListItemBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames(
      "notion-list",
      "notion-list-numbered",
      this.className
    );
    return this.renderinitialBlock();
  };
}

export class NotionCalloutBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames(
      "notion-callout",
      "notion-callout-text",
      this.className
    );
    return this.renderinitialBlock();
  };
}

export class NotionCodeBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-code", this.className);
    return this.renderinitialBlock();
  };
}

export class NotionHeading1Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h1", this.className);
    return this.renderinitialBlock();
  };
}

export class NotionHeading2Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h2", this.className);
    return this.renderinitialBlock();
  };
}

export class NotionHeading3Block extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-h3", this.className);
    return this.renderinitialBlock();
  };
}

export class NotionParagraphBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    return this.renderinitialBlock();
  };
}

export class NotionQuoteBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-quote", this.className);
    return this.renderinitialBlock();
  };
}

export class NotionTodoBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    return this.renderinitialBlock();
  };
}

export class NotionToggleBlock extends NotionTextTypeBlock {
  renderTextJsx = () => {
    this.className = classNames("notion-toggle", this.className);
    return this.renderinitialBlock();
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
  getImage = () => {
    return (
      <div key={this.block.id}>
        <figure className="notion-asset-wrapper">
          <img src={this.block.image[this.block.image.type].url} />
        </figure>
        <NotionBlockList targetId={this.block.id} />
      </div>
    );
  };
}

export class NotionColumnListBlock extends NotionBasicBlock {
  renderColumnList = () => {
    return (
      <div className="notion-row" style={{ display: "flex" }}>
        <NotionBlockList targetId={this.block.id} />
      </div>
    );
  };
}

export class NotionColumnBlock extends NotionBasicBlock {
  renderColumn = () => {
    return (
      <>
        <div className="notion-column">
          <NotionBlockList targetId={this.block.id} />
        </div>
        <div className="notion-spacer" style={{ width: 40 }} />
      </>
    );
  };
}
