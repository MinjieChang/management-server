export const getStyle = (obj, attr) => {
  if (obj.crrentStyle) {
    return obj.currentStyle[attr];
    // 兼容IE8以下
  }
  return getComputedStyle(obj, false)[attr];
  // 参数false已废。照用就好
};

export const startMove = (obj, json, fn) => {
  // 清理定时器
  if (obj.timer) {
    clearInterval(obj.timer);
  }
  obj.timer = setInterval(() => {
    let bStop = false; // 如果为false就停了定时器！
    let iCur = 0;
    // 处理属性值
    for (var attr in json) {
      if (attr == "opacity") {
        iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        iCur = parseInt(getStyle(obj, attr));
      }
      // 定义速度值
      let iSpeed = (json[attr] - iCur) / 8;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      // 检测停止：如果我发现某个值不等于目标点bStop就不能为true。
      if (iCur !== json[attr]) {
        bStop = false;
      }
      if (attr == "opacity") {
        obj.style[attr] = (iCur + iSpeed) / 100;
        obj.style.filter = `alpha(opacity:${iCur + iSpeed})`;
      } else {
        obj.style[attr] = `${iCur + iSpeed}px`;
      }
    }
    // 检测是否停止，是的话关掉定时器
    if (bStop === true) {
      if (iCur == json[attr]) {
        clearInterval(obj.timer);
        if (fn) {
          fn();
        }
      }
    }
  }, 30);
};
