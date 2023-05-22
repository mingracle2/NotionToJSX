import { constructNotionSyncBlocks } from "@/lib/constructNotionSyncBlocks";
import { NotionBlock } from "@/src/components/blocks/NotionBlock";
import { SyncNotionBlockDoc } from "@/type/notion.type";
import { classNames } from "@/utils/functions";
import { getNotionPage } from "@/lib/getNotionPage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CustomNotionPageProps {
  pageName: string;
  pageIcon: string;
  pageCover: string;
  notionBlockData?: SyncNotionBlockDoc[];
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
    const getPage = async () => {
      if (typeof pageId !== "string") {
        console.log("올바른 경로로 접속해주세요.");
        return <></>;
      }
      setPageName(props.pageName);
      setPageIcon(props.pageIcon);
      setPageCover(props.pageCover);
    };
    if (pageId) {
      console.log(pageId);
      getPage();
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
            syncBlocks={props?.notionBlockData}
          />
        </ul>
      </main>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const pageId: string = context.params.pageId;
  const isAsync: boolean =
    typeof context.query.isAsync === "string" &&
    context.query.isAsync === "true"
      ? true
      : false;
  console.log(pageId);
  const [pageName, pageIcon, pageCover] = await getNotionPage(pageId);
  if (!isAsync) {
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
  } else {
    return {
      props: {
        pageName,
        pageIcon,
        pageCover,
      },
    };
  }
}

export default CustomNotionPage;
