export const handleImgChange = (e, type, setSelectedImages) => {
  const file = e.target.files[0];
  setSelectedImages((prev) => ({ ...prev, [type]: file }));
};
