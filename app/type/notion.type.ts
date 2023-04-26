import { notionBlockNamesDoc } from "./blockNames.type";
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
  color: colorType;
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
    | notionBlockNamesDoc.PARAGRAPH
    | notionBlockNamesDoc.QUOTE
    | notionBlockNamesDoc.BULLETED_LIST_ITEM
    | notionBlockNamesDoc.NUMBERED_LIST_ITEM
    | notionBlockNamesDoc.TOGGLE;
  paragraph?: NotionRichTextDoc;
  quote?: NotionRichTextDoc;
  bulleted_list_item?: NotionRichTextDoc;
  numbered_list_item?: NotionRichTextDoc;
  toggle?: NotionRichTextDoc;
};

export type NotionHeadingDoc = NotionBlockBasicDoc & {
  type:
    | notionBlockNamesDoc.HEADING_1
    | notionBlockNamesDoc.HEADING_2
    | notionBlockNamesDoc.HEADING_3;
  heading_1?: { rich_text: NotionRichTextDoc[] };
  heading_2?: { rich_text: NotionRichTextDoc[] };
  heading_3?: { rich_text: NotionRichTextDoc[] };
  is_toggleable: boolean;
};

export type NotionTodoDoc = NotionBlockBasicDoc & {
  type: notionBlockNamesDoc.TO_DO;
  to_do: { rich_text: NotionRichTextDoc[] };
  checked: boolean;
};

export type NotionCodeDoc = NotionBlockBasicDoc & {
  type: notionBlockNamesDoc.CODE;
  caption: { rich_text: NotionRichTextDoc[] };
  code: { rich_text: NotionRichTextDoc[] };
  language: string;
};

export type NotionCalloutDoc = NotionBlockBasicDoc & {
  type: notionBlockNamesDoc.CALLOUT;
  callout: { rich_text: NotionRichTextDoc[] };
  icon: {
    type: string;
    emoji: object;
  };
};

export type NotionAllTypes =
  | NotionTextTypedoc
  | NotionHeadingDoc
  | NotionTodoDoc
  | NotionCodeDoc
  | NotionCalloutDoc
  | NotionDividerDoc;

export type NotionDividerDoc = NotionBlockBasicDoc & {
  type: notionBlockNamesDoc.DIVIDER;
};

export type NotionBlockDoc = NotionBlockBasicDoc & {
  [K in NotionBlockBasicDoc["type"]]: NotionBlockDetailDoc;
};

export type NotionBlockDetailUpdatedDoc = NotionBlockDetailDoc & {
  numberOfTabs: number;
  id: string;
  type: notionBlockNamesDoc;
};
