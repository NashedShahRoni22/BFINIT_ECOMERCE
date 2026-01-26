export const updateStoreMeta = (meta) => {
  // update title
  document.title = meta.Title || "Online Store";

  // update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  metaDescription.setAttribute(
    "content",
    meta.Description ||
      "Discover quality products with fast shipping and secure checkout. Shop now for the best deals and excellent customer service.",
  );
};
