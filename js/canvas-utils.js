


// 点阵转换
function convertPointArray(image) {
  for (var i = 0; i < image.height; i = i + 8) {
    for (var j = 0; j < image.width; j = j + 8) {
      var isCovered = isCover(image.data, image.width, i, j);
      if (isCovered) {
        image.data = drawPoints(image.data, image.width, i, j);
      } else {
        // 其他区域直接清空
        image.data = drawPoints(image.data, image.width, i, j, true);
      }
    }
  }
  return image;
}

// 判断像素块是否空白or像素覆盖
function isCover(imageData, width, x, y) {
  var covered = 0
  // 像素块为 8*8
  for (var i = x; i < x + 8; i++) {
    for (var j = y; j < y + 8; j++) {
      var idx = i * 4 * width + 4 * j
      // 阈值设为192
      var r = imageData[idx]
      var g = imageData[idx + 1]
      var b = imageData[idx + 2]
      if (r < 192 || g < 192 || b < 192) {

        covered++;
      }
      // 覆盖面积超过 45/64
      if (covered > 45) {
        return true;
      }
    }
  }
  return false
}

// 填充像素块
function drawPoints(imageData, width, x, y, clear = false) {
  for (var i = x; i < x + 8; i++) {
    for (var j = y; j < y + 8; j++) {
      var idx = i * 4 * width + 4 * j
      if (i >= x + 2 && i < x + 6 && j >= y + 2 && j < y + 6 && !clear) {
        // 画小方块
        imageData[idx] = 168;
        imageData[idx + 1] = 168;
        imageData[idx + 2] = 168;
        imageData[idx + 3] = 192;
      } else {
        // 置为空白
        imageData[idx] = 255;
        imageData[idx + 1] = 255;
        imageData[idx + 2] = 255;
        imageData[idx + 3] = 0;
      }
    }
  }
  return imageData
}