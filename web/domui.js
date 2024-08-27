export function drawToggleButton({ ctx, isOn = true, rect, offColor = 'red' }) {
  const [buttonX, buttonY, buttonWidth, buttonHeight] = rect
  // 半圆的半径
  const radius = buttonHeight / 2;
  const circleR = radius - 2
  const circleXOn = buttonX + circleR + 2;  // 开状态时圆的中心 x 坐标
  const circleXOff = buttonX + buttonWidth - circleR - 2;  // 关状态时圆的中心 x 坐标
  const circleY = buttonY + circleR + 2;  // 圆的中心 y 坐标

  ctx.fillStyle = isOn ? LiteGraph.WIDGET_BGCOLOR : '#fff';
  ctx.beginPath();
  ctx.moveTo(buttonX + radius, buttonY);
  ctx.lineTo(buttonX + buttonWidth - radius, buttonY);
  ctx.arcTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + radius, radius);
  ctx.arcTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth - radius, buttonY + buttonHeight, radius);
  ctx.lineTo(buttonX + radius, buttonY + buttonHeight);
  ctx.arcTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + radius, radius);
  ctx.arcTo(buttonX, buttonY, buttonX + radius, buttonY, radius);
  ctx.closePath();
  ctx.fill();

  // 获取titlebox的宽度和位置

  // ctx.strokeStyle="red";
  // ctx.stroke();
  // 绘制滑动按钮（圆形）
  ctx.fillStyle = isOn ? LiteGraph.NODE_TITLE_COLOR : offColor;
  ctx.beginPath();
  ctx.arc(isOn ? circleXOn : circleXOff, circleY, circleR, 0, Math.PI * 2);
  ctx.fill();
}

// code from \ComfyUI\web\lib\litegraph.core.js 
export function drawTitilePrefix({ scale, ctx, title_height, node }) {
  const low_quality = scale < 0.5;
  var colState = false;
  if (LiteGraph.node_box_coloured_by_mode) {
    if (LiteGraph.NODE_MODES_COLORS[node.mode]) {
      colState = LiteGraph.NODE_MODES_COLORS[node.mode];
    }
  }
  if (LiteGraph.node_box_coloured_when_on) {
    colState = node.action_triggered ? "#FFF" : (node.execute_triggered ? "#AAA" : colState);
  }
  var box_size = 10;
  if (low_quality) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
      title_height * 0.5,
      title_height * -0.5,
      box_size * 0.5 + 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.fillStyle = node.boxcolor || colState || LiteGraph.NODE_DEFAULT_BOXCOLOR;
  if (low_quality)
    ctx.fillRect(title_height * 0.5 - box_size * 0.5, title_height * -0.5 - box_size * 0.5, box_size, box_size);
  else {
    ctx.beginPath();
    ctx.arc(
      title_height * 0.5,
      title_height * -0.5,
      box_size * 0.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}