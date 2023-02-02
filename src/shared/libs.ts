import { UserType } from '../store/users';

export const sortByDate = (arr: Array<UserType>) => {
  const sortedArr = arr.sort((a, b) => {
    return Date.parse(b.createDate) - Date.parse(a.createDate);
  });
  return sortedArr;
};
