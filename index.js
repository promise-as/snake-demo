// 地图
var map = document.querySelector('#map');
var headNode = createDiv('red');
headNode.value = '右'; // 方向
var foodNode = createDiv('blue');
var bodyNodes = [];
var time = 500;
var t = setInterval(move, time); 
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

  // 蛇身移动
  if(bodyNodes.length > 0){
    for(var i = bodyNodes.length - 1; i >= 0; i--){
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
      // 改变bodyNodes[i]的value
      if(i == 0){
        bodyNodes[i].value = headNode.value;
      }else{
        bodyNodes[i].value = bodyNodes[i - 1].value
      }
    }
  }
  
  // 吃食物
  if(headNode.style.left == foodNode.style.left && headNode.style.top == foodNode.style.top){
    var bodyNode = createDiv('yellow');
    var lastNode = null;
    if(bodyNodes.length > 0){
      lastNode = bodyNodes[bodyNodes.length - 1];
    }else{
      lastNode = headNode;
    }
    // 蛇身出现的位置；如果lastNode向左，bodyNode出现在其右侧
    switch (lastNode.value) {
      case '左':
        bodyNode.style.left = parseInt(lastNode.style.left) + 50 + 'px';
        bodyNode.style.top = lastNode.style.top;
        break;
      case '右':
        bodyNode.style.left = parseInt(lastNode.style.left) - 50 + 'px';
        bodyNode.style.top = lastNode.style.top;
        break;
      case '上':
        bodyNode.style.top = parseInt(lastNode.style.top) + 50 + 'px';
        bodyNode.style.left = lastNode.style.left;
        break;
      case '下':
        bodyNode.style.top = parseInt(lastNode.style.top) - 50 + 'px';
        bodyNode.style.left = lastNode.style.left;
        break;
    }
    // 改变bodyNode的value
    bodyNode.value = lastNode.value;
    bodyNodes.push(bodyNode);
    // 改变食物的位置
    var x = parseInt(Math.random() * 10) * 50;
    var y = parseInt(Math.random() * 10) * 50;
    // 食物与蛇身是否重合
    for(var i = 0; i < bodyNodes.length; i++){
      if(foodNode.style.left == bodyNodes[i].style.left && foodNode.style.top == bodyNodes[i].style.top){
        x = parseInt(Math.random() * 10) * 50;
        y = parseInt(Math.random() * 10) * 50;
        // 比如蛇身有两个黄色小块，食物与第一个重合了，就重新检测
        i = -1;
      }
    }
    foodNode.style.left = x + 'px';
    foodNode.style.top = y + 'px';
  }

  // 是否超出边界
  if(parseInt(headNode.style.left) < 0 || parseInt(headNode.style.left) > 450 || parseInt(headNode.style.top) < 0 || parseInt(headNode.style.top) > 450){
    clearInterval(t);
    alert('撞墙了')
  }

  // 是否咬到身体
  if(bodyNodes.length > 0){
    for(var i = 0; i < bodyNodes.length; i++){
      if(headNode.style.left == bodyNodes[i].style.left && headNode.style.top == bodyNodes[i].style.top){
        clearInterval(t);
        alert('咬到身体了');
      }
    }
  }

  // 计分
  document.querySelector('#score').innerHTML = bodyNodes.length * 10;
}
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      if(headNode.value != '右' || bodyNodes.length == 0){
        headNode.value = '左';
      }
      break;
    case 38:
      if(headNode.value != '下' || bodyNodes.length == 0){
        headNode.value = '上';
      }
      break;
    case 39:
      if(headNode.value != '左' || bodyNodes.length == 0){
        headNode.value = '右';
      }
      break;
    case 40:
      if(headNode.value != '上' || bodyNodes.length == 0){
        headNode.value = '下';
      }
      break;
  }
}
function clickHandle(btn, time){
  document.querySelector(btn).onclick = function(){
    clearInterval(t);
    setInterval(move, time);
  }
}
clickHandle('#fast', 300);
clickHandle('#middle', 500);
clickHandle('#slow', 1000);