/**
 * 反义词/近义词练习数据
 * 一年级常用词汇关系练习
 */

export interface WordRelation {
  id: string;
  type: 'antonym' | 'synonym';  // 反义词 | 近义词
  word: string;                  // 词语
  pinyin: string;                // 拼音
  match: string;                 // 正确答案
  matchPinyin: string;           // 正确答案拼音
  options: string[];             // 选项（包含正确答案+3个干扰项）
  examples: string[];            // 例句
  category: string;              // 分类
}

export const WORD_RELATIONS: WordRelation[] = [
  // ==================== 反义词 ====================

  // 大小
  {
    id: "as001",
    type: "antonym",
    word: "大",
    pinyin: "dà",
    match: "小",
    matchPinyin: "xiǎo",
    options: ["小", "多", "高", "长"],
    examples: ["大象很大", "老鼠很小"],
    category: "大小"
  },
  {
    id: "as002",
    type: "antonym",
    word: "小",
    pinyin: "xiǎo",
    match: "大",
    matchPinyin: "dà",
    options: ["大", "少", "矮", "短"],
    examples: ["小猫很小", "大房子很大"],
    category: "大小"
  },

  // 多少
  {
    id: "as003",
    type: "antonym",
    word: "多",
    pinyin: "duō",
    match: "少",
    matchPinyin: "shǎo",
    options: ["少", "大", "高", "长"],
    examples: ["星星很多", "星星很少"],
    category: "数量"
  },
  {
    id: "as004",
    type: "antonym",
    word: "少",
    pinyin: "shǎo",
    match: "多",
    matchPinyin: "duō",
    options: ["多", "小", "矮", "短"],
    examples: ["水很少", "水很多"],
    category: "数量"
  },

  // 高矮
  {
    id: "as005",
    type: "antonym",
    word: "高",
    pinyin: "gāo",
    match: "矮",
    matchPinyin: "ǎi",
    options: ["矮", "大", "多", "长"],
    examples: ["树很高", "草很矮"],
    category: "高度"
  },
  {
    id: "as006",
    type: "antonym",
    word: "矮",
    pinyin: "ǎi",
    match: "高",
    matchPinyin: "gāo",
    options: ["高", "小", "少", "短"],
    examples: ["房子很矮", "树很高"],
    category: "高度"
  },

  // 长短
  {
    id: "as007",
    type: "antonym",
    word: "长",
    pinyin: "cháng",
    match: "短",
    matchPinyin: "duǎn",
    options: ["短", "大", "高", "多"],
    examples: ["绳子很长", "绳子很短"],
    category: "长度"
  },
  {
    id: "as008",
    type: "antonym",
    word: "短",
    pinyin: "duǎn",
    match: "长",
    matchPinyin: "cháng",
    options: ["长", "小", "矮", "少"],
    examples: ["时间很短", "时间很长"],
    category: "长度"
  },

  // 上下
  {
    id: "as009",
    type: "antonym",
    word: "上",
    pinyin: "shàng",
    match: "下",
    matchPinyin: "xià",
    options: ["下", "前", "左", "里"],
    examples: ["向上爬", "向下跳"],
    category: "方位"
  },
  {
    id: "as010",
    type: "antonym",
    word: "下",
    pinyin: "xià",
    match: "上",
    matchPinyin: "shàng",
    options: ["上", "后", "右", "外"],
    examples: ["向下游", "向上游"],
    category: "方位"
  },

  // 前后
  {
    id: "as011",
    type: "antonym",
    word: "前",
    pinyin: "qián",
    match: "后",
    matchPinyin: "hòu",
    options: ["后", "上", "左", "里"],
    examples: ["向前走", "向后退"],
    category: "方位"
  },
  {
    id: "as012",
    type: "antonym",
    word: "后",
    pinyin: "hòu",
    match: "前",
    matchPinyin: "qián",
    options: ["前", "下", "右", "外"],
    examples: ["向后看", "向前看"],
    category: "方位"
  },

  // 左右
  {
    id: "as013",
    type: "antonym",
    word: "左",
    pinyin: "zuǒ",
    match: "右",
    matchPinyin: "yòu",
    options: ["右", "前", "上", "里"],
    examples: ["向左转", "向右转"],
    category: "方位"
  },
  {
    id: "as014",
    type: "antonym",
    word: "右",
    pinyin: "yòu",
    match: "左",
    matchPinyin: "zuǒ",
    options: ["左", "后", "下", "外"],
    examples: ["向右看", "向左看"],
    category: "方位"
  },

  // 里外
  {
    id: "as015",
    type: "antonym",
    word: "里",
    pinyin: "lǐ",
    match: "外",
    matchPinyin: "wài",
    options: ["外", "前", "上", "左"],
    examples: ["屋里有人", "屋外有人"],
    category: "方位"
  },
  {
    id: "as016",
    type: "antonym",
    word: "外",
    pinyin: "wài",
    match: "里",
    matchPinyin: "lǐ",
    options: ["里", "后", "下", "右"],
    examples: ["屋外在下雨", "屋里在睡觉"],
    category: "方位"
  },

  // 黑白
  {
    id: "as017",
    type: "antonym",
    word: "黑",
    pinyin: "hēi",
    match: "白",
    matchPinyin: "bái",
    options: ["白", "红", "蓝", "绿"],
    examples: ["黑色的头发", "白色的云"],
    category: "颜色"
  },
  {
    id: "as018",
    type: "antonym",
    word: "白",
    pinyin: "bái",
    match: "黑",
    matchPinyin: "hēi",
    options: ["黑", "红", "蓝", "黄"],
    examples: ["白色的纸", "黑色的笔"],
    category: "颜色"
  },

  // 来去
  {
    id: "as019",
    type: "antonym",
    word: "来",
    pinyin: "lái",
    match: "去",
    matchPinyin: "qù",
    options: ["去", "进", "出", "回"],
    examples: ["来这里玩", "去那里玩"],
    category: "动作"
  },
  {
    id: "as020",
    type: "antonym",
    word: "去",
    pinyin: "qù",
    match: "来",
    matchPinyin: "lái",
    options: ["来", "进", "出", "回"],
    examples: ["去上学", "来上学"],
    category: "动作"
  },

  // 进出
  {
    id: "as021",
    type: "antonym",
    word: "进",
    pinyin: "jìn",
    match: "出",
    matchPinyin: "chū",
    options: ["出", "来", "去", "回"],
    examples: ["走进教室", "走出教室"],
    category: "动作"
  },
  {
    id: "as022",
    type: "antonym",
    word: "出",
    pinyin: "chū",
    match: "进",
    matchPinyin: "jìn",
    options: ["进", "来", "去", "回"],
    examples: ["出门玩", "进家门"],
    category: "动作"
  },

  // 开关
  {
    id: "as023",
    type: "antonym",
    word: "开",
    pinyin: "kāi",
    match: "关",
    matchPinyin: "guān",
    options: ["关", "进", "出", "停"],
    examples: ["开门", "关门"],
    category: "动作"
  },
  {
    id: "as024",
    type: "antonym",
    word: "关",
    pinyin: "guān",
    match: "开",
    matchPinyin: "kāi",
    options: ["开", "进", "出", "停"],
    examples: ["关灯", "开灯"],
    category: "动作"
  },

  // 哭笑
  {
    id: "as025",
    type: "antonym",
    word: "哭",
    pinyin: "kū",
    match: "笑",
    matchPinyin: "xiào",
    options: ["笑", "叫", "喊", "闹"],
    examples: ["不要哭", "开心地笑"],
    category: "表情"
  },
  {
    id: "as026",
    type: "antonym",
    word: "笑",
    pinyin: "xiào",
    match: "哭",
    matchPinyin: "kū",
    options: ["哭", "叫", "喊", "闹"],
    examples: ["大声笑", "小声哭"],
    category: "表情"
  },

  // 快慢
  {
    id: "as027",
    type: "antonym",
    word: "快",
    pinyin: "kuài",
    match: "慢",
    matchPinyin: "màn",
    options: ["慢", "好", "多", "大"],
    examples: ["跑得很快", "走得很慢"],
    category: "速度"
  },
  {
    id: "as028",
    type: "antonym",
    word: "慢",
    pinyin: "màn",
    match: "快",
    matchPinyin: "kuài",
    options: ["快", "坏", "少", "小"],
    examples: ["动作很慢", "反应很快"],
    category: "速度"
  },

  // 好坏
  {
    id: "as029",
    type: "antonym",
    word: "好",
    pinyin: "hǎo",
    match: "坏",
    matchPinyin: "huài",
    options: ["坏", "快", "多", "大"],
    examples: ["好孩子", "坏习惯"],
    category: "性质"
  },
  {
    id: "as030",
    type: "antonym",
    word: "坏",
    pinyin: "huài",
    match: "好",
    matchPinyin: "hǎo",
    options: ["好", "慢", "少", "小"],
    examples: ["这个东西坏了", "这个东西很好"],
    category: "性质"
  },

  // 真假
  {
    id: "as031",
    type: "antonym",
    word: "真",
    pinyin: "zhēn",
    match: "假",
    matchPinyin: "jiǎ",
    options: ["假", "好", "对", "是"],
    examples: ["真的花", "假的花"],
    category: "真伪"
  },
  {
    id: "as032",
    type: "antonym",
    word: "假",
    pinyin: "jiǎ",
    match: "真",
    matchPinyin: "zhēn",
    options: ["真", "坏", "错", "不"],
    examples: ["假话", "真话"],
    category: "真伪"
  },

  // 对错
  {
    id: "as033",
    type: "antonym",
    word: "对",
    pinyin: "duì",
    match: "错",
    matchPinyin: "cuò",
    options: ["错", "好", "真", "是"],
    examples: ["做对了", "做错了"],
    category: "正误"
  },
  {
    id: "as034",
    type: "antonym",
    word: "错",
    pinyin: "cuò",
    match: "对",
    matchPinyin: "duì",
    options: ["对", "坏", "假", "不"],
    examples: ["选错了", "选对了"],
    category: "正误"
  },

  // 冷热
  {
    id: "as035",
    type: "antonym",
    word: "冷",
    pinyin: "lěng",
    match: "热",
    matchPinyin: "rè",
    options: ["热", "凉", "暖", "温"],
    examples: ["天气很冷", "天气很热"],
    category: "温度"
  },
  {
    id: "as036",
    type: "antonym",
    word: "热",
    pinyin: "rè",
    match: "冷",
    matchPinyin: "lěng",
    options: ["冷", "凉", "暖", "温"],
    examples: ["热水", "冷水"],
    category: "温度"
  },

  // 早晚
  {
    id: "as037",
    type: "antonym",
    word: "早",
    pinyin: "zǎo",
    match: "晚",
    matchPinyin: "wǎn",
    options: ["晚", "快", "好", "多"],
    examples: ["起得很早", "睡得很晚"],
    category: "时间"
  },
  {
    id: "as038",
    type: "antonym",
    word: "晚",
    pinyin: "wǎn",
    match: "早",
    matchPinyin: "zǎo",
    options: ["早", "慢", "坏", "少"],
    examples: ["来晚了", "来早了"],
    category: "时间"
  },

  // 粗细
  {
    id: "as039",
    type: "antonym",
    word: "粗",
    pinyin: "cū",
    match: "细",
    matchPinyin: "xì",
    options: ["细", "大", "长", "高"],
    examples: ["树很粗", "线很细"],
    category: "粗细"
  },
  {
    id: "as040",
    type: "antonym",
    word: "细",
    pinyin: "xì",
    match: "粗",
    matchPinyin: "cū",
    options: ["粗", "小", "短", "矮"],
    examples: ["头发很细", "树很粗"],
    category: "粗细"
  },

  // 深浅
  {
    id: "as041",
    type: "antonym",
    word: "深",
    pinyin: "shēn",
    match: "浅",
    matchPinyin: "qiǎn",
    options: ["浅", "高", "大", "多"],
    examples: ["水很深", "水很浅"],
    category: "深浅"
  },
  {
    id: "as042",
    type: "antonym",
    word: "浅",
    pinyin: "qiǎn",
    match: "深",
    matchPinyin: "shēn",
    options: ["深", "矮", "小", "少"],
    examples: ["水很浅", "水很深"],
    category: "深浅"
  },

  // 宽窄
  {
    id: "as043",
    type: "antonym",
    word: "宽",
    pinyin: "kuān",
    match: "窄",
    matchPinyin: "zhǎi",
    options: ["窄", "大", "长", "高"],
    examples: ["路很宽", "路很窄"],
    category: "宽窄"
  },
  {
    id: "as044",
    type: "antonym",
    word: "窄",
    pinyin: "zhǎi",
    match: "宽",
    matchPinyin: "kuān",
    options: ["宽", "小", "短", "矮"],
    examples: ["路很窄", "路很宽"],
    category: "宽窄"
  },

  // 新旧
  {
    id: "as045",
    type: "antonym",
    word: "新",
    pinyin: "xīn",
    match: "旧",
    matchPinyin: "jiù",
    options: ["旧", "好", "大", "多"],
    examples: ["新衣服", "旧衣服"],
    category: "新旧"
  },
  {
    id: "as046",
    type: "antonym",
    word: "旧",
    pinyin: "jiù",
    match: "新",
    matchPinyin: "xīn",
    options: ["新", "坏", "小", "少"],
    examples: ["旧书包", "新书包"],
    category: "新旧"
  },

  // ==================== 近义词 ====================

  // 高兴/开心
  {
    id: "as047",
    type: "synonym",
    word: "高兴",
    pinyin: "gāoxìng",
    match: "开心",
    matchPinyin: "kāixīn",
    options: ["开心", "难过", "生气", "悲伤"],
    examples: ["我很高兴", "我很开心"],
    category: "情绪"
  },
  {
    id: "as048",
    type: "synonym",
    word: "开心",
    pinyin: "kāixīn",
    match: "高兴",
    matchPinyin: "gāoxìng",
    options: ["高兴", "伤心", "痛苦", "忧愁"],
    examples: ["玩得很开心", "玩得很高兴"],
    category: "情绪"
  },

  // 美丽/漂亮
  {
    id: "as049",
    type: "synonym",
    word: "美丽",
    pinyin: "měilì",
    match: "漂亮",
    matchPinyin: "piàoliang",
    options: ["漂亮", "丑陋", "难看", "粗糙"],
    examples: ["美丽的花朵", "漂亮的女孩"],
    category: "外貌"
  },
  {
    id: "as050",
    type: "synonym",
    word: "漂亮",
    pinyin: "piàoliang",
    match: "美丽",
    matchPinyin: "měilì",
    options: ["美丽", "难看", "丑陋", "粗糙"],
    examples: ["漂亮的衣服", "美丽的风景"],
    category: "外貌"
  },

  // 马上/立刻
  {
    id: "as051",
    type: "synonym",
    word: "马上",
    pinyin: "mǎshàng",
    match: "立刻",
    matchPinyin: "lìkè",
    options: ["立刻", "慢慢", "等会", "很久"],
    examples: ["马上就来", "立刻就来"],
    category: "时间"
  },
  {
    id: "as052",
    type: "synonym",
    word: "立刻",
    pinyin: "lìkè",
    match: "马上",
    matchPinyin: "mǎshàng",
    options: ["马上", "慢慢", "等会", "很久"],
    examples: ["立刻出发", "马上出发"],
    category: "时间"
  },

  // 非常/特别
  {
    id: "as053",
    type: "synonym",
    word: "非常",
    pinyin: "fēicháng",
    match: "特别",
    matchPinyin: "tèbié",
    options: ["特别", "一般", "普通", "平常"],
    examples: ["非常好", "特别好"],
    category: "程度"
  },
  {
    id: "as054",
    type: "synonym",
    word: "特别",
    pinyin: "tèbié",
    match: "非常",
    matchPinyin: "fēicháng",
    options: ["非常", "一般", "普通", "平常"],
    examples: ["特别喜欢", "非常喜欢"],
    category: "程度"
  },

  // 看见/看到
  {
    id: "as055",
    type: "synonym",
    word: "看见",
    pinyin: "kànjiàn",
    match: "看到",
    matchPinyin: "kàndào",
    options: ["看到", "听见", "闻到", "摸到"],
    examples: ["看见小鸟", "看到小鸟"],
    category: "感知"
  },
  {
    id: "as056",
    type: "synonym",
    word: "看到",
    pinyin: "kàndào",
    match: "看见",
    matchPinyin: "kànjiàn",
    options: ["看见", "听到", "闻到", "摸到"],
    examples: ["我看到了", "我看见了"],
    category: "感知"
  },

  // 赶快/赶紧
  {
    id: "as057",
    type: "synonym",
    word: "赶快",
    pinyin: "gǎnkuài",
    match: "赶紧",
    matchPinyin: "gǎnjǐn",
    options: ["赶紧", "慢慢", "迟缓", "拖延"],
    examples: ["赶快走", "赶紧走"],
    category: "动作"
  },
  {
    id: "as058",
    type: "synonym",
    word: "赶紧",
    pinyin: "gǎnjǐn",
    match: "赶快",
    matchPinyin: "gǎnkuài",
    options: ["赶快", "慢慢", "迟缓", "拖延"],
    examples: ["赶紧回家", "赶快回家"],
    category: "动作"
  },

  // 有名/出名
  {
    id: "as059",
    type: "synonym",
    word: "有名",
    pinyin: "yǒumíng",
    match: "出名",
    matchPinyin: "chūmíng",
    options: ["出名", "无名", "默默", "普通"],
    examples: ["很有名", "很出名"],
    category: "声望"
  },
  {
    id: "as060",
    type: "synonym",
    word: "出名",
    pinyin: "chūmíng",
    match: "有名",
    matchPinyin: "yǒumíng",
    options: ["有名", "无名", "默默", "普通"],
    examples: ["很出名", "很有名"],
    category: "声望"
  },

  // 中心/中央
  {
    id: "as061",
    type: "synonym",
    word: "中心",
    pinyin: "zhōngxīn",
    match: "中央",
    matchPinyin: "zhōngyāng",
    options: ["中央", "旁边", "边缘", "四周"],
    examples: ["广场中心", "广场中央"],
    category: "位置"
  },
  {
    id: "as062",
    type: "synonym",
    word: "中央",
    pinyin: "zhōngyāng",
    match: "中心",
    matchPinyin: "zhōngxīn",
    options: ["中心", "旁边", "边缘", "四周"],
    examples: ["舞台中央", "舞台中心"],
    category: "位置"
  },

  // 表扬/夸奖
  {
    id: "as063",
    type: "synonym",
    word: "表扬",
    pinyin: "biǎoyáng",
    match: "夸奖",
    matchPinyin: "kuājiǎng",
    options: ["夸奖", "批评", "指责", "责怪"],
    examples: ["老师表扬我", "老师夸奖我"],
    category: "评价"
  },
  {
    id: "as064",
    type: "synonym",
    word: "夸奖",
    pinyin: "kuājiǎng",
    match: "表扬",
    matchPinyin: "biǎoyáng",
    options: ["表扬", "批评", "指责", "责怪"],
    examples: ["妈妈夸奖我", "妈妈表扬我"],
    category: "评价"
  },

  // 时候/时间
  {
    id: "as065",
    type: "synonym",
    word: "时候",
    pinyin: "shíhou",
    match: "时间",
    matchPinyin: "shíjiān",
    options: ["时间", "地点", "地方", "位置"],
    examples: ["什么时候", "什么时间"],
    category: "时间"
  },
  {
    id: "as066",
    type: "synonym",
    word: "时间",
    pinyin: "shíjiān",
    match: "时候",
    matchPinyin: "shíhou",
    options: ["时候", "地点", "地方", "位置"],
    examples: ["没有时间", "没有时候"],
    category: "时间"
  },

  // 办法/方法
  {
    id: "as067",
    type: "synonym",
    word: "办法",
    pinyin: "bànfǎ",
    match: "方法",
    matchPinyin: "fāngfǎ",
    options: ["方法", "困难", "问题", "麻烦"],
    examples: ["想办法", "找方法"],
    category: "方式"
  },
  {
    id: "as068",
    type: "synonym",
    word: "方法",
    pinyin: "fāngfǎ",
    match: "办法",
    matchPinyin: "bànfǎ",
    options: ["办法", "困难", "问题", "麻烦"],
    examples: ["好方法", "好办法"],
    category: "方式"
  },

  // 快乐/欢乐
  {
    id: "as069",
    type: "synonym",
    word: "快乐",
    pinyin: "kuàilè",
    match: "欢乐",
    matchPinyin: "huānlè",
    options: ["欢乐", "痛苦", "悲伤", "忧愁"],
    examples: ["快乐的节日", "欢乐的节日"],
    category: "情绪"
  },
  {
    id: "as070",
    type: "synonym",
    word: "欢乐",
    pinyin: "huānlè",
    match: "快乐",
    matchPinyin: "kuàilè",
    options: ["快乐", "痛苦", "悲伤", "忧愁"],
    examples: ["欢乐的笑声", "快乐的笑声"],
    category: "情绪"
  },

  // 舒服/舒适
  {
    id: "as071",
    type: "synonym",
    word: "舒服",
    pinyin: "shūfu",
    match: "舒适",
    matchPinyin: "shūshì",
    options: ["舒适", "痛苦", "难受", "疼痛"],
    examples: ["睡得很舒服", "睡得很舒适"],
    category: "感受"
  },
  {
    id: "as072",
    type: "synonym",
    word: "舒适",
    pinyin: "shūshì",
    match: "舒服",
    matchPinyin: "shūfu",
    options: ["舒服", "痛苦", "难受", "疼痛"],
    examples: ["感觉很舒适", "感觉很舒服"],
    category: "感受"
  },

  // 安静/寂静
  {
    id: "as073",
    type: "synonym",
    word: "安静",
    pinyin: "ānjìng",
    match: "寂静",
    matchPinyin: "jìjìng",
    options: ["寂静", "吵闹", "喧哗", "热闹"],
    examples: ["教室很安静", "森林很寂静"],
    category: "环境"
  },
  {
    id: "as074",
    type: "synonym",
    word: "寂静",
    pinyin: "jìjìng",
    match: "安静",
    matchPinyin: "ānjìng",
    options: ["安静", "吵闹", "喧哗", "热闹"],
    examples: ["夜晚很寂静", "夜晚很安静"],
    category: "环境"
  },

  // 突然/忽然
  {
    id: "as075",
    type: "synonym",
    word: "突然",
    pinyin: "tūrán",
    match: "忽然",
    matchPinyin: "hūrán",
    options: ["忽然", "逐渐", "慢慢", "渐渐"],
    examples: ["突然出现", "忽然出现"],
    category: "时间"
  },
  {
    id: "as076",
    type: "synonym",
    word: "忽然",
    pinyin: "hūrán",
    match: "突然",
    matchPinyin: "tūrán",
    options: ["突然", "逐渐", "慢慢", "渐渐"],
    examples: ["忽然想起", "突然想起"],
    category: "时间"
  },

  // 经常/常常
  {
    id: "as077",
    type: "synonym",
    word: "经常",
    pinyin: "jīngcháng",
    match: "常常",
    matchPinyin: "chángcháng",
    options: ["常常", "偶尔", "有时", "很少"],
    examples: ["经常去公园", "常常去公园"],
    category: "频率"
  },
  {
    id: "as078",
    type: "synonym",
    word: "常常",
    pinyin: "chángcháng",
    match: "经常",
    matchPinyin: "jīngcháng",
    options: ["经常", "偶尔", "有时", "很少"],
    examples: ["常常看书", "经常看书"],
    category: "频率"
  },
];

export const WORD_CATEGORIES = [
  "全部",
  "大小",
  "数量",
  "高度",
  "长度",
  "方位",
  "颜色",
  "动作",
  "表情",
  "速度",
  "性质",
  "真伪",
  "正误",
  "温度",
  "时间",
  "粗细",
  "深浅",
  "宽窄",
  "新旧",
  "情绪",
  "外貌",
  "程度",
  "感知",
  "声望",
  "位置",
  "评价",
  "方式",
  "感受",
  "环境",
  "频率"
];

export const WORD_TYPES = [
  { value: "all", label: "全部", color: "bg-gray-500" },
  { value: "antonym", label: "反义词", color: "bg-red-500" },
  { value: "synonym", label: "近义词", color: "bg-green-500" },
];
