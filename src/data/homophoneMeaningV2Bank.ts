import type {
  GradeBand,
  HomophoneQuestionV2,
  HomophoneQuestionV2Base,
  HomophoneVisualLesson,
  MisconceptionType,
} from "./homophoneMeaningTypes";

type UnitWord = "w1" | "w2" | "w3" | "w4";
type QuestionKind =
  | "core-meaning"
  | "context-choice"
  | "error-diagnosis"
  | "correction"
  | "constrained-output";

interface UnitDef {
  unitId: string;
  grade: GradeBand;
  pinyin: string;
  words: Record<UnitWord, string>;
  meanings: Record<UnitWord, string>;
  context: Record<UnitWord, string>;
}

const UNIT_WORD_ORDER: UnitWord[] = ["w1", "w2", "w3", "w4"];

const PINYIN_TONE_MAP: Record<string, string> = {
  sheng: "shēng",
  shi: "shí",
  li: "lǐ",
  mu: "mù",
  yuan: "yuán",
  ji: "jì",
  gong: "gōng",
  qi: "qī",
  shu: "shū",
  yi: "yì",
  he: "hé",
  xin: "xīn",
  ma: "mā",
  dao: "dāo",
  qing: "qīng",
  zhu: "zhū",
  jin: "jīn",
  yu: "yǔ",
  yang: "yáng",
  liang: "liáng",
  tong: "tóng",
  lan: "lán",
  "gong shi": "gōng shì",
  "yi shi": "yì shì",
  "gong ke": "gōng kè",
  "shou shi": "shǒu shì",
  "gong ji": "gōng jī",
  "shi shi": "shì shí",
  "jing li": "jīng lì",
  "qi shi": "qí shì",
  "shi yi": "shì yì",
};

const toTonePinyin = (raw: string): string => PINYIN_TONE_MAP[raw] ?? raw;

