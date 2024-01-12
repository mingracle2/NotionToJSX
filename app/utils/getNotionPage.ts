import axios from 'axios';

const notionIntegrationToken = 'Bearer secret_cvH8ZJg1mJScYFPHxEPqzyPpDTUqpgVVsXwXwx8Z7k4';

export const getNotionPage: any = async (targetId: string) => {
  // Call API and receive response
  const titleConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${targetId}/properties/title`,
    headers: {
      'Notion-Version': '2022-02-22',
      Authorization: notionIntegrationToken,
    },
  };

  const requestTitle = axios(titleConfig);

  const pageConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${targetId}`,
    headers: {
      'Notion-Version': '2022-02-22',
      Authorization: notionIntegrationToken,
    },
  };

  const requestPage = await axios(pageConfig);

  const [titleResponse, pageResponse] = await Promise.all([requestTitle, requestPage]);

  let pageName = '';
  titleResponse.data.results.forEach((result: any) => {
    pageName = pageName + result.title.plain_text;
  });
  const pageIcon: string = pageResponse.data.icon ? pageResponse.data.icon.emoji : '';
  const pageTags: string[] = pageResponse.data.properties.Tags
    ? pageResponse.data.properties.Tags.multi_select.map((tag: any) => tag.name)
    : [];
  const pageHeaderImage: string = pageResponse.data.cover
    ? pageResponse.data.cover[pageResponse.data.cover.type].url
    : '';
  const pageCover: string = pageResponse.data.properties['커버 이미지 URL']?.files[0]
    ? pageResponse.data.properties['커버 이미지 URL']?.files[0].external?.url ||
      pageResponse.data.properties['커버 이미지 URL']?.files[0].file?.url
    : '';
  console.log(pageCover);
  const pageDescription: string = pageResponse.data.properties.Description?.rich_text[0]
    ? pageResponse.data.properties.Description.rich_text[0].plain_text
    : '';
  const pageAuthorId: string = pageResponse.data.properties['Author Id']?.rich_text[0]
    ? pageResponse.data.properties['Author Id'].rich_text[0].plain_text
    : '';
  return {
    pageName,
    pageIcon,
    pageCover,
    pageHeaderImage,
    pageTags,
    pageDescription,
    pageAuthorId,
  };
};
