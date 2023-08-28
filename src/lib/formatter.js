export const formatPriority = (priority) => {
  const dictionary = new Map([
    [0, { title: { zh: "无", en: "none" } }],
    [1, { title: { zh: "低", en: "low" } }],
    [2, { title: { zh: "中", en: "medium" } }],
    [3, { title: { zh: "高", en: "high" } }],
  ]);

  return dictionary.get(priority);
};
