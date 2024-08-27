// abc.onDrawTitleBox = function (ctx, height, size, scale) {
//   console.log(height)
// console.log(size)



//          // 获取titlebox的宽度和位置
// const titleHeight = height;
// const titleWidth = size[0];

// // 定义按钮的矩形区域（放在 titlebox 的右侧）
// const buttonWidth = 18;
// const buttonHeight = 18;
// const buttonX = titleWidth - buttonWidth - 2; // 按钮距离右边缘的距离
// const buttonY = -(titleHeight + buttonHeight) / 2; // 垂直居中

// const buttonRect = [buttonX, buttonY, buttonWidth, buttonHeight];
// // 绘制按钮
// ctx.fillStyle = "blue"; // 按钮背景颜色
// ctx.fillRect(buttonRect[0], buttonRect[1],buttonRect[2],buttonRect[3]);


// // onDrawTitleBox?.apply(this, arguments);
// const fill = "red";
// ctx.beginPath();
// ctx.rect(11, -height + 11, 2, 2);
// ctx.rect(14, -height + 11, 2, 2);
// ctx.rect(17, -height + 11, 2, 2);
// ctx.rect(11, -height + 14, 2, 2);
// ctx.rect(14, -height + 14, 2, 2);
// ctx.rect(17, -height + 14, 2, 2);
// ctx.rect(11, -height + 17, 2, 2);
// ctx.rect(14, -height + 17, 2, 2);
// ctx.rect(17, -height + 17, 2, 2);

// ctx.fillStyle = "red";
// ctx.fill();
// ctx.fillStyle = fill;
// };

/**************
 * 
 * abc.title = abc.title + "     "
 * 通过增加title长度来增加titlebox的宽度
 */