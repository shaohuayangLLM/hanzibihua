/**
 * 偏旁数据 - 一年级上册
 * 用于偏旁部首学习功能
 */

export interface RadicalInfo {
  /** 偏旁字符 */
  radical: string;
  /** 偏旁名称 */
  name: string;
  /** 与什么相关 */
  relation: string;
  /** 例字（用顿号分隔） */
  examples: string;
}

export interface RadicalWithParsedExamples extends RadicalInfo {
  /** 解析后的例字数组 */
  exampleList: string[];
}

/**
 * 解析偏旁例字
 */
export const parseRadicalExamples = (radical: RadicalInfo): RadicalWithParsedExamples => {
  return {
    ...radical,
    exampleList: radical.examples.split('、').filter(e => e.trim()),
  };
};

/**
 * 偏旁数据库
 */
export const radicalDatabase: RadicalInfo[] = [
  { radical: '亻', name: '单人旁', relation: '与人、人的身份/行为相关', examples: '你、他、们、住、做、体' },
  { radical: '八', name: '八字头', relation: '多与形态、方位相关', examples: '分、半、公、谷、单' },
  { radical: '人', name: '人字头', relation: '与人的动作、形态相关', examples: '众、全、合、会、今' },
  { radical: '⺈', name: '斜刀头', relation: '多与刀具、切割/尖锐形态相关', examples: '色、争、兔、负、急' },
  { radical: '勹', name: '包字头', relation: '多与包裹、卷曲的形态相关', examples: '包、句、匀、匆、勾' },
  { radical: '丷', name: '倒八', relation: '多与形态、分合相关', examples: '半、平、米、并、券' },
  { radical: '讠', name: '言字旁', relation: '与语言、说话、表达相关', examples: '说、语、话、读、讲、课' },
  { radical: '阝', name: '双耳旁', relation: '与地方、方位、建筑相关', examples: '队、阳、那、都、院、际' },
  { radical: '土', name: '提土旁', relation: '与土地、泥土、建筑相关', examples: '地、块、场、城、坡、坝' },
  { radical: '扌', name: '提手旁', relation: '与手的动作相关', examples: '打、拍、提、拉、推、抱' },
  { radical: '艹', name: '草字头', relation: '与植物、草本相关', examples: '草、花、苗、茶、节、药' },
  { radical: '口', name: '口字旁', relation: '与嘴巴、口部动作/语言相关', examples: '吃、喝、叫、听、唱、问' },
  { radical: '囗', name: '国字框', relation: '与包围、疆域、整体范围相关', examples: '国、因、围、园、圆、图' },
  { radical: '彡', name: '三撇', relation: '与纹理、色彩、形态修饰相关', examples: '彩、形、影、彬、彭、须' },
  { radical: '犭', name: '反犬旁', relation: '与兽类、动物相关', examples: '狗、猫、狼、猪、猴、狮' },
  { radical: '夂', name: '折文', relation: '多与动作、时间相关', examples: '夏、条、务、备、处、冬' },
  { radical: '门', name: '门字框', relation: '与门、封闭空间、进出相关', examples: '问、间、闲、闷、闪、闹' },
  { radical: '氵', name: '三点水', relation: '与水、液体、水流相关', examples: '江、河、海、洗、泳、渴' },
  { radical: '宀', name: '宝盖头', relation: '与房屋、居住场所相关', examples: '家、安、宁、实、宝、完' },
  { radical: '辶', name: '走之底', relation: '与行走、移动、路程相关', examples: '远、近、进、退、过、边' },
  { radical: '女', name: '女字旁', relation: '与女性、亲属相关', examples: '妈、姐、妹、奶、姑、妇' },
  { radical: '纟', name: '绞丝旁', relation: '与丝线、纺织、织物相关', examples: '红、级、纸、细、纱、线' },
  { radical: '木', name: '木字旁', relation: '与树木、木材、木制品相关', examples: '树、林、森、村、桥、桌' },
  { radical: '日', name: '日字旁', relation: '与太阳、时间、光明相关', examples: '明、暗、早、晚、星、春' },
  { radical: '月', name: '月字旁', relation: '与月亮、时间、身体部位相关', examples: '胖、脸、腿、朋、服、有' },
  { radical: '灬', name: '四点底', relation: '多与火、热、烹饪相关（也作形态修饰）', examples: '点、热、照、黑、燕、熟' },
  { radical: '禾', name: '禾字旁', relation: '与谷物、农作物、农业相关', examples: '秋、香、种、秀、季、科' },
  { radical: '穴', name: '穴字头', relation: '与洞穴、孔洞、空间相关', examples: '空、穷、窗、究、窑、穾' },
  { radical: '竹', name: '竹字头', relation: '与竹子、竹制品相关', examples: '笔、笑、答、等、筷、笛' },
];

/**
 * 根据偏旁字符获取偏旁信息
 */
export const getRadicalInfo = (radical: string): RadicalWithParsedExamples | null => {
  const found = radicalDatabase.find(r => r.radical === radical);
  if (!found) return null;
  return parseRadicalExamples(found);
};

/**
 * 获取所有偏旁列表
 */
export const getAllRadicals = (): RadicalInfo[] => {
  return radicalDatabase;
};
