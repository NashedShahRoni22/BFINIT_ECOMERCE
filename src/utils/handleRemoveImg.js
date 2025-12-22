export const handleRemoveImg = (type, setSelectedImages) => {
  setSelectedImages((prev) => ({ ...prev, [type]: null }));
};
