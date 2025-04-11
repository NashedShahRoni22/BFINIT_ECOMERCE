// function to check if user select new component
export const areComponentsEqual = (obj1, obj2) => {
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
};
