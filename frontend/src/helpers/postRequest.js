async function postRequest(params, processResult, setLoading) {
  await fetch(params.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
        "queryWord": "${params.searchTitle}"
      }`,
  })
    .then((response) => response.json())
    .then((response) => processResult(response))
    .catch((error) => {
      console.error(
        `Error while asking search results from ${params.url}:`,
        error
      );
    });
  setLoading(false);
}

export default postRequest;
