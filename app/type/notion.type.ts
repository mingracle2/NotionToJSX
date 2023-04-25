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
  type: notionBlockNamesDoc;
};

export type NotionBlockDoc = NotionBlockBasicDoc & {
  [K in NotionBlockBasicDoc["type"]]: NotionBlockDetailDoc;
};

export type NotionBlockDetailUpdatedDoc = NotionBlockDetailDoc & {
  numberOfTabs: number;
  id: string;
  type: notionBlockNamesDoc;
};

export type NotionBlockDetailDoc = {
  rich_text: {
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
  }[];
  color: colorType;
  is_toggleable?: boolean;
};
