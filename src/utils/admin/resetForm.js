export const resetForm = (setFormData, setSelectedImages, setImagePreviews) => {
  setFormData({
    name: "",
    category: {
      id: "",
      name: "",
    },
    subCategory: "",
    originalPrice: "",
    discountPercent: "",
    quantity: "",
    shippingCharge: "",
    brand: {
      id: "",
      name: "",
    },
    status: "yes",
    bestSelling: "",
    flashSell: "",
    featured: "",
    new: "",
    description: "",
  });

  setSelectedImages([]);
  setImagePreviews([]);
};