const UNIT_DEFS: UnitDef[] = [
  {
    unitId: "u01",
    grade: "grade1-vol1",
    pinyin: "sheng",
    words: { w1: "生", w2: "声", w3: "升", w4: "牲" },
    meanings: { w1: "生长，产生", w2: "声音，响声", w3: "上升，提高", w4: "牲畜，家畜" },
    context: {
      w1: "春天到了，地里的麦苗开始___了。",
      w2: "上课铃___一响，同学们马上回到座位。",
      w3: "热气球慢慢___到天空中。",
      w4: "牧场里的___每天都要按时喂养。",
    },
  },
  {
    unitId: "u02",
    grade: "grade1-vol1",
    pinyin: "shi",
    words: { w1: "时", w2: "十", w3: "石", w4: "食" },
    meanings: { w1: "时间，时候", w2: "数字十", w3: "石头，岩石", w4: "食物，吃" },
    context: {
      w1: "我们要珍惜学习___间。",
      w2: "这个班一共有三___名同学。",
      w3: "小河边有很多光滑的___头。",
      w4: "饭前要洗手，注意饮___卫生。",
    },
  },
  {
    unitId: "u03",
    grade: "grade1-vol1",
    pinyin: "li",
    words: { w1: "里", w2: "礼", w3: "李", w4: "理" },
    meanings: { w1: "里面，内部", w2: "礼貌，礼节", w3: "李子，姓李", w4: "道理，整理" },
    context: {
      w1: "铅笔在书包___面。",
      w2: "见到老师要主动问___。",
      w3: "果园里的___子成熟了。",
      w4: "他说的话很有道___。",
    },
  },
  {
    unitId: "u04",
    grade: "grade1-vol2",
    pinyin: "mu",
    words: { w1: "木", w2: "目", w3: "幕", w4: "牧" },
    meanings: { w1: "树木，木头", w2: "眼目，条目", w3: "幕布，一幕", w4: "放牧，牧养" },
    context: {
      w1: "桌子是___头做的。",
      w2: "请大家把这一___看清楚。",
      w3: "演出开始前，___布缓缓拉开。",
      w4: "草原上的叔叔在___羊。",
    },
  },
  {
    unitId: "u05",
    grade: "grade1-vol2",
    pinyin: "yuan",
    words: { w1: "园", w2: "圆", w3: "员", w4: "元" },
    meanings: { w1: "园子，花园", w2: "圆形，团圆", w3: "成员，队员", w4: "货币单位，开始" },
    context: {
      w1: "同学们在校___里种下了小树。",
      w2: "月亮像一个大___盘。",
      w3: "他是学校足球队的一___。",
      w4: "这支铅笔五___钱。",
    },
  },
  {
    unitId: "u06",
    grade: "grade1-vol2",
    pinyin: "ji",
    words: { w1: "记", w2: "计", w3: "季", w4: "纪" },
    meanings: { w1: "记住，记录", w2: "计算，计划", w3: "季节，一季", w4: "纪律，纪念" },
    context: {
      w1: "老师提醒大家___住安全规则。",
      w2: "我们要先___算再作答。",
      w3: "秋___到了，天气变凉了。",
      w4: "学校要求同学们遵守校___。",
    },
  },
  {
    unitId: "u07",
    grade: "grade2-vol1",
    pinyin: "gong",
    words: { w1: "工", w2: "公", w3: "功", w4: "弓" },
    meanings: { w1: "工作，工人", w2: "公共，公正", w3: "功劳，成功", w4: "弓箭，弯曲" },
    context: {
      w1: "建筑___人正在认真施工。",
      w2: "图书馆是___共场所，要保持安静。",
      w3: "大家齐心协力，终于立了大___。",
      w4: "古代士兵常用___箭作战。",
    },
  },
  {
    unitId: "u08",
    grade: "grade2-vol1",
    pinyin: "qi",
    words: { w1: "七", w2: "期", w3: "妻", w4: "戚" },
    meanings: { w1: "数字七", w2: "日期，期待", w3: "妻子", w4: "亲戚，忧愁" },
    context: {
      w1: "一周有___天。",
      w2: "我们要按___完成作业。",
      w3: "古诗里常提到“夫___”二字。",
      w4: "过年时，很多亲___来家里做客。",
    },
  },
  {
    unitId: "u09",
    grade: "grade2-vol1",
    pinyin: "shu",
    words: { w1: "书", w2: "叔", w3: "梳", w4: "舒" },
    meanings: { w1: "书本，读物", w2: "叔叔，长辈", w3: "梳理，梳子", w4: "舒展，舒服" },
    context: {
      w1: "我最喜欢在图书馆看___。",
      w2: "楼下的王___很热心，常帮助大家。",
      w3: "每天早上都要先___头再出门。",
      w4: "做完广播操后，身体更___服了。",
    },
  },
  {
    unitId: "u10",
    grade: "grade2-vol2",
    pinyin: "yi",
    words: { w1: "意", w2: "义", w3: "艺", w4: "亿" },
    meanings: { w1: "意思，心意", w2: "意义，正义", w3: "才艺，艺术", w4: "数量单位亿" },
    context: {
      w1: "这句话是什___思？",
      w2: "帮助别人是一件有___义的事。",
      w3: "她在文艺汇演中展示了舞蹈才___。",
      w4: "我国人口超过十___。",
    },
  },
  {
    unitId: "u11",
    grade: "grade2-vol2",
    pinyin: "he",
    words: { w1: "河", w2: "荷", w3: "合", w4: "盒" },
    meanings: { w1: "河流", w2: "荷花，荷叶", w3: "合并，适合", w4: "盒子" },
    context: {
      w1: "小___边长着一排柳树。",
      w2: "夏天池塘里的___花开了。",
      w3: "大家齐心___力就能完成任务。",
      w4: "文具都放在铅笔___里。",
    },
  },
  {
    unitId: "u12",
    grade: "grade2-vol2",
    pinyin: "xin",
    words: { w1: "心", w2: "新", w3: "欣", w4: "薪" },
    meanings: { w1: "心脏，内心", w2: "新的", w3: "欣喜，快乐", w4: "薪水，柴薪" },
    context: {
      w1: "我们要有一颗感恩的___。",
      w2: "老师发给我们一套___课本。",
      w3: "听到好消息，大家都很___喜。",
      w4: "爸爸每月都会按时领到工___。",
    },
  },
];

const DIFFICULTY: Array<"easy" | "medium" | "hard"> = [
  "easy",
  "easy",
  "medium",
  "medium",
  "medium",
  "hard",
  "hard",
  "hard",
];

