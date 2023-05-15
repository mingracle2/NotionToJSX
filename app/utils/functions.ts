import { NotionTextColors } from "@/type/notion.type";
import { NotionRichText } from "@/type/notion.type";

export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export const addColorAndCodeClass = (
  text: NotionRichText,
  color: NotionTextColors
) => {
  let className: string = "";
  if (text.annotations.code)
    className = classNames(className, "notion-inline-code");
  if (text.annotations.color !== "default")
    className = classNames(className, "notion-" + text.annotations.color);
  else if (color !== "default")
    className = classNames(className, "notion-" + color);
  if (
    color !== "blue" &&
    color !== "brown" &&
    color !== "gray" &&
    color !== "green" &&
    color !== "orange" &&
    color !== "pink" &&
    color !== "purple" &&
    color !== "red" &&
    color !== "yellow" &&
    text.annotations.color !== "blue" &&
    text.annotations.color !== "brown" &&
    text.annotations.color !== "gray" &&
    text.annotations.color !== "green" &&
    text.annotations.color !== "orange" &&
    text.annotations.color !== "pink" &&
    text.annotations.color !== "purple" &&
    text.annotations.color !== "red" &&
    text.annotations.color !== "yellow" &&
    text.href
  )
    className = classNames(className, "notion-gray");
  return className;
};

export const addColorClass = (color: NotionTextColors) => {
  let className: string = "";
  if (color !== "default") className = classNames(className, "notion-" + color);
  return className;
};
