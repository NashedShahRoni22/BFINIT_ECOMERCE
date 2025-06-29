export const handleImgChange = (e, type, setSelectedImages) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImages((prev) => ({ ...prev, [type]: file }));
  }
};