const misconceptionByKind: Record<QuestionKind, MisconceptionType> = {
  "core-meaning": "近义误判",
  "context-choice": "语境忽略",
  "error-diagnosis": "字形联想",
  correction: "搭配不当",
  "constrained-output": "语境忽略",
};

const buildQuality = (isReviewed: boolean): HomophoneQuestionV2Base["quality"] => ({
  source: "textbook",
  reviewStatus: isReviewed ? "reviewed" : "published",
});

const buildDistractorRationales = (
  options: string[],
  correct: string,
  misconceptionType: MisconceptionType
): HomophoneQuestionV2Base["distractorRationales"] => {
  return options
    .filter(option => option !== correct)
    .map(option => ({
      option,
      reason: `“${option}”与“${correct}”同音，容易在读音相同的情况下误选。`,
      misconceptionType,
    }));
};

const mkBase = (
  unit: UnitDef,
  index: number,
  kind: QuestionKind,
  target: string,
  explanation: string
): Omit<HomophoneQuestionV2Base, "mode"> => {
  const misconceptionType = misconceptionByKind[kind];
  return {
    id: `hmv2-${unit.unitId}-${String(index + 1).padStart(2, "0")}`,
    version: "v2",
    grade: unit.grade,
    difficulty: DIFFICULTY[index],
    category: "同音词辨义",
    targetWord: target,
    targetPinyin: unit.pinyin,
    competency:
      kind === "constrained-output" ? "主动输出" : kind === "context-choice" || kind === "correction" ? "语境应用" : "字义辨析",
    explanation,
    tags: [unit.unitId, unit.grade, kind],
    quality: buildQuality(index < 4),
    learningObjective: `掌握“${target}”在同音组中的正确用法`,
    knowledgePointId: `hp-${unit.pinyin}-${unit.unitId}`,
    misconceptionType,
    contextQualityScore: kind === "context-choice" || kind === "correction" ? 85 : 40,
    distractorRationales: [],
    evidence: {
      sourceType: "textbook",
      sourceId: unit.grade,
      excerpt: explanation,
    },
    acceptance: {
      mode: "exact",
      answers: [target],
    },
  };
};

