import dayjs from "dayjs";

export class Todo {
  constructor(title = "", priority = 0, date = null, reminder = null) {
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.reminder = reminder;
  }
}

// 用于暂存当前处理的 todo 的初始信息
class TodoBuffer {
  #loaded;

  constructor() {
    this.current = null;
    this.#loaded = false;
  }

  store(newValue) {
    if (!this.#loaded) {
      this.current = newValue;
      this.#loaded = true;
    }
  }

  move() {
    this.current = null;
    this.#loaded = false;
  }
}
export const todoBuffer = new TodoBuffer();

export function reducer(state, action) {
  switch (action.type) {
    case "changed_title": {
      return {
        ...state,
        title: action.nextTitle,
      };
    }
    case "changed_priority": {
      return {
        ...state,
        priority: action.nextPriority,
      };
    }
    case "changed_date": {
      let nextReminder = action.originReminder ?? null;
      if (!!state.date && !!state.reminder && !!action.nextDate) {
        const advanceTime = dayjs(state.date).diff(state.reminder, "minute");
        nextReminder = dayjs(action.nextDate).subtract(advanceTime, "minute");
      }
      return {
        ...state,
        date: action.nextDate,
        reminder: nextReminder,
      };
    }
    case "changed_reminder": {
      return {
        ...state,
        reminder: action.nextReminder,
      };
    }
    case "commited_form": {
      return new Todo();
    }
  }
}
