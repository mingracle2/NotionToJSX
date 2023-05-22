export const getNotionPage = async (targetId: string) => {
  // Call API and receive response
  const response = await (
    await fetch(
      "http://notion-to-jsx-git-minki-staticprops-mingracle2.vercel.app/api/notion/get-page",
      {
        method: "POST",
        body: JSON.stringify({ value: targetId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  const pageName = response.results ? response.results[0].title.plain_text : "";
  const pageIcon = response.icon ? response.icon.emoji : "";
  const pageCover = response.cover
    ? response.cover[response.cover.type].url
    : "";
  // return pageName[0].plain_text;
  console.log({ pageName, pageIcon, pageCover });
  return [pageName, pageIcon, pageCover];
};
