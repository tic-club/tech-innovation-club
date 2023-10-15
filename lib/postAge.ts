export function calculatePostAge(dateCreated: string | number | Date) {
  const postDate = new Date(dateCreated).getTime();
  const currentDate = Date.now();
  const timeDifference = currentDate - postDate;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference !== 1 ? "s" : ""
    } ago`;
  }

  const minutesDifference = Math.floor(secondsDifference / 60);
  if (minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  }

  const hoursDifference = Math.floor(minutesDifference / 60);
  if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  }

  const daysDifference = Math.floor(hoursDifference / 24);
  return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
}
