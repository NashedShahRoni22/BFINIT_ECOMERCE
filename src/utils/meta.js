export const updateStoreMeta = (meta) => {
  // update title
  document.title = meta.Title || "Store";

  // update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  metaDescription.setAttribute(
    "content",
    meta.Description ||
      "Discover amazing products and great deals at our online store",
  );
};
