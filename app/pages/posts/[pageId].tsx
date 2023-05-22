import { NotionBlock } from "@/src/components/blocks/NotionBlock";
import { SyncNotionBlockDoc } from "@/type/notion.type";
import { constructNotionSyncBlocks } from "@/lib/constructNotionSyncBlocks";
import { classNames } from "@/utils/functions";
import { getNotionPage } from "@/lib/getNotionPage";
import { getPagesFromDatabase } from "@/lib/getPagesFromDatabase";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export const notionIntegrationToken =
  "Bearer secret_6Fa7uOy0Rlygt7aD7WNUX4z0sPtHj7Has4Gsjk3pMsx";

interface CustomNotionPageProps {
  pageName: string;
  pageIcon: string;
  pageCover: string;
  notionBlockData: SyncNotionBlockDoc[];
}

const CustomNotionPage: NextPage<CustomNotionPageProps> = (props) => {
  const router = useRouter();

  const [pageName, setPageName] = useState("");
  const [pageIcon, setPageIcon] = useState("");
  const [pageCover, setPageCover] = useState("");

  const pageId: string =
    typeof router.query.pageId === "string" ? router.query.pageId : "";

  const isAsync: boolean =
    typeof router.query.isAsync === "string" && router.query.isAsync === "true"
      ? true
      : false;

  useEffect(() => {
    if (pageId) {
      console.log(pageId);
      setPageName(props.pageName);
      setPageIcon(props.pageIcon);
      setPageCover(props.pageCover);
    }
  }, [pageId]);

  return (
    <div className="notion">
      {pageCover && (
        <img src={pageCover} alt={pageName} className="notion-page-cover" />
      )}
      <main
        className={classNames(
          "notion-page",
          !pageCover && "notion-page-offset"
        )}
      >
        {pageIcon && (
          <span
            className={classNames(
              "notion-emoji",
              "notion-page-icon-cover",
              pageCover && "notion-page-icon-offset"
            )}
            aria-label={pageIcon}
          >
            {pageIcon}
          </span>
        )}
        <div className="notion-title">{pageName}</div>
        <hr className="notion-hr" />
        <ul style={{ paddingLeft: 0 }}>
          <NotionBlock
            pageId={pageId}
            isAsync={isAsync}
            syncBlocks={props.notionBlockData}
          />
        </ul>
      </main>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  if (params.pageId) {
    const pageId: string = params.pageId;
    const [pageName, pageIcon, pageCover] = await getNotionPage(pageId);
    const notionBlockData: SyncNotionBlockDoc[] =
      await constructNotionSyncBlocks({ pageId });
    return {
      props: {
        pageName,
        pageIcon,
        pageCover,
        notionBlockData,
      },
    };
  }
}

export async function getStaticPaths() {
  const pageIds: string[] = await getPagesFromDatabase();

  const paths = pageIds.map((pageId) => ({
    params: {
      pageId: pageId,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default CustomNotionPage;
