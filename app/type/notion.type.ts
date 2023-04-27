import { NotionBlockNamesDoc } from "./blockNames.type";
import { colorType } from "./color.type";

export type NotionBlockBasicDoc = {
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
};

export type NotionRichTextDoc = {
  type: string;
  text: {
    content: string;
    link: null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: colorType;
  };
  plain_text: string;
  href: null;
};

export type NotionTextTypedoc = NotionBlockBasicDoc & {
  type:
    | NotionBlockNamesDoc.PARAGRAPH
    | NotionBlockNamesDoc.QUOTE
    | NotionBlockNamesDoc.BULLETED_LIST_ITEM
    | NotionBlockNamesDoc.NUMBERED_LIST_ITEM
    | NotionBlockNamesDoc.TOGGLE;
  paragraph?: { rich_text: NotionRichTextDoc[]; color: colorType };
  quote?: { rich_text: NotionRichTextDoc[]; color: colorType };
  bulleted_list_item?: { rich_text: NotionRichTextDoc[]; color: colorType };
  numbered_list_item?: { rich_text: NotionRichTextDoc[]; color: colorType };
  toggle?: { rich_text: NotionRichTextDoc[]; color: colorType };
};

export type NotionHeadingDoc = NotionBlockBasicDoc & {
  type:
    | NotionBlockNamesDoc.HEADING_1
    | NotionBlockNamesDoc.HEADING_2
    | NotionBlockNamesDoc.HEADING_3;
  heading_1?: { rich_text: NotionRichTextDoc[]; color: colorType };
  heading_2?: { rich_text: NotionRichTextDoc[]; color: colorType };
  heading_3?: { rich_text: NotionRichTextDoc[]; color: colorType };
  is_toggleable: boolean;
};

export type NotionTodoDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.TO_DO;
  to_do: { rich_text: NotionRichTextDoc[]; color: colorType };
  checked: boolean;
};

export type NotionCodeDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.CODE;
  caption: { rich_text: NotionRichTextDoc[]; color: colorType };
  code: { rich_text: NotionRichTextDoc[]; color: colorType };
  language: string;
};

export type NotionCalloutDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.CALLOUT;
  callout: { rich_text: NotionRichTextDoc[]; color: colorType };
  icon: {
    type: string;
    emoji: object;
  };
};

export type NotionDividerDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.DIVIDER;
};

export type NotionImageDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.IMAGE;
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
};

export type NotionColumnListDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.COLUMN_LIST;
};

export type NotionColumnDoc = NotionBlockBasicDoc & {
  type: NotionBlockNamesDoc.COLUMN;
};

export type NotionAllTypes =
  | NotionTextTypedoc
  | NotionHeadingDoc
  | NotionTodoDoc
  | NotionCodeDoc
  | NotionCalloutDoc
  | NotionDividerDoc
  | NotionImageDoc
  | NotionColumnListDoc
  | NotionColumnDoc;
