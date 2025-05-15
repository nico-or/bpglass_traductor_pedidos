export function reverseAlias<T extends { alias: string[] }>(list: T[]) {
  return list.reduce((acc, item) => {
    item.alias.forEach((alias) => {
      if (acc[alias]) {
        console.warn(`Duplicate alias detected: ${alias}`);
      }
      acc[alias] = item;
    });
    return acc;
  }, {} as Record<string, T>);
}
