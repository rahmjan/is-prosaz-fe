export function zeroPad(num: number, places: number): string {
  return String(num).padStart(places, '0');
}

export function getDateFormat(date: Date): string {
  // We do not use UTC time :(
  return `${date.getFullYear()}-${zeroPad(date.getMonth()+1, 2)}-${date.getDate()}`;
}