const dictionary = new Map([
    [0, { title: { zh: "无", en: "none" } }],
    [1, { title: { zh: "低", en: "low" } }],
    [2, { title: { zh: "中", en: "medium" } }],
    [3, { title: { zh: "高", en: "high" } }],
]);
const titleMapping = new Map([
    [0, "不重要不紧急"],
    [1, "不重要紧急"],
    [2, "重要不紧急"],
    [3, "重要紧急"],
]);

export const getPriorityTitle = (priority, lang) => {
    return dictionary.get(priority).title[lang];
};

export const getPriorityMark = (priority) => {
    return titleMapping.get(priority);
};

export const getPriorityTooltip = (priority) => {
    if (priority === 0) {
        return "设置优先级";
    }

    return `${getPriorityTitle(priority, "zh")}优先级`;
};

export const getPriorityClassName = (priority) => {
    switch (priority) {
        case 1: {
            return "text-blue-500 bg-blue-500/20";
        }
        case 2: {
            return "text-yellow-500 bg-yellow-500/20";
        }
        case 3: {
            return "text-red-500 bg-red-500/20";
        }
    }
};