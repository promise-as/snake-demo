// 在刷新页面时不仅要产生地图，还要产生两个小div
// feng别对应贪吃蛇的 蛇头 以及身体
// 由于蛇头(红色) 食物(蓝色) 以及多个身体(黄色) 都是动态创建的div
// 封装一个方法 用于创建div元素 放入地图里
// 参数可以拓展函数 功能
var map = document.getElementById('map');
var bodyNodes = []; // 放置所有身体的
var Nodes = []; // 放置整个蛇
function createDiv(color) {
  // 创建一个div节点
  var div = document.createElement('div');
  // 位置是随机产生的 js随机数
  // Math.random()
  // 0-450之间 50的倍数 0-9倍
  // Math.random() 产生一个0-1的随机数(小数) 不包含1 [0, 1)
  // 产生一个0-9的随机数 parseInt(Math.random() * 10)
  div.style.left = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.top = parseInt(Math.random() * 10) * 50 + 'px';
  div.style.background = color;
  // 添加到地图中
  map.appendChild(div);
  // return 就是函数执行后的返回结果 等于函数所创建出来的div
  return div;
}
// 如何让蛇头移动起来 操作蛇头 js找到蛇头对应的div
// 蛇头移动 如何让蛇头移动起来 四个方向
// 移动前需要判断一下当前蛇头是要向哪个方向进行移动
// .value 索引值 左 右 上 下
// 假设蛇头的默认移动方向是向左
var headNode = createDiv('red'); // 创建一个蛇头
Node.push(headNode);
headNode.value = '右'; // .value是判断蛇头的移动方向
var foodNode = createDiv('blue'); // 创建食物
function move() {
  if (bodyNodes.length > 0) {
    // 身体移动通过循环遍历让身体移动起来
    // 如何让身体跟随头部移动???
    // 身体跟随前一块移动 让他走上一块上一次行走的方向
    // 反向循环为什么就可以了?
    for (var i = bodyNodes.length - 1; i >= 0; i--) {
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
        case '右':
          bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) + 50 + 'px';
          break;
      }
      // bodyNodes[0] headNode 上一次的方向
      if (i == 0) {
        bodyNodes[i].value = headNode
      } else {
        bodyNodes[i].value = bodyNodes[i - 1].value
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
    case '右':
      headNode.style.top = parseInt(headNode.style.top) - 50 + 'px';
      break;
  }
  // 判断是否出边界
  
}