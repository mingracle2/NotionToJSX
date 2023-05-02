import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  const [pageId, setPageId] = useState("");

  const router = useRouter();
  const handleInputChange = () => {
    router.push(`/${pageId}`);
  };

  return (
    <div className="notion">
      <h1 className="notion-h1">Search Page</h1>
      <input
        type="text"
        value={pageId}
        size={50}
        onChange={(e) => setPageId(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleInputChange}>Search</button>
    </div>
  );
};

export default IndexPage;
