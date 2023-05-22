// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const notionIntegrationToken =
  "Bearer secret_6Fa7uOy0Rlygt7aD7WNUX4z0sPtHj7Has4Gsjk3pMsx";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let filterData = JSON.stringify({
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "리뷰 중!",
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
            equals: "#13(23/05)",
          },
        },
      ],
    },
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/databases/${req.body.value}/query`,
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
    data: filterData,
  };

  const response = await axios(config);

  res.status(200).json(response.data);
}