const buildUnitQuestions = (unit: UnitDef): HomophoneQuestionV2[] => {
  const options = [unit.words.w1, unit.words.w2, unit.words.w3, unit.words.w4];

  const q1Base = mkBase(
    unit,
    0,
    "core-meaning",
    unit.words.w1,
    `“${unit.words.w1}”表示“${unit.meanings.w1}”，需要和同音字区分。`
  );
  const q2Base = mkBase(
    unit,
    1,
    "core-meaning",
    unit.words.w2,
    `“${unit.words.w2}”表示“${unit.meanings.w2}”，不能只按读音判断。`
  );
  const q3Base = mkBase(
    unit,
    2,
    "context-choice",
    unit.words.w3,
    `句子语境表达“${unit.meanings.w3}”，所以应选“${unit.words.w3}”。`
  );
  const q4Base = mkBase(
    unit,
    3,
    "context-choice",
    unit.words.w4,
    `句中线索指向“${unit.meanings.w4}”，正确答案是“${unit.words.w4}”。`
  );
  const q5Base = mkBase(
    unit,
    4,
    "error-diagnosis",
    unit.words.w1,
    `原句误用了同音字，改为“${unit.words.w1}”后语义才准确。`
  );
  const q6Base = mkBase(
    unit,
    5,
    "correction",
    unit.words.w2,
    `改正时要依据上下文，不可按字形猜测，应选“${unit.words.w2}”。`
  );
  const q7Base = mkBase(
    unit,
    6,
    "constrained-output",
    unit.words.w3,
    `根据语境和读音提示，主动写出“${unit.words.w3}”。`
  );
  const q8Base = mkBase(
    unit,
    7,
    "constrained-output",
    unit.words.w4,
    `根据场景描述，符合语义的同音词是“${unit.words.w4}”。`
  );

  const questions: HomophoneQuestionV2[] = [
    {
      ...q1Base,
      mode: "choice",
      promptMeaning: `请选择表示“${unit.meanings.w1}”的词语。`,
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w1,
      distractorRationales: buildDistractorRationales(options, unit.words.w1, "近义误判"),
      acceptance: { mode: "exact", answers: [unit.words.w1] },
    },
    {
      ...q2Base,
      mode: "choice",
      promptMeaning: `请选择表示“${unit.meanings.w2}”的词语。`,
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w2,
      distractorRationales: buildDistractorRationales(options, unit.words.w2, "近义误判"),
      acceptance: { mode: "exact", answers: [unit.words.w2] },
    },
    {
      ...q3Base,
      mode: "context",
      stem: unit.context.w3,
      contextSentence: unit.context.w3.replace("___", unit.words.w3),
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w3,
      distractorRationales: buildDistractorRationales(options, unit.words.w3, "语境忽略"),
      acceptance: { mode: "exact", answers: [unit.words.w3] },
    },
    {
      ...q4Base,
      mode: "context",
      stem: unit.context.w4,
      contextSentence: unit.context.w4.replace("___", unit.words.w4),
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w4,
      distractorRationales: buildDistractorRationales(options, unit.words.w4, "语境忽略"),
      acceptance: { mode: "exact", answers: [unit.words.w4] },
    },
    {
      ...q5Base,
      mode: "choice",
      promptMeaning: `同学写成“${unit.context.w1.replace("___", unit.words.w2)}”，这句话应该改成哪个字？`,
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w1,
      distractorRationales: buildDistractorRationales(options, unit.words.w1, "字形联想"),
      acceptance: { mode: "exact", answers: [unit.words.w1] },
    },
    {
      ...q6Base,
      mode: "context",
      stem: `请改正句子中的同音字错误：${unit.context.w2.replace("___", unit.words.w1)}`,
      contextSentence: unit.context.w2.replace("___", unit.words.w2),
      options: options.map(text => ({ text, pinyin: unit.pinyin })),
      correct: unit.words.w2,
      distractorRationales: buildDistractorRationales(options, unit.words.w2, "搭配不当"),
      acceptance: { mode: "exact", answers: [unit.words.w2] },
    },
    {
      ...q7Base,
      mode: "input",
      prompt: `根据提示写词：读音“${unit.pinyin}”，表示“${unit.meanings.w3}”。`,
      acceptedAnswers: [unit.words.w3],
      normalizeRule: "trim-lower-fullwidth",
      distractorRationales: [],
      acceptance: {
        mode: "normalized",
        answers: [unit.words.w3],
        normalizeRule: "trim-lower-fullwidth",
      },
    },
    {
      ...q8Base,
      mode: "input",
      prompt: `根据提示写词：读音“${unit.pinyin}”，表示“${unit.meanings.w4}”。`,
      acceptedAnswers: [unit.words.w4],
      normalizeRule: "trim-lower-fullwidth",
      distractorRationales: [],
      acceptance: {
        mode: "normalized",
        answers: [unit.words.w4],
        normalizeRule: "trim-lower-fullwidth",
      },
    },
  ];

  return questions;
};

const inferIllustrationEmoji = (meaning: string, word: string): string => {
  if (/(声音|响声|唱|铃)/.test(meaning) || word === "声") return "🔊";
  if (/(上升|提高|升)/.test(meaning) || word === "升") return "⬆️";
  if (/(河|水|池塘)/.test(meaning) || word === "河") return "🌊";
  if (/(花|荷|叶)/.test(meaning) || word === "荷") return "🪷";
  if (/(食物|吃|饮)/.test(meaning) || word === "食") return "🍽️";
  if (/(数字|数量|单位)/.test(meaning)) return "🔢";
  if (/(书|读物|课本)/.test(meaning) || word === "书") return "📘";
  if (/(叔叔|长辈)/.test(meaning) || word === "叔") return "🙋";
  if (/(树木|木头|园|果)/.test(meaning)) return "🌳";
  if (/(月亮|圆形)/.test(meaning) || word === "圆") return "🌕";
  if (/(成员|队员)/.test(meaning) || word === "员") return "🧑‍🤝‍🧑";
  if (/(礼貌|礼节)/.test(meaning) || word === "礼") return "🙏";
  if (/(眼目)/.test(meaning) || word === "目") return "👀";
  if (/(幕布|演出)/.test(meaning) || word === "幕") return "🎭";
  if (/(放牧|牧养|牲畜)/.test(meaning) || word === "牧" || word === "牲") return "🐄";
  if (/(弓箭|弯曲)/.test(meaning) || word === "弓") return "🏹";
  if (/(艺术|才艺)/.test(meaning) || word === "艺") return "🎨";
  if (/(内心|心脏|心意)/.test(meaning) || word === "心" || word === "意") return "❤️";
  if (/(欣喜|快乐)/.test(meaning) || word === "欣") return "😊";
  if (/(薪水|工薪|货币)/.test(meaning) || word === "薪" || word === "元") return "💰";
  return "🧠";
};

