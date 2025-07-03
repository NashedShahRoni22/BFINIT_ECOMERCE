export const handleImgChange = (e, type, setSelectedImages) => {
  const file = e.target.files[0];
  e.target.value = null;

  if (file) {
    setSelectedImages((prev) => ({ ...prev, [type]: file }));
  }
};
