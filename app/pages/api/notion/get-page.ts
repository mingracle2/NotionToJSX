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
  const titleConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${req.body.value}/properties/title`,
    headers: {
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
  };

  const requestTitle = axios(titleConfig);

  const pageConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/pages/${req.body.value}`,
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

  res.status(200).json({ ...titleResponse.data, ...pageResponse.data });
}
