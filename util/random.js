/* eslint-disable import/prefer-default-export */
const fs = require('fs');

const names = [
  '乔治·伍德',
  '阿尔玛理查兹',
  '樱桃爱德华',
  '霍布斯',
  '索菲亚西蒙斯',
  '维尼弗雷德格雷',
  '乔利奥波德',
  '金伯利贝洛克',
  '赖特伯克利',
  '凯莉利顿',
  '西奥巴德贝尔',
  '邦妮布鲁斯特',
  '宾厄齐基尔',
  '凯尔特里维廉',
  '伊芙瑞德',
  '布鲁诺亚瑟',
  '马特汤姆',
  '埃尔莎特雷西',
  '克文埃丝特',
  '乔伊斯莎士比亚',
  '尼尔森玫瑰',
  '阿列克西亚泰特',
  '奥尔加哈维',
  '玛格丽特贝莎',
  '费雯卡蕾',
  '布丽姬密尔顿',
  '瑞吉儿·史考特',
  '桑迪艾迪',
  '克劳德比尔',
  '阿萨罗宾',
  '加文埃德蒙',
  '比阿特丽丝',
  '沃利斯菲尔丁',
  '亚当本瑟姆',
  '奥利弗琼斯',
  '沃克笛福',
  '斯坦利富兰克林',
  '安娜贝儿艾奇逊',
  '蒂凡尼贾德森',
  '奥古斯丁乔纳森',
  '莉莲贝拉米',
  '马歇尔哈金斯',
  '埃尔茜桑代克',
  '佩内洛普比利',
  '彭妮伊莎贝尔',
  '伊尼德',
  '罗伊蒙哥马利',
  '蒂娜哈姆雷特',
  '路易斯范妮',
  '维塔卡尔',
  '博格芬',
  '伊莲查尔斯',
  '卡马科菲',
  '西格利德',
  '莎拉福德',
  '米歇尔庇古',
  '休米哈里曼',
  '莎伦玛丽亚',
  '狄斯埃尔茜',
  '艾曼纽马洛里',
  '奥利弗',
  '雷休斯',
  '保拉',
  '霍华尔布鲁默',
  '奥维尔玛丽',
  '拉拉普沃拉斯顿',
  '苏西吉尔伯特',
  '伊达',
  '马克斯帕尔默',
  '巴雷特',
  '帕梅拉安得烈',
  '帕特里克',
  '汉娜麦克米兰',
  '马奇',
  '布兰特',
  '奥布里辛克莱',
  '杰拉尔丁诺亚',
  '威廉埃利斯',
  '诺维亚斯蒂芬斯',
  '珍妮佛埃利诺',
  '巴顿肖',
  '利维海明威',
  '玛姬',
  '路易丝莫尔',
  '佩恩',
  '克里斯托弗',
  '艾琳',
  '曼德尔詹宁斯',
  '琳达舍伍德',
  '查普曼丹',
  '布兰奇斯坦贝克',
  '杰西',
  '齐默尔曼',
  '芬妮奎勒',
  '伊玛乔丹',
  '布拉德利贝丝',
  '阿道夫罗宾斯',
  '戈登麦克阿瑟',
  '埃文欧文',
  '埃利',
  '米里亚姆巴里',
  '奥德丽贝琪',
  '托尼克罗宁',
  '沃尔特刘易斯',
  '德文多萝西',
];

exports.getRandomName = function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
};

exports.getRandomAvatar = function getRandomAvatar() {
  const path = `${process.cwd()}/public/avatar`;
  const files = fs.readdirSync(path).slice(1);
  return files[Math.floor(Math.random() * files.length)];
};
