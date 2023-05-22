import axios from "axios";

export const notionIntegrationToken =
  "Bearer secret_6Fa7uOy0Rlygt7aD7WNUX4z0sPtHj7Has4Gsjk3pMsx";

export const getNotionPage = async (targetId: string) => {
  console.log(targetId);
  // Call API and receive response
  const titleConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${targetId}/properties/title`,
    headers: {
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
  };

  const requestTitle = axios(titleConfig);

  const pageConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${targetId}`,
    headers: {
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
  };

  const requestPage = await axios(pageConfig);

  const [titleResponse, pageResponse] = await Promise.all([
    requestTitle,
    requestPage,
  ]);

  let pageName = "";
  titleResponse.data.results.forEach((result: any) => {
    pageName = pageName + result.title.plain_text;
  });
  const pageIcon = pageResponse.data.icon ? pageResponse.data.icon.emoji : "";
  const pageCover = pageResponse.data.cover
    ? pageResponse.data.cover[pageResponse.data.cover.type].url
    : "";
  // return pageName[0].plain_text;
  console.log({ pageName, pageIcon, pageCover });
  return [pageName, pageIcon, pageCover];
};
