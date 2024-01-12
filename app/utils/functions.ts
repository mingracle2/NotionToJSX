import { NotionTextColors } from "../types/notion.type";
import { NotionRichText } from "../types/notion.type";

export const cn = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export const addColorAndCodeClass = (
  text: NotionRichText,
  color: NotionTextColors
) => {
  let className: string = "";
  if (text.annotations.code) className = cn(className, "notion-inline-code");
  if (text.annotations.color !== "default")
    className = cn(className, "notion-" + text.annotations.color);
  else if (color !== "default") className = cn(className, "notion-" + color);
  return className;
};

export const addColorClass = (color: NotionTextColors) => {
  let className: string = "";
  if (color !== "default") className = cn(className, "notion-" + color);
  return className;
};
