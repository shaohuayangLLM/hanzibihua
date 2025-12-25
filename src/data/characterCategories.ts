// 汉字分类数据 - 基于一年级人教版课本
export interface CharacterCategory {
  id: string;
  name: string;
  icon: string;
  characters: string[];
}

export const characterCategories: CharacterCategory[] = [
  {
    id: "numbers",
    name: "数字",
    icon: "🔢",
    characters: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"],
  },
  {
    id: "nature",
    name: "自然",
    icon: "🌿",
    characters: ["日", "月", "水", "火", "山", "石", "田", "土", "云", "雨", "风", "雪", "天", "地", "花", "草", "木", "树", "林", "森"],
  },
  {
    id: "animals",
    name: "动物",
    icon: "🐾",
    characters: ["马", "牛", "羊", "鸟", "虫", "鱼", "猫", "狗", "鸡", "鸭", "猪", "兔", "龙", "虎", "象", "蛇", "蚂", "蚁"],
  },
  {
    id: "colors",
    name: "颜色",
    icon: "🎨",
    characters: ["红", "黄", "蓝", "绿", "白", "黑", "紫", "青", "橙"],
  },
  {
    id: "body",
    name: "身体",
    icon: "🧍",
    characters: ["口", "目", "耳", "手", "足", "头", "心", "牙", "毛", "皮", "骨"],
  },
  {
    id: "family",
    name: "家庭",
    icon: "👨‍👩‍👧",
    characters: ["人", "大", "小", "父", "母", "子", "女", "儿", "爸", "妈", "爷", "奶", "哥", "姐", "弟", "妹", "男", "女"],
  },
  {
    id: "actions",
    name: "动作",
    icon: "🏃",
    characters: ["走", "跑", "跳", "看", "听", "说", "读", "写", "坐", "站", "吃", "喝", "打", "拍", "飞", "游", "来", "去", "上", "下"],
  },
  {
    id: "time",
    name: "时间",
    icon: "⏰",
    characters: ["年", "月", "日", "时", "分", "秒", "早", "晚", "今", "明", "昨", "春", "夏", "秋", "冬"],
  },
  {
    id: "directions",
    name: "方位",
    icon: "🧭",
    characters: ["上", "下", "左", "右", "前", "后", "东", "南", "西", "北", "中", "里", "外", "内"],
  },
  {
    id: "school",
    name: "学习",
    icon: "📚",
    characters: ["书", "本", "笔", "字", "文", "语", "数", "学", "习", "课", "校", "师", "生", "教", "问", "答"],
  },
  {
    id: "food",
    name: "食物",
    icon: "🍎",
    characters: ["米", "面", "菜", "肉", "果", "瓜", "豆", "糖", "饭", "汤", "茶", "奶"],
  },
  {
    id: "objects",
    name: "物品",
    icon: "📦",
    characters: ["门", "窗", "床", "桌", "椅", "车", "船", "电", "灯", "钟", "表", "纸", "刀", "尺"],
  },
];

// 获取所有分类中的汉字
export const getAllCategorizedCharacters = (): string[] => {
  const allChars = characterCategories.flatMap(cat => cat.characters);
  return [...new Set(allChars)]; // 去重
};

// 根据汉字查找所属分类
export const getCategoryByCharacter = (char: string): CharacterCategory | undefined => {
  return characterCategories.find(cat => cat.characters.includes(char));
};
