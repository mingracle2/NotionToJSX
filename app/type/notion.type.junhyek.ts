/**
 * Enums
 */

export enum NotionTextColors {
  "blue" = "blue",
  "blue_background" = "blue_background",
  "brown" = "brown",
  "brown_background" = "brown_background",
  "default" = "default",
  "gray" = "gray",
  "gray_background" = "gray_background",
  "green" = "green",
  "green_background" = "green_background",
  "orange" = "orange",
  "orange_background" = "orange_background",
  "pink" = "pink",
  "pink_background" = "pink_background",
  "purple" = "purple",
  "purple_background" = "purple_background",
  "red" = "red",
  "red_background" = "red_background",
  "yellow" = "yellow",
  "yellow_background" = "yellow_background",
}

export enum BlockTypes {
  "bookmark" = "bookmark",
  "breadcrumb" = "breadcrumb",
  "bulleted_list_item" = "bulleted_list_item",
  "callout" = "callout",
  "child_database" = "child_database",
  "child_page" = "child_page",
  "code" = "code",
  "column" = "column",
  "column_list" = "column_list",
  "divider" = "divider",
  "embed" = "embed",
  "equation" = "equation",
  "file" = "file",
  "heading_1" = "heading_1",
  "heading_2" = "heading_2",
  "heading_3" = "heading_3",
  "image" = "image",
  "link_preview" = "link_preview",
  "link_to_page" = "link_to_page",
  "numbered_list_item" = "numbered_list_item",
  "paragraph" = "paragraph",
  "pdf" = "pdf",
  "quote" = "quote",
  "synced_block" = "synced_block",
  "table" = "table",
  "table_of_contents" = "table_of_contents",
  "table_row" = "table_row",
  "template" = "template",
  "to_do" = "to_do",
  "toggle" = "toggle",
  "unsupported" = "unsupported",
  "video" = "video",
}

/**
 * Notion Block
 * https://developers.notion.com/reference/block
 */
export interface NotionBasicBlock {
  object: "block";
  id: string;
  parent: {
    type: "page_id";
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  [key: string]: any;
  type: BlockTypes;
}

interface NotionBasicBlockTypeObject {
  rich_text: NotionRichText[];
  color: NotionTextColors;
}

export interface NotionParagraphBlock extends NotionBasicBlock {
  type: BlockTypes.paragraph;
  paragraph: NotionBasicBlockTypeObject;
}

export interface NotionQuoteBlock extends NotionBasicBlock {
  type: BlockTypes.quote;
  quote: NotionBasicBlockTypeObject;
}

export interface NotionBulletedListItemBlock extends NotionBasicBlock {
  type: BlockTypes.bulleted_list_item;
  bulleted_list_item: NotionBasicBlockTypeObject;
}

export interface NotionNumberedListItemBlock extends NotionBasicBlock {
  type: BlockTypes.numbered_list_item;
  numbered_list_item: NotionBasicBlockTypeObject;
}

export interface NotionToggleBlock extends NotionBasicBlock {
  type: BlockTypes.toggle;
  toggle: NotionBasicBlockTypeObject;
}

export interface NotionHeading1Block extends NotionBasicBlock {
  type: BlockTypes.heading_1;
  heading_1: {
    rich_text: NotionRichTextDoc[];
    color: NotionTextColors;
    is_toggleable: boolean;
  };
}

export interface NotionHeading2Block extends NotionBasicBlock {
  type: BlockTypes.heading_2;
  heading_2: {
    rich_text: NotionRichTextDoc[];
    color: NotionTextColors;
    is_toggleable: boolean;
  };
}

export interface NotionHeading3Block extends NotionBasicBlock {
  type: BlockTypes.heading_3;
  heading_3: {
    rich_text: NotionRichTextDoc[];
    color: NotionTextColors;
    is_toggleable: boolean;
  };
}

export interface NotionTodoBlock extends NotionBasicBlock {
  type: BlockTypes.to_do;
  to_do: NotionBasicBlockTypeObject;
  checked: boolean;
}

export interface NotionCodeBlock extends NotionBasicBlock {
  type: BlockTypes.code;
  caption: NotionBasicBlockTypeObject;
  code: NotionBasicBlockTypeObject;
  language: string;
}

export interface NotionCalloutBlock extends NotionBasicBlock {
  type: BlockTypes.callout;
  callout: NotionBasicBlockTypeObject;
  icon: {
    type: string;
    emoji: object;
  };
}

export interface NotionDividerBlock extends NotionBasicBlock {
  type: BlockTypes.divider;
}

export interface NotionImageBlock extends NotionBasicBlock {
  type: BlockTypes.image;
  image: {
    type: string;
    file?: {
      url: string;
      expiry_time: string;
    };
    external?: {
      url: string;
    };
    [key: string]: any;
  };
}

export interface NotionColumnListBlock extends NotionBasicBlock {
  type: BlockTypes.column_list;
}

export interface NotionColumnBlock extends NotionBasicBlock {
  type: BlockTypes.column;
}

export interface NotionVideoBlock extends NotionBasicBlock {
  type: BlockTypes.video;
  caption: { rich_text: NotionRichText[] };
  file?: {
    url: string;
    expiry_time: string;
  };
  external?: {
    url: string;
  };
}

export interface NotionEmbedBlock extends NotionBasicBlock {
  type: BlockTypes.video;
  caption: { rich_text: NotionRichText[] };
  url: string;
}

export interface NotionBookmarkBlock extends NotionBasicBlock {
  type: BlockTypes.video;
  caption: { rich_text: NotionRichText[] };
  url: string;
}

/**
 * Rich Text
 * https://developers.notion.com/reference/rich-text
 */

enum NotionRichTextType {
  "text",
  "mention", // https://developers.notion.com/reference/rich-text#mention
  "equation", // https://developers.notion.com/reference/rich-text#equation
}

export interface NotionRichText {
  type: NotionRichTextType;
  annotations: NotionRichTextAnnotation;
  plain_text: string; // "Some words "
  href?: string;
}

export interface NotionTextTypeRichText extends NotionRichText {
  text: NotionRichTextText;
}

export interface NotionTextTypeRichText extends NotionRichText {
  text: NotionRichTextText;
}

/**
 * https://developers.notion.com/reference/rich-text#text
 */
export interface NotionRichTextText {
  content: string;
  link?: { url: string } | null;
}

/**
 * https://developers.notion.com/reference/rich-text#the-annotation-object
 */
export interface NotionRichTextAnnotation {
  bold: boolean; // false
  italic: boolean; // false
  strikethrough: boolean; // false
  underline: boolean; // false
  code: boolean; // false
  color: string; // default"
}

export type NotionRichTextDoc = {
  type: string;
  text: {
    content: string;
    link: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: NotionTextColors;
  };
  plain_text: string;
  href: string;
};
