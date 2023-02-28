export function hasDuplicates(array: string[]) {
  return (new Set(array)).size !== array.length;
}
