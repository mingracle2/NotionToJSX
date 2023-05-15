import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const [pageUrl, setPageUrl] = useState("");
  const [pageId, setPageId] = useState("");
  const [isAsync, setIsAsync] = useState(false);
  const [click, setClick] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (pageId) {
      // console.log(pageId);
      // router.push(`/${pageId}`);
      window.open(`/${pageId}?isAsync=${isAsync}`, "_blank");
    }
  }, [pageId, click]);

  const renderSynchronously = () => {
    if (pageUrl) {
      setClick(!click);
      setIsAsync(false);
      setPageId(
        pageUrl.split(/[/-]/)[pageUrl.split(/[/-]/).length - 1].split("?")[0]
      );
    }
  };

  const renderAsynchronously = () => {
    if (pageUrl) {
      setClick(!click);
      setIsAsync(true);
      setPageId(
        pageUrl.split(/[/-]/)[pageUrl.split(/[/-]/).length - 1].split("?")[0]
      );
    }
  };

  return (
    <div className="notion">
      <h1 className="notion-h1">Search Page</h1>
      <input
        type="text"
        value={pageUrl}
        size={80}
        onChange={(e) => setPageUrl(e.target.value)}
        placeholder="Enter search query"
      />
      <button
        onClick={renderSynchronously}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        Sync
      </button>
      <button onClick={renderAsynchronously}>Async</button>
    </div>
  );
};

export default IndexPage;
