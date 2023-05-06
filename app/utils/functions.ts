import { colorType } from "@/type/color.type";
import { NotionRichTextDoc } from "@/type/notion.type";
import { NotionRichText } from "@/type/notion.type.junhyek";

export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export const addColorAndCodeClass = (
  text: NotionRichTextDoc | NotionRichText,
  color: colorType
) => {
  let className: string = "";
  if (text.annotations.code) className += "notion-inline-code";
  if (text.annotations.color !== colorType.DEFAULT)
    className += classNames("notion-" + text.annotations.color);
  else if (color !== colorType.DEFAULT)
    className += classNames("notion-" + color);
  return className;
};
