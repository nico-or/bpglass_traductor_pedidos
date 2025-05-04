export function reverseAlias(list) {
  return list.reduce((acc, item) => {
    item.alias.forEach((alias) => {
      acc[alias] = item;
    });
    return acc;
  }, {});
}
