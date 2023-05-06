//not used anymore
import { getNotionPage } from "@/utils/getNotionPage";
import { useEffect, useState } from "react";

export interface NotionPageProps {
  targetId: string;
}

const NotionPage = ({ targetId }: NotionPageProps) => {
  const [pageName, setPageName] = useState("");
  const [pageIcon, setPageIcon] = useState("");

  useEffect(() => {
    const getPage = async () => {
      const [name, icon] = await getNotionPage(targetId);
      setPageName(name);
      setPageIcon(icon);
    };
    getPage();
  }, [targetId]);

  return (
    <div>
      <div className="notion-title">{pageName}</div>
    </div>
  );
};

export default NotionPage;
