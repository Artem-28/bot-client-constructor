export function toArray(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  return [value];
}
