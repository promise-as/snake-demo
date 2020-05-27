// 地图
var map = document.querySelector('#map');
var head = createDiv('red');
head.value = '下'; // 方向
var food = createDiv('blue');
var bodyNodes = [];
var t = setInterval(move, 500);
function createDiv(color) {
  var div = document.createElement('div');
  div.style.background = color;
  div.style.left = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  map.appendChild(div);
  return div;
}
function move() {
  // 蛇头移动
  switch (head.value) {
    case '左':
      head.style.left = parseInt(head.style.left) - 50 + 'px';
      break;
    case '右':
      head.style.left = parseInt(head.style.left) + 50 + 'px';
      break;
    case '上':
      head.style.top = parseInt(head.style.top) - 50 + 'px';
      break;
    case '下':
      head.style.top = parseInt(head.style.top) + 50 + 'px';
      break;
  }
  // 撞墙了
  if (parseInt(head.style.left) < 0 || parseInt(head.style.left) > 450 || parseInt(head.style.top) < 0 || parseInt(head.style.top) > 450) {
    clearInterval(t);
    console.log('撞墙了');
  }
  
  // 蛇身移动
  if (bodyNodes.length > 0) {
    // 倒序
    for (var i = bodyNodes.length - 1; i >= 0; i--) {
      // 蛇身正确位置排列
      switch (bodyNodes[i].value) {
        case '左':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) - 50 + 'px';
          break;
        case '右':
          bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) + 50 + 'px';
          break;
        case '上':
          bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) - 50 + 'px';
          break;
        case '下':
          bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) + 50 + 'px';
          break;
      }
      // 只有一个身体
      if(i == 0){
        bodyNodes[i].value = head.value;
      }else{
        bodyNodes[i].value = bodyNodes[i - 1].value;
      }
    }
  }
  // 吃食物
  if (head.style.left == food.style.left && head.style.top == food.style.top) {
    var aNode = createDiv('yellow');
    var lastNode = null;
    if (bodyNodes.length > 0) {
      lastNode = bodyNodes[bodyNodes.length - 1];
    } else {
      lastNode = head
    }
    aNode.value = lastNode.value;
    bodyNodes.push(aNode);
    // 蛇身显示一行或一竖
    switch (lastNode.value) {
      case '左':
        aNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
        aNode.style.top = lastNode.style.top;
        break;
      case '右':
        aNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
        aNode.style.top = lastNode.style.top;
        break;
      case '上':
        aNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
        aNode.style.left = lastNode.style.left;
        break;
      case '下':
        aNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
        aNode.style.left = lastNode.style.left;
        break;
    }
  }
  
}
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      head.value = '左';
      break;
    case 38:
      head.value = '上';
      break;
    case 39:
      head.value = '右';
      break;
    case 40:
      head.value = '下';
      break;
  }
}
