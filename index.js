// 地图元素
var mapEle = document.querySelector('#map');
var headNode = null; // 蛇头
var timerId = null; // 定时器
var foodNode = null // 食物

// 创建小方块；color: red(蛇头), yellow(身体), blue(食物)
function createDiv(color) {
  var ele = document.createElement('div');
  ele.style.background = color;
  ele.style.position = 'absolute';
  ele.style.left = parseInt(Math.random() * 10) * 50 + 'px';
  ele.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  mapEle.appendChild(ele);
  return ele;
};

function move() {
  // 单例模式
  headNode == null ? headNode = createDiv('red') : headNode;
  // 蛇头移动的方向
  switch (direction) {
    case '上':
      headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
      break;
    case '右':
      headNode.style.left = parseInt(headNode.style.left) + 50 + 'px';
      break;
    case '下':
      headNode.style.top = parseInt(headNode.style.top) + 50 + 'px';
      break;
    case '左':
      headNode.style.left = parseInt(headNode.style.left) - 50 + 'px';
      break;
  }

  // 判断是否超出边界
  boundary();
  // 判断蛇头是否与食物重叠
  iScoincide();
};

// 控制方向
document.onkeydown = function (e) {
  // e.keyCode, 37: 左, 38: 上, 39: 右, 40: 下
  switch (e.keyCode) {
    case 38:
      direction = '上';
      headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
      break;
    case 39:
      direction = '右';
      headNode.style.left = parseInt(headNode.style.left) + 50 + 'px';
      break;
    case 40:
      direction = '下';
      headNode.style.top = parseInt(headNode.style.top) + 50 + 'px';
      break;
    case 37:
      direction = '左';
      headNode.style.left = parseInt(headNode.style.left) - 50 + 'px';
      break;
  }
}

// 判断是否超出边界
function boundary() {
  // console.log(parseInt(headNode.style.left), 111);
  // console.log(parseInt(headNode.style.top), 222);

  switch (parseInt(headNode.style.left)) {
    case 0:
      console.log('超出左边界');
      clearInterval(timerId);
      break;
    case 450:
      console.log('超出右边界');
      clearInterval(timerId);
      break;
  }
  switch (parseInt(headNode.style.top)) {
    case 0:
      console.log('超出顶边界');
      clearInterval(timerId);
      break;
    case 450:
      console.log('超出底边界');
      clearInterval(timerId);
      break;
  }
}

// 判断蛇头是否与食物重叠
function iScoincide() {
  if (headNode.style.left == foodNode.style.left && headNode.style.top == foodNode.style.top) {
    // 蛇头与食物重叠
    foodNode == null ? foodNode = createDiv('red') : foodNode;
  }
}

var direction = '右'; // 方向
headNode = createDiv('red');
foodNode = createDiv('blue');
timerId = setInterval(move, 1000);
