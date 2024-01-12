import { cn } from "../utils/functions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import NotionBlock from "../src/components/NotionBlock";

import { SyncNotionBlockDoc } from "../types/notion.type";
import { constructNotionSyncBlocks } from "../utils/constructNotionSyncBlocks";
import { getNotionPage } from "../utils/getNotionPage";

interface CustomNotionPageProps {
  pageName: string;
  pageIcon: string;
  pageCover: string;
  pageHeaderImage: string;
  pageTags: string[];
  pageDescription: string;
  pageAuthorId: string;
  notionBlockData: string;
}

const CustomNotionPage: NextPage<CustomNotionPageProps> = (props) => {
  const router = useRouter();

  const pageId: string =
    typeof router.query.pageId === "string" ? router.query.pageId : "";
  const isPage: boolean = pageId !== "";

  const addNotionRenderedContent = useCallback(async () => {
    if (isPage) {
      const url = new URL(props.pageCover || props.pageHeaderImage);
      const params = new URLSearchParams(url.search);
      const parameterValue = params.get("fm");
      const supplementImageFormat = url.pathname.includes("png")
        ? "png"
        : "jpg"
        ? "jpg"
        : "jpeg";
      const imageFormat =
        url.hostname === "s3.us-west-2.amazonaws.com"
          ? url.pathname.split(".").pop()
          : parameterValue
          ? parameterValue
          : supplementImageFormat;

      fetch(`${window.location.origin}/api/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: props.pageCover || props.pageHeaderImage,
          imageFormat: imageFormat,
          directory: `curation-hub/contents/${pageId}/cover.${imageFormat}`,
        }),
      });
    }
  }, [pageId]);

  useEffect(() => {
    const getPage = async () => {
      if (!isPage) {
        console.log("올바른 경로로 접속해주세요.");
        return <></>;
      }
      addNotionRenderedContent();
    };
    if (pageId) {
      // console.log(pageId);
      getPage();
    }
  }, [pageId]);

  return (
    <>
      <div className="notion-to-jsx px-9 py-6">
        {props.pageHeaderImage && (
          <img
            src={props.pageHeaderImage}
            alt={props.pageName}
            className="notion-page-cover"
          />
        )}
        <main
          className={
            props.pageHeaderImage
              ? cn("notion-page")
              : cn("notion-page", "notion-page-offset")
          }
        >
          {props.pageIcon && (
            <span
              className={cn(
                "notion-emoji",
                "notion-page-icon-cover",
                props.pageHeaderImage && "notion-page-icon-offset"
              )}
              aria-label={props.pageIcon}
            >
              {props.pageIcon}
            </span>
          )}
          <div className="notion-title text-xl md:text-lg">
            {props.pageName}
          </div>
          <hr className="notion-hr" />
          <ul style={{ paddingLeft: 0 }}>
            <NotionBlock
              pageId={pageId}
              isPage={true}
              syncBlocks={JSON.parse(props?.notionBlockData)}
            />
          </ul>
        </main>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <br />
    </>
  );
};

export async function getServerSideProps(context: any) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const pageId: string = context.params.pageId;
  // const isAsync: boolean =
  //   typeof context.query.isAsync === 'string' && context.query.isAsync === 'true' ? true : false;
  // console.log(pageId);
  const {
    pageName,
    pageIcon,
    pageCover,
    pageHeaderImage,
    pageTags,
    pageDescription,
    pageAuthorId,
  } = await getNotionPage(pageId);
  // if (!isAsync) {
  const notionBlockData: SyncNotionBlockDoc[] = await constructNotionSyncBlocks(
    { pageId }
  );

  return {
    props: {
      pageName,
      pageIcon,
      pageCover,
      pageHeaderImage,
      pageTags,
      pageDescription,
      pageAuthorId,
      notionBlockData: JSON.stringify(notionBlockData),
    },
  };
  // } else {
  //   return {
  //     props: {
  //       pageName,
  //       pageIcon,
  //       pageCover,
  //     },
  //   };
  // }
}

export default CustomNotionPage;
