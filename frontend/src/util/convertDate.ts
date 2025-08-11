export const convertDate = (date: string) => {
  const data = date.split("-");
  const year = data[0];
  const month = data[1];
  const day = data[2].split("T")[0];
  return `${year}/${month}/${day}`;
};
