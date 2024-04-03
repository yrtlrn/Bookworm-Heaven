export const queryCreator = (
  queryParams: URLSearchParams
) => {
  const resultQuery: any = {};

  if (queryParams.has("type")) {
    resultQuery.type = queryParams.get("type");
  }

  // Stars
  if (queryParams.has("starMin")) {
    resultQuery.starMin = queryParams.get("starMin");
  }
  if (queryParams.has("starMax")) {
    resultQuery.starmax = queryParams.get("starMax");
  }

  // Price
  if (queryParams.has("priceMin")) {
    resultQuery.priceMin = queryParams.get("priceMin");
  }
  if (queryParams.has("priceMax")) {
    resultQuery.priceMax = queryParams.get("priceMax");
  }

  // Review
  if (queryParams.has("reviewMin")) {
    resultQuery.reviewMin = queryParams.get("reviewMin");
  }
  if (queryParams.has("reviewMax")) {
    resultQuery.reviewMax = queryParams.get("reviewMax");
  }

  // Title
  if (queryParams.has("title")) {
    resultQuery.title = queryParams.get("title");
  }

  // Author
  if (queryParams.has("author")) {
    resultQuery.author = queryParams.get("author");
  }

  return resultQuery;
};
