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
  initialReturn = () => {
    return (
      <div>
        <div key={this.block.id} className={this.className}>
          {this.block[this.block.type].rich_text.map(
            (text: NotionRichTextDoc) => {
              return (
                <span
                  className={addColorAndCodeClass(
                    text,
                    this.block[this.block.type].color
                  )}
                  key={text.plain_text}
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
  getTextJsx = () => {
    this.className = classNames(
      "notion-list",
      "notion-list-disc",
      this.className
    );
    return this.initialReturn();
  };
}

export class NotionNumberedListItemBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames(
      "notion-list",
      "notion-list-numbered",
      this.className
    );
    return this.initialReturn();
  };
}

export class NotionCalloutBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames(
      "notion-callout",
      "notion-callout-text",
      this.className
    );
    return this.initialReturn();
  };
}

export class NotionCodeBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-code", this.className);
    return this.initialReturn();
  };
}

export class NotionHeading1Block extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-h1", this.className);
    return this.initialReturn();
  };
}

export class NotionHeading2Block extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-h2", this.className);
    return this.initialReturn();
  };
}

export class NotionHeading3Block extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-h3", this.className);
    return this.initialReturn();
  };
}

export class NotionParagraphBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    return this.initialReturn();
  };
}

export class NotionQuoteBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-quote", this.className);
    return this.initialReturn();
  };
}

export class NotionTodoBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    return this.initialReturn();
  };
}

export class NotionToggleBlock extends NotionTextTypeBlock {
  getTextJsx = () => {
    this.className = classNames("notion-toggle", this.className);
    return this.initialReturn();
  };
}

export class NotionDividerBlock extends NotionBasicBlock {
  getChild = () => {
    return (
      <div key={this.block.id}>
        <NotionBlockList targetId={this.block.id} />
      </div>
    );
  };
}
