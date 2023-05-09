import { NotionRichTextDoc, NotionTextColors } from "@/type/notion.type";
import { NotionRichText } from "@/type/notion.type";

export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export const addColorAndCodeClass = (
  text: NotionRichTextDoc | NotionRichText,
  color: NotionTextColors
) => {
  let className: string = "";
  if (text.annotations.code) className += "notion-inline-code";
  if (text.annotations.color !== "default")
    className += classNames("notion-" + text.annotations.color);
  else if (color !== "default") className += classNames("notion-" + color);
  return className;
};

export const addColorClass = (color: NotionTextColors) => {
  let className: string = "";
  if (color !== "default") className += classNames("notion-" + color);
  return className;
};