const inferIllustrationLabel = (meaning: string): string => {
  const first = meaning.split("，")[0] || meaning;
  return `图例：${first}`;
};

const buildVisualLesson = (unit: UnitDef): HomophoneVisualLesson => {
  const items = UNIT_WORD_ORDER.map(key => {
    const word = unit.words[key];
    const meaning = unit.meanings[key];
    const example = unit.context[key].replace("___", word);
    return {
      word,
      pinyin: unit.pinyin,
      pinyinTone: toTonePinyin(unit.pinyin),
      meaning,
      example,
      illustrationLabel: inferIllustrationLabel(meaning),
      illustrationEmoji: inferIllustrationEmoji(meaning, word),
    };
  });

  return {
    knowledgePointId: `hp-${unit.pinyin}-${unit.unitId}`,
    grade: unit.grade,
    pinyin: unit.pinyin,
    pinyinTone: toTonePinyin(unit.pinyin),
    items,
  };
};

const makeSupplementalLesson = (params: {
  knowledgePointId: string;
  pinyin: string;
  grade: GradeBand;
  items: Array<{ word: string; meaning: string; example: string }>;
}): HomophoneVisualLesson => {
  return {
    knowledgePointId: params.knowledgePointId,
    pinyin: params.pinyin,
    grade: params.grade,
    items: params.items.map(item => ({
      word: item.word,
      pinyin: params.pinyin,
      pinyinTone: toTonePinyin(params.pinyin),
      meaning: item.meaning,
      example: item.example,
      illustrationLabel: inferIllustrationLabel(item.meaning),
      illustrationEmoji: inferIllustrationEmoji(item.meaning, item.word),
    })),
  };
};

