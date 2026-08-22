export const META_PIXEL_ID = "1030781019914281";

const hasFbq = () => typeof window !== "undefined" && typeof window.fbq === "function";

export const trackMetaPageView = () => {
  if (!hasFbq()) return;
  window.fbq("track", "PageView");
};

export const trackMetaEvent = (eventName, params = {}) => {
  if (!hasFbq()) return;
  window.fbq("track", eventName, params);
};

export const productToMetaContent = (item) => {
  let id = null;
  if (item?._id) {
    id = item._id;
  } else if (item?.id) {
    id = item.id;
  } else if (item?.product) {
    id = typeof item.product === "object" ? (item.product._id || item.product.id) : item.product;
  } else if (item?.productId) {
    id = typeof item.productId === "object" ? (item.productId._id || item.productId.id) : item.productId;
  } else {
    id = item?.productCode || item?.name;
  }

  return {
    id: id,
    quantity: Number(item?.quantity || 1),
  };
};

export const cartToMetaParams = (items = [], value = 0) => ({
  currency: "INR",
  value: Number(value || 0),
  contents: items.map(productToMetaContent).filter((content) => content.id),
  content_type: "product",
});
