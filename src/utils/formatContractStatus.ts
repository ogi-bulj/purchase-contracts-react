export const formatContractStatus = (status: string) => {
  if (status === "KREIRANO") {
    return "green";
  } else if (status === "NARUČENO") {
    return "yellow";
  } else if (status === "ISPORUČENO") {
    return "grey";
  }
};
