export const getNotionPage = async (targetId: string) => {
  // Call API and receive response
  const titleResponse = await (
    await fetch("api/notion/notionPageTitle", {
      method: "POST",
      body: JSON.stringify({ value: targetId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  const blockResponse = await (
    await fetch("api/notion/notionPageContent", {
      method: "POST",
      body: JSON.stringify({ value: targetId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  const pageName = titleResponse.results
    ? titleResponse.results[0].title.plain_text
    : "";
  const pageIcon = blockResponse.icon ? blockResponse.icon.emoji : "";
  const pageCover = blockResponse.cover
    ? blockResponse.cover[blockResponse.cover.type].url
    : "";
  // return pageName[0].plain_text;
  return [pageName, pageIcon, pageCover];
};