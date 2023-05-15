import NotionBlock, {
  NotionAsyncBlock,
} from "@/src/components/blocks/NotionBlock";
import NotionDBlock from "@/src/components/blocks/NotionDBlock";
import { SyncNotionBlockDoc } from "@/type/notion.type";
import { constructNotionSyncBlocks } from "@/utils/constructNotionSyncBlocks";
import { classNames } from "@/utils/functions";
import { getNotionPage } from "@/utils/getNotionPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CustomNotionPage = () => {
  const router = useRouter();

  const [pageName, setPageName] = useState("");
  const [pageIcon, setPageIcon] = useState("");
  const [pageCover, setPageCover] = useState("");

  const pageId: string =
    typeof router.query.pageId === "string" ? router.query.pageId : "";

  const [notionBlocks, setNotionBlocks] = useState<SyncNotionBlockDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllBlocks = async () => {
    setIsLoading(true);

    const start = Date.now();
    constructNotionSyncBlocks({
      pageId,
    })
      .then((result) => {
        const end = Date.now();
        console.log(end - start, "ms");
        setNotionBlocks(() => result);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  useEffect(() => {
    if (pageId) {
      fetchAllBlocks();
    }
  }, [pageId]);

  useEffect(() => {
    if (notionBlocks.length !== 0) console.log(notionBlocks);
  }, [notionBlocks]);

  useEffect(() => {
    const getPage = async () => {
      if (typeof pageId !== "string") {
        console.log("올바른 경로로 접속해주세요.");
        return <></>;
      }
      const [name, icon, cover] = await getNotionPage(pageId);
      setPageName(name);
      setPageIcon(icon);
      setPageCover(cover);
    };
    if (pageId) {
      console.log(pageId);
      getPage();
    }
  }, [pageId]);

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading indicator while fetching data
  }

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
          {notionBlocks.map((block) => {
            return <NotionBlock key={block.id} block={block} />;
          })}
        </ul>
      </main>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default CustomNotionPage;
