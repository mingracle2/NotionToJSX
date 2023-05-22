import axios from "axios";

export const notionIntegrationToken =
  "Bearer secret_6Fa7uOy0Rlygt7aD7WNUX4z0sPtHj7Has4Gsjk3pMsx";

export const getPagesFromDatabase = async () => {
  // Call API and receive response
  let filterData = JSON.stringify({
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "발행 완료",
          },
        },
        {
          property: "어센트 검수",
          select: {
            equals: "SEO 검수 완료",
          },
        },
        {
          property: "Sprint",
          select: {
            equals: "#12(23/04)",
          },
          // or: [
          //   {
          //     property: "Sprint",
          //     select: {
          //       equals: "#13(23/05)",
          //     },
          //   },
          //   {
          //     property: "Sprint",
          //     select: {
          //       equals: "#12(23/04)",
          //     },
          //   },
          // ],
        },
      ],
    },
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/databases/b95a5d7e0698416aa71337111ebb71db/query`,
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
    data: filterData,
  };

  const response = await axios(config);

  const pageIds: string[] = response.data.results.map((result: any) => {
    return result.id.replace(/-/g, "");
  });

  console.log(pageIds);
  return pageIds;
};
