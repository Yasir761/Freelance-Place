export const useSetRecommendation = (arr) => {
  return arr;
  // const highestRated = arr
  //   .filter((item) => item?.rating?.star >= 3.5)
  //   .reduce((prev, next) => {
  //     return prev?.rating?.ratingCount > next?.rating?.ratingCount
  //       ? prev
  //       : next;
  //   }, arr[0]?.rating?.ratingCount);

  //   console.log(highestRated)

  // const arrayWithRecommendation = arr.map((item) => {
  //   item._id === highestRated._id
  //     ? (item.isRecommended = true)
  //     : (item.isRecommended = false);
  //   return item;
  // });

  // return arrayWithRecommendation;
};

export const useSortedByRecommendation = (arr) => {
  const updatedArr = [...arr];
  const recommendCardIndex = updatedArr.findIndex((card) => card.isRecommended);
  if (recommendCardIndex === -1) return null;
  const temp = updatedArr[0];
  updatedArr[0] = updatedArr[recommendCardIndex];
  updatedArr[recommendCardIndex] = temp;
  return updatedArr;
};

// based on creation date
export const useSortedByDate = (arr) => {
  const updatedArr = [...arr];
  updatedArr.sort((first, second) => {
    const d1 = new Date(first.createdAt);
    const d2 = new Date(second.createdAt);
    return d2 - d1;
  });
  return updatedArr;
};

// based on rating
export const useSortedByPopularity = (arr) => {
  const updatedArr = [...arr];
  updatedArr.sort(
    (first, second) => second?.rating?.ratingCount - first?.rating?.ratingCount
  );

  return updatedArr;
};
