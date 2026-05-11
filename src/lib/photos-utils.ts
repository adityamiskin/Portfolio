export function formatPhotosDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate().toString().padStart(2, "0");
  const month = d
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day} ${month} ${year} ${hours}:${minutes}${ampm}`;
}

export function formatPhotosDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate().toString().padStart(2, "0");
  const month = d
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const shortYear = d.getFullYear().toString().slice(-2);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day} ${month} ${shortYear} ${hours}:${minutes}${ampm}`;
}

export function formatPhotosDateOnly(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate().toString().padStart(2, "0");
  const month = d
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}