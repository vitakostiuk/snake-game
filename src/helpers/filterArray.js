export const filterArray = (arr) => {
  const temp = [];
  return arr
    .sort((a, b) => b.score - a.score)
    .filter((i) => {
      if (temp.includes(i.name)) {
        return false;
      }
      temp.push(i.name);
      return true;
    });
};
