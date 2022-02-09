var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image();
var url= './assets/dragon.jpg';
image.src = url + '?' + new Date().getTime();
image.onload = function () {
  canvas.width = image.width;
  canvas.height = image.height;

  // 绘图
  ctx.drawImage(image, 0, 0);

  // 获取像素数据
  var imageData = ctx.getImageData(0, 0, image.width, image.height);

  imageData = convertPointArray(imageData);

  window.setTimeout(() => {
    // 擦除原来的图片
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 重新绘图
    ctx.putImageData(imageData, 0, 0);
  }, 1000);

}
