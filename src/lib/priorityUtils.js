const dictionary = new Map([
  [0, { title: { zh: "无", en: "none" } }],
  [1, { title: { zh: "低", en: "low" } }],
  [2, { title: { zh: "中", en: "medium" } }],
  [3, { title: { zh: "高", en: "high" } }],
]);

export const getPriorityTitle = (priority, lang) => {
  return dictionary.get(priority).title[lang];
};

export const getPriorityTooltip = (priority) => {
  if (priority === 0) {
    return "设置优先级";
  }

  return `${getPriorityTitle(priority, "zh")}优先级`;
};
