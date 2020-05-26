var map = document.getElementById('map');
var bodyNodes = []; // 放置所有身体
var Nodes = []; // 放置整个蛇
// 统计分数
var scoreEle = document.querySelector('#score');
function createDiv(color) {
  var div = document.createElement('div');
  div.style.left = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.background = color;
  // 添加到地图中
  map.appendChild(div);
  return div;
}
var headNode = createDiv('red');
Nodes.push(headNode);
headNode.value = '右';
var foodNode = createDiv('blue');
function move() {
  if (bodyNodes.length > 0) {
    for (var i = bodyNodes.length - 1; i >= 0; i--) {
      switch (bodyNodes[i].value) {
        case '左':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) - 50 + 'px';
          break;
        case '右':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) + 50 + 'px';
          break;
      }
      if (i == 0) {
        bodyNodes[i].value = headNode.value;
      } else {
        bodyNodes[i].value = bodyNodes[i - 1].value;
      }
    }
  }
  // 判断当前蛇头的移动方向 .value属性
  switch (headNode.value) {
    case '左':
      headNode.style.left = parseInt(headNode.style.left) - 50 + 'px';
      break;
    case '右':
      headNode.style.left = parseInt(headNode.style.left) + 50 + 'px';
      break;
    case '上':
      headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
      break;
    case '下':
      headNode.style.top = parseInt(headNode.style.top) + 50 + 'px';
      break;
  }
  // 判断是否出边界
  if (parseInt(headNode.style.left) < 0 || parseInt(headNode.style.left) > 450
    || parseInt(headNode.style.top) < 0 || parseInt(headNode.style.top) > 450) {
    clearInterval(t);
    alert('撞墙了')
  }
  // 判断是否咬到身体
  if (bodyNodes.length > 0) {
    for (var i = 0; i < bodyNodes.length; i++) {
      if (headNode.style.left === bodyNodes[i].style.left && headNode.style.top === bodyNodes[i].style.top) {
        clearInterval(t);
        alert('咬到身体了')
      }
    }
  }
  // 碰撞检测
  if (headNode.style.left === foodNode.style.left && headNode.style.top === foodNode.style.top) {
    var bodyNode = createDiv('yellow');
    var lastNode = null;
    if (bodyNodes.length > 0) {
      lastNode = bodyNodes[bodyNodes.length - 1];
    } else {
      lastNode = headNode;
    }
  }
  switch (lastNode.value) {
    case '左':
      bodyNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
      bodyNode.style.top = lastNode.style.top;
      break
    case '右':
      bodyNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
      bodyNode.style.top = lastNode.style.top;
      break
    case '上':
      bodyNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
      bodyNode.style.left = lastNode.style.left;
      break
    case '下':
      bodyNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
      bodyNode.style.left = lastNode.style.left;
      break
  }
}