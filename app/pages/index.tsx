import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const [pageUrl, setPageUrl] = useState("");
  const [pageId, setPageId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (pageId) {
      console.log(pageId);
      router.push(`/${pageId}`);
    }
  }, [pageId]);

  const handleInputChange = () => {
    if (pageUrl) {
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
      <button onClick={handleInputChange}>Search</button>
    </div>
  );
};

export default IndexPage;
