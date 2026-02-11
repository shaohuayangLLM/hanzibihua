#!/usr/bin/env python3
import re, os

# All characters from curriculum (grades 1-6)
curriculum_text = """一二三上口目耳手日田禾火虫云山八十了子人大月儿头里可东西天四是女开水去来不小少牛果鸟早书刀尺本木林土力心中五立正在后我长比巴把下个雨们问有半从你才明同学自己衣白的又和竹牙马用几只石多出见对妈全回工厂春风冬雪花飞入姓什么双国王方青清气晴情请生字左右红时动万吃叫主江住没以会走北京门广过各种样伙伴这太阳校金秋因为他河说也地听哥单居招呼快乐玩很当音讲行许思床前光低故乡色外看爸晚笑再午节叶米真分豆那着到高兴千成间迷造运池欢网古凉细夕李语香打拍跑足声身体之相近习远玉义首采无树爱尖角亮机台放鱼朵美直呀边呢吗吧加两哪宽顶睛肚皮孩跳变极片傍海洋作坏给带法如脚它娃她毛更知识予队旗铜号领巾杨壮桐枫松柏棉杉化桂歌丛深处六熊猫九朋友季吹肥农忙归戴辛苦年称做柱底杆秤站船然道评奖候报另及拿并令布哄闻依尽黄层照炉烟挂川楼巨汪乘谢意升井面答渴喝话阵枯纷朗却将夜棵盯治怪慢赛悲痛想邻产份志句幸洪灾难认被扁担伍师军战士忘泼度龙炮穿向始危敢惊阴似野苍茫岸屋切久散步唱赶旺旁浑谁轻汽弟诗村童碧妆绿丝剪冲寻姑娘吐柳荡桃杏鲜邮递员原叔局堆礼邓植格引注满休息州湾岛峡族谊齐奋贴街舟艾鸭团贝壳甲骨钱币与财烧茄烤肉鸡蛋炒饭彩梦森拉结苹般精灵伞姨便教游戏母周围补充屁股尿净屎使劲亡牢钻劝丢告筋疲图课摆座交哈页抢嘻愿麦该伯刻突掉湖莲穷荷绝含岭吴雷黑压垂户新迎扑指针帮助导永碰特积宇宙杯失板客易浴室扇遇兔安根最织终完换期蛙卖搬倒籽泉破应整晨绒球汉艳服装扮读静停粗影落荒笛舞狂罚假互所够猜扬臂寒径斜霜赠刘残君橙送挑铺泥晶紧院印排列规则乱棕迟盒颜料票飘争仙梨勾曲丰柴油怜救命拼扫胃管刚流泪算司庭登跌众弃持击掌郊诚惜冻晃梯肯显激侧胶卷辆秘杂社滨灰渔遍躺载靠亚夏除踩洁脑袋严实挡视线坛材软刮库优浅错岩虾挺鼓数厚宝贵奏敲汇喳斑湿朗雾蒙鼻总抖露吸猎翅膀重篇鸳鸯惠崇芦芽短梅溪泛减凑拂集聚形掠偶尔沾倦闲痕瓣蓬胀裂姿势仿佛随守株待宋耕触颈释其骄傲谦虚懦弱尘捧代价鹿塘映欣赏匀致配传哎狮叹别存智慧赵匠设计史创举且借录册欧洲验证概阻测括误途超蜜蜂检查确陌组建寿苏醒示昆修芬芳内强适诱润芒冰剑普宁官险参攻推迅速退铁必胡灿骑秒凶猛接庙威武镇潮据堤阔盼滚顿逐渐堵犹崩震霎余牵卵填庄稼俗跃葡萄稻熟柔操占嫩舒瞧叠隙萎固宅临选择址良穴厅卧专寸卫钳较暮吟题峰庐缘降费须逊输均柄宿徐篱疏锄赖剥构饰蹲凤序例率觅耸踏倘绘谐寄藉卜锐滩帐烁蝙蝠霸鹰茅檐翁宜鹤嫌朱嵌框匣哨恩韵吩咐榨榴矮慕亩浇昼耘桑晓蝴蝶蚂蚱樱拔瞎铲割承栓瓢逛瑞毯陈裳虹蹄腐稍微幽笨拙愁腊粥腻宫侯关"""

chars = list(dict.fromkeys(c for c in curriculum_text if '\u4e00' <= c <= '\u9fff'))
print(f"Total unique curriculum: {len(chars)}")

# Read existing
existing = set()
data_dir = "src/data"
files = ['baseCharacters.ts', 'grade1Vol1Characters.ts', 'grade1Vol2Characters.ts', 
         'grade2Vol1Characters.ts', 'grade2Vol2Characters.ts', 'radicalCharacters.ts', 'commonCharacters.ts']
for f in files:
    path = os.path.join(data_dir, f)
    with open(path, encoding='utf-8') as fh:
        content = fh.read()
    for m in re.finditer(r'([\u4e00-\u9fff])["\']:\s*\{', content):
        existing.add(m.group(1))
print(f"Existing: {len(existing)}")

missing = [c for c in chars if c not in existing]
print(f"Missing: {len(missing)}")
print("Missing chars: " + "".join(missing))
