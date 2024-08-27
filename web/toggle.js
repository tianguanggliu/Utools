import { app } from "../../scripts/app.js";
import { $el } from '../../../scripts/ui.js'
import { api } from '../../../scripts/api.js'

import { drawToggleButton, drawTitilePrefix } from './domui.js';


// this.setDirtyCanvas(true);
// this.change();

const ext = {
  // 扩展的唯一名称
  name: 'Utools.toggle',
  // 页面加载后立即运行的任何初始设置
  async init(app) {

    Utools.addEventListener("on-utools-mousedown", ((e) => {
      const canvas = app.canvas;
      const groups = app.graph._groups
      const event = e.detail.originalEvent
      for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        const res = LiteGraph.isInsideRectangle(event.canvasX, event.canvasY, ...group.Utools_rect)
        if (res) {
          const hasAnyActiveNodes = group._nodes.some((n) => n.mode === LiteGraph.ALWAYS);
          for (const node of group._nodes) {
            node.mode = hasAnyActiveNodes ? Utools.disabledValue : LiteGraph.ALWAYS;
          }
          return
        }
      }
      return
    }));

    const orignDrawGroups = LGraphCanvas.prototype.drawGroups;

		LGraphCanvas.prototype.drawGroups = function(canvas, ctx) {
      if (!this.graph) {
        return;
			}
      orignDrawGroups.apply(this, arguments);
      if (!Utools.enableToggle) return;

      const groups = app.graph._groups;
			ctx.save();
			ctx.globalAlpha = 0.7 * this.editor_alpha;
			for (let i = 0; i < groups.length; ++i) {
				let group = groups[i];
				if (!LiteGraph.overlapBounding(this.visible_area, group._bounding)) {
					continue;
				} //out of the visible area

        const pos = group._pos;
				const size = group._size;
        const hasActive = group._nodes.some(node => node.mode === LiteGraph.ALWAYS);
        const titleHeight = 32;
        const titleWidth = size[0];
        // 定义按钮的矩形区域（放在 titlebox 的右侧）
        const buttonWidth = 18;
        const buttonHeight = 10;
        const buttonX = pos[0] + titleWidth - buttonWidth - 6; // 按钮距离右边缘的距离,如果是收缩模式则再贴近文字一些
        const buttonY = pos[1] + (titleHeight - buttonHeight) / 2; // 垂直居中
        const rect = [buttonX, buttonY, buttonWidth, buttonHeight];
        drawToggleButton({ctx, isOn: hasActive, rect})
        group.Utools_rect = rect
			}
      ctx.restore();
		}

  },
  // 应用程序创建后运行的任何设置
  async setup(app) {
    app.ui.settings.addSetting({
      id: 'Utools-toggle',
      name: "Utools-toggle",
      defaultValue: Utools.enableToggle,
      type: "boolean",
      onChange(value) {
        Utools.enableToggle = value
      },
    });
    // console.log('[logging]', 'extension setup')
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
    // if (nodeType.comfyClass === config.name) {
    //   console.log('--------before register node: ', nodeType, nodeData)
    // }
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
    const originDrawFun = node.onDrawTitleBox;
    const originMouseDownFun = node.ononMouseDown;
    node.onMouseDown = function (e, pos) {
      if (!Utools.enableToggle) return
      if (originMouseDownFun) {
        originMouseDownFun.apply(this, arguments)
      }
      const buttonRect = node.Utools_toggle_rect
      // 检查点击是否在按钮区域内
      if (buttonRect && 
        pos[0] >= buttonRect[0] && pos[0] <= buttonRect[0] + buttonRect[2] &&
        pos[1] >= buttonRect[1] && pos[1] <= buttonRect[1] + buttonRect[3]) {
        if (node.mode === LiteGraph.ALWAYS) {
          node.mode = Utools.disabledValue
        } else {
          node.mode = LiteGraph.ALWAYS
        }
        return true; // 阻止其他事件处理
      }
      return false;
    }
    node.onDrawTitleBox = function (ctx, height, size, scale) {
      if (originDrawFun) {
        originDrawFun.apply(this, arguments);
      }
      drawTitilePrefix({ scale, ctx, title_height: height, node })
      if (!Utools.enableToggle) return
      if (node.title && Utools.enableToggle) {
        node.title = node.title.trim() + "     "
      }
      const fill = ctx.fillStyle;
      const titleHeight = height;
      const titleWidth = size[0];
      // 定义按钮的矩形区域（放在 titlebox 的右侧）
      const buttonWidth = 18;
      const buttonHeight = 10;
      const buttonX = titleWidth - buttonWidth - 6 + (node.flags?.collapsed ? -6 : 0); // 按钮距离右边缘的距离,如果是收缩模式则再贴近文字一些
      const buttonY = -(titleHeight + buttonHeight) / 2; // 垂直居中
      const rect = [buttonX, buttonY, buttonWidth, buttonHeight];
      node.Utools_toggle_rect = rect
      drawToggleButton({ctx, isOn: node.mode === 0, rect})

        ctx.fillStyle = fill;
    };
    // 这对每个节点触发，所以只记录一次
    // delete ext.nodeCreated
  }
}

app.registerExtension(ext)