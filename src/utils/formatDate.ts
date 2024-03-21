export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  const formattedDate = `${day.replace(/^0+/, "")}.${month.replace(
    /^0+/,
    ""
  )}.${year}`;
  return formattedDate;
};
