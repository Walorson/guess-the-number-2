export let rand = Math.floor(Math.random() * 101);
export function setRand(min, max) {
  rand = Math.floor(Math.random() * (max + 1 - min)) + min;
}
export function returnRand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
export function forceRand(number) {
  rand = number;
}
