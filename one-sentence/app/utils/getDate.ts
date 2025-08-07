export function getSplitDate() {
  const date = new Date();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return { month, day, year };
}

export function getCombinedDate() {
  const date = new Date();
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "")
    .toUpperCase();
}
