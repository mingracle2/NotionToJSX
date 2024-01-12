// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const notionIntegrationToken = "";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.notion.com/v1/blocks/${req.body.value}/children?page_size=1000`,
    headers: {
      "Notion-Version": "2022-02-22",
      Authorization: notionIntegrationToken,
    },
  };

  const response = await axios(config);

  res.status(200).json(response.data);
}
