export function roundDecimalPlaces(num: number, places = 2): number {
  return Math.round(num * 10 ** places) / 10 ** places
}