const SUPPLEMENTAL_VISUAL_LESSONS: HomophoneVisualLesson[] = [
  makeSupplementalLesson({
    knowledgePointId: "hpv-ma-u13",
    pinyin: "ma",
    grade: "grade2-vol2",
    items: [
      { word: "妈", meaning: "妈妈", example: "我和___妈一起去买菜。" },
      { word: "麻", meaning: "麻绳，发麻", example: "手提太久了，胳膊有点___。" },
      { word: "马", meaning: "马匹", example: "草地上有一匹白___。" },
      { word: "码", meaning: "号码，编码", example: "请把图书借阅___写清楚。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-dao-u14",
    pinyin: "dao",
    grade: "grade2-vol2",
    items: [
      { word: "刀", meaning: "刀具", example: "削铅笔时要注意小___的安全。" },
      { word: "到", meaning: "到达", example: "我们八点准时___校。" },
      { word: "道", meaning: "道路，道理", example: "这___题需要认真思考。" },
      { word: "稻", meaning: "稻谷", example: "秋天田里的___子成熟了。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-qing-u15",
    pinyin: "qing",
    grade: "grade2-vol2",
    items: [
      { word: "青", meaning: "青色，年轻", example: "远处的山是___绿色的。" },
      { word: "清", meaning: "清楚，清洁", example: "请把黑板擦___楚。" },
      { word: "情", meaning: "感情，情况", example: "同学之间要互相关___。" },
      { word: "请", meaning: "请求，邀请", example: "有问题请举手发言，不要着急___教室外。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-zhu-u16",
    pinyin: "zhu",
    grade: "grade2-vol2",
    items: [
      { word: "朱", meaning: "姓氏，朱红", example: "___老师今天给我们讲故事。" },
      { word: "珠", meaning: "珠子，珍珠", example: "这串手链有很多小___子。" },
      { word: "猪", meaning: "猪", example: "农场里养着几头小___。" },
      { word: "株", meaning: "一株植物", example: "花坛里有一___向日葵。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-jin-u17",
    pinyin: "jin",
    grade: "grade2-vol2",
    items: [
      { word: "金", meaning: "金属，金色", example: "夕阳把云朵染成___色。" },
      { word: "今", meaning: "今天，现在", example: "___天的天气很好。" },
      { word: "巾", meaning: "毛巾，头巾", example: "运动后要用毛___擦汗。" },
      { word: "筋", meaning: "筋骨，筋条", example: "做操前要先活动___骨。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-yu-u18",
    pinyin: "yu",
    grade: "grade2-vol2",
    items: [
      { word: "雨", meaning: "下雨，雨水", example: "今天下午可能会下___。" },
      { word: "语", meaning: "语言，语文", example: "___文课上我们学习了新课文。" },
      { word: "羽", meaning: "羽毛", example: "小鸟的___毛很轻。" },
      { word: "宇", meaning: "屋檐，宇宙", example: "我们一起探索___宙的奥秘。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-yang-u19",
    pinyin: "yang",
    grade: "grade2-vol2",
    items: [
      { word: "羊", meaning: "羊", example: "山坡上有几只小___在吃草。" },
      { word: "阳", meaning: "太阳，阳光", example: "冬天里要多晒___光。" },
      { word: "杨", meaning: "杨树，姓杨", example: "校门口有一排___树。" },
      { word: "洋", meaning: "海洋", example: "地球上有广阔的海___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-liang-u20",
    pinyin: "liang",
    grade: "grade2-vol2",
    items: [
      { word: "粮", meaning: "粮食", example: "我们要珍惜每一粒___食。" },
      { word: "梁", meaning: "桥梁，房梁", example: "这座桥___很结实。" },
      { word: "凉", meaning: "凉快", example: "树荫下很___快。" },
      { word: "良", meaning: "良好，优良", example: "他养成了___好的学习习惯。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-tong-u21",
    pinyin: "tong",
    grade: "grade2-vol2",
    items: [
      { word: "同", meaning: "相同，一同", example: "我们有___样的目标。" },
      { word: "童", meaning: "儿童", example: "___年是最快乐的时光。" },
      { word: "铜", meaning: "铜金属", example: "古时候有很多青___器。" },
      { word: "桐", meaning: "桐树", example: "院子里种着一棵梧___树。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpv-lan-u22",
    pinyin: "lan",
    grade: "grade2-vol2",
    items: [
      { word: "蓝", meaning: "蓝色", example: "天空是___色的。" },
      { word: "兰", meaning: "兰花", example: "窗台上开着一盆___花。" },
      { word: "篮", meaning: "篮子", example: "妈妈提着菜___去市场。" },
      { word: "栏", meaning: "栏杆，栏目", example: "请不要翻越护___。" },
    ],
  }),
];

const SUPPLEMENTAL_WORD_VISUAL_LESSONS: HomophoneVisualLesson[] = [
  makeSupplementalLesson({
    knowledgePointId: "hpw-gong-w01",
    pinyin: "gong shi",
    grade: "grade2-vol2",
    items: [
      { word: "公事", meaning: "公务，公家的事情", example: "爸爸今天去外地办___。" },
      { word: "工事", meaning: "军事或工程设施", example: "古代城墙也属于一种防御___。" },
      { word: "公式", meaning: "数学或物理中的式子", example: "这道题要先记住计算___。" },
      { word: "攻势", meaning: "进攻的态势", example: "比赛下半场，球队加强了进___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-yi-w02",
    pinyin: "yi shi",
    grade: "grade2-vol2",
    items: [
      { word: "义士", meaning: "有正义感、有气节的人", example: "故事里的___宁死不屈。" },
      { word: "议事", meaning: "商量事情", example: "班干部在教室里集中___。" },
      { word: "逸事", meaning: "有趣的小故事", example: "老师讲了一段名人的___。" },
      { word: "异事", meaning: "不寻常的事情", example: "古书里记载了不少___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-gong-w03",
    pinyin: "gong ke",
    grade: "grade2-vol2",
    items: [
      { word: "功课", meaning: "学习任务，作业", example: "放学后要先完成___。" },
      { word: "攻克", meaning: "努力解决并完成", example: "我们一起___这道难题。" },
      { word: "工科", meaning: "工程技术相关学科", example: "哥哥以后想学___。" },
      { word: "公克", meaning: "质量单位“克”的旧译名", example: "这包茶叶净含量是五十___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-shou-w04",
    pinyin: "shou shi",
    grade: "grade2-vol2",
    items: [
      { word: "手势", meaning: "用手做出的动作信号", example: "老师用___提醒大家安静。" },
      { word: "首饰", meaning: "装饰佩戴的物品", example: "节日里妈妈戴上了漂亮___。" },
      { word: "守势", meaning: "防守的态势", example: "比赛后半段球队采取了___。" },
      { word: "手式", meaning: "武术或舞蹈中的手部姿势", example: "老师先示范了一个基本___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-gong-w05",
    pinyin: "shi shi",
    grade: "grade2-vol2",
    items: [
      { word: "事实", meaning: "真实存在的情况", example: "我们要尊重___，不随意猜测。" },
      { word: "适时", meaning: "在合适的时候", example: "学习一段时间后要___休息。" },
      { word: "试食", meaning: "先尝一尝食物", example: "新菜品上桌前，厨师会先___。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-shi-w06",
    pinyin: "jing li",
    grade: "grade2-vol2",
    items: [
      { word: "经历", meaning: "亲身遇到或做过的事", example: "这次活动是难忘的___。" },
      { word: "精力", meaning: "精神和体力", example: "早睡早起能让我们更有___。" },
      { word: "晶粒", meaning: "晶体中很小的颗粒", example: "老师用模型讲解了盐的___结构。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-jing-w07",
    pinyin: "gong ji",
    grade: "grade2-vol2",
    items: [
      { word: "公鸡", meaning: "雄性的鸡", example: "清晨___会打鸣。" },
      { word: "攻击", meaning: "进攻，打击", example: "体育比赛中不可以恶意___对手。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-qi-w09",
    pinyin: "qi shi",
    grade: "grade2-vol2",
    items: [
      { word: "骑士", meaning: "骑马作战的人", example: "童话里有勇敢的___。" },
      { word: "歧视", meaning: "不平等看待他人", example: "我们不可以___别人。" },
      { word: "奇事", meaning: "奇特、不寻常的事情", example: "这本书里记载了很多民间___。" },
      { word: "棋士", meaning: "以棋类比赛为职业的人", example: "这位年轻___在比赛中表现出色。" },
    ],
  }),
  makeSupplementalLesson({
    knowledgePointId: "hpw-shi-w11",
    pinyin: "shi yi",
    grade: "grade2-vol2",
    items: [
      { word: "示意", meaning: "用动作或眼神表示意思", example: "老师点头___可以开始了。" },
      { word: "适意", meaning: "感到舒适、满意", example: "在公园散步让人十分___。" },
      { word: "释义", meaning: "解释词语含义", example: "查字典可以看到词语___。" },
    ],
  }),
];

export const HOMOPHONE_MEANING_V2_UNIT_COUNT = UNIT_DEFS.length;
export const HOMOPHONE_MEANING_V2_QUESTIONS_PER_UNIT = 8;

export const HOMOPHONE_MEANING_QUESTIONS_V2_REDESIGNED: HomophoneQuestionV2[] = UNIT_DEFS.flatMap(buildUnitQuestions);

export const HOMOPHONE_VISUAL_LESSONS: HomophoneVisualLesson[] = [
  ...UNIT_DEFS.map(buildVisualLesson),
  ...SUPPLEMENTAL_VISUAL_LESSONS,
];

export const HOMOPHONE_WORD_VISUAL_LESSONS: HomophoneVisualLesson[] = SUPPLEMENTAL_WORD_VISUAL_LESSONS;

export const HOMOPHONE_VISUAL_LESSON_BY_KNOWLEDGE_POINT: Record<string, HomophoneVisualLesson> =
  HOMOPHONE_VISUAL_LESSONS.reduce<Record<string, HomophoneVisualLesson>>((acc, lesson) => {
    acc[lesson.knowledgePointId] = lesson;
    return acc;
  }, {});
