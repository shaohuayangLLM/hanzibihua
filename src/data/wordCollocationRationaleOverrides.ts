import type { OptionRationale } from "./wordCollocationTypes";

export type OptionRationaleOverride = Pick<OptionRationale, "reason" | "contrastExample">;

// 按题目 + 选项的人工精修解释（第一批）
export const RATIONALE_OVERRIDES: Record<string, Record<string, OptionRationaleOverride>> = {
  wc053: {
    听: {
      reason: "“认真地听”用于上课场景最自然，表示专注听讲。",
    },
    看: {
      reason: "“认真地看”通常用于看书或看图，不对应“听讲”语境。",
    },
  },
  wc056: {
    看: {
      reason: "“仔细地看题目”是固定课堂表达，和句子语境完全一致。",
    },
    听: {
      reason: "题目场景是“看题目”，不是“听题目”。",
    },
  },
  wc057: {
    玩: {
      reason: "“高高兴兴地玩”表示愉快地玩耍，和句子主语“小朋友们”匹配。",
    },
    去: {
      reason: "“高高兴兴地去”通常后面还要接地点或活动，这里语义不完整。",
    },
  },
  wc059: {
    拉: {
      reason: "“用力地拉绳子”是拔河等场景的标准搭配。",
    },
    推: {
      reason: "句子宾语是“绳子”，更常搭配“拉”而不是“推”。",
    },
  },
  wc060: {
    学习: {
      reason: "“努力地学习”是学校语境高频搭配，表达最准确。",
    },
    练习: {
      reason: "“努力地练习”也通顺，但本题句子语境固定为“学习”。",
    },
  },
};

export const hasRationaleOverride = (questionId: string): boolean => {
  return Boolean(RATIONALE_OVERRIDES[questionId]);
};
