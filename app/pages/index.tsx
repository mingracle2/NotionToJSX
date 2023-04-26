import React, { useCallback, useEffect, useMemo, useState } from "react";
import NotionBlockList from "@/src/components/notionBlockList";
import { classNames } from "@/utils/functions";
import { getNotionPage } from "@/utils/getNotionPage";

const IndexPage: React.FC = () => {
  const [pageId, setPageId] = useState("");
  const [tempId, setTempId] = useState("");
  const [pageName, setPageName] = useState("");
  const [pageIcon, setPageIcon] = useState("");
  const [pageCover, setPageCover] = useState("");

  const handleInputChange = () => {
    console.log(tempId);
    setPageId(tempId);
  };

  useEffect(() => {
    const getPage = async () => {
      const [name, icon, cover] = await getNotionPage(pageId);
      setPageName(name);
      setPageIcon(icon);
      setPageCover(cover);
    };
    if (pageId) getPage();
  }, [pageId]);

  return (
    <div className="notion">
      {!pageId && (
        <div>
          <h1 className="notion-h1">Search Page</h1>
          <input
            type="text"
            value={tempId}
            size={50}
            onChange={(e) => setTempId(e.target.value)}
            placeholder="Enter search query"
          />
          <button onClick={handleInputChange}>Search</button>
        </div>
      )}
      {pageId && (
        <div>
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
            <NotionBlockList targetId={pageId} />
          </main>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
