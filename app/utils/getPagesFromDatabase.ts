export const getPagesFromDatabase = async () => {
  // Call API and receive response
  const response = await (
    await fetch(
      "http://notion-to-jsx-git-minki-staticprops-mingracle2.vercel.app/api/notion/get-from-database",
      {
        method: "POST",
        body: JSON.stringify({ value: "b95a5d7e0698416aa71337111ebb71db" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  const pageIds: string[] = response.results.map((result: any) => {
    return result.id;
  });

  console.log(pageIds);
  return pageIds;
};
