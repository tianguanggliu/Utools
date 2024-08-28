import { app } from "../../scripts/app.js";
import { $el } from '../../../scripts/ui.js'
import { api } from '../../../scripts/api.js'

const ext = {
  // 扩展的唯一名称
  name: 'Utools.loadimage',
  // 页面加载后立即运行的任何初始设置
  async init(app) {

  },
  // 应用程序创建后运行的任何设置
  async setup(app) {

  },
  // 添加自定义节点定义
  // 这些定义将自动配置和注册
  // defs 是核心节点的查找表，将您的节点添加到其中
  async addCustomNodeDefs(defs, app) {

  },
  // 返回自定义小部件类型
  // 请参阅 ComfyWidgets 获取小部件示例
  async getCustomWidgets(app) {
    
  },
  
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    // 在节点定义注册到图形之前运行自定义逻辑
    // console.log(nodeType.comfyClass)
    // console.log(nodeData)
    // 这将对每个节点定义触发，因此只记录一次
    // delete ext.beforeRegisterNodeDef
  },
  //在此处注册任何自定义节点实现，以便比自定义节点定义更灵活。
  async registerCustomNodes(app) {
    // console.log('[logging]', 'register custom nodes')
  },
  // 当加载/拖动/等操作工作流程的 JSON 或 PNG 时，对每个节点触发
  // 如果在后端出现问题并且想要在前端修复工作流程
  // 这就是进行修复的地方
  loadedGraphNode(node, app) {
    // console.log('[logging]', 'loaded graph node: ', node)

    // This fires for every node on each load so only log once
    // delete ext.loadedGraphNode
  },
  // 每次构建节点时触发
  // 您可以在此处修改小部件、添加处理程序等
  nodeCreated(node, app) {
    const originMouseDownFun = node.onMouseDown;
    node.onMouseDown = function (e, pos) {
      if (originMouseDownFun) {
        originMouseDownFun.apply(this, arguments)
      }
      if (!['PreviewImage', 'LoadImage', 'SaveImage'].includes(node.type)) return
      if (node.imageIndex == null) return

      let shiftY;
			if (node.imageOffset != null) {
				shiftY = node.imageOffset;
			} else {
				if (node.widgets?.length) {
					const w = node.widgets[node.widgets.length - 1];
					shiftY = w.last_y;
					if (w.computeSize) {
						shiftY += w.computeSize()[1] + 4;
					}
					else if(w.computedHeight) {
						shiftY += w.computedHeight;
					}
					else {
						shiftY += LiteGraph.NODE_WIDGET_HEIGHT + 4;
					}
				} else {
					shiftY = node.computeSize()[1];
				}
			}


      const size = node.size;
      const imageIndex = node.imageIndex;
      let dw = size[0];
      let dh = size[1] - shiftY;
      let w = node.imgs[imageIndex].naturalWidth;
      let h = node.imgs[imageIndex].naturalHeight;
      const scaleX = dw / w;
      const scaleY = dh / h;
      const scale = Math.min(scaleX, scaleY, 1);
  
      w *= scale;
      h *= scale;
      let x = (dw - w) / 2;
      let y = (dh - h) / 2 + shiftY;
      const res = LiteGraph.isInsideRectangle(...pos, x, y, w, h)
      if (res) {
        const div = document.createElement('div');
        node.imgs.map((img) => div.appendChild(img))
        var viewer = new Viewer(div, {
          hidden: function () {
            viewer.destroy();
          },
        });

        // image.click();
        viewer.view(imageIndex);
        viewer.show();
      }
    }


  }
}

app.registerExtension(ext)