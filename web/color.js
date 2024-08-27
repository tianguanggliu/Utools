// import { app } from "../../scripts/app.js";
// import { $el } from '../../../scripts/ui.js'
// import { api } from '../../../scripts/api.js'
// import { ComfyWidgets } from '../../../scripts/widgets.js'


// function LImage (node, inputName, inputData, app) {
//   const uploadWidget = node.addWidget('button', 'upload file', 'video', () => {
//     showImage()
//   })
//   uploadWidget.serialize = false
//   const lastWidget = node.widgets[node.widgets.length - 1]
//   function showImage() {
//     const img = new Image();
//     img.onload = () => {
//       node.imgs = [img, img];
//       console.log(node)
//       app.graph.setDirtyCanvas(true);
//       requestAnimationFrame(() => {
//         node.setSizeForImage?.();
//       });
//     };
//     img.src = 'https://ms.bdimg.com/pacific/0/pic/-7076706_2032260970.png?x=0&y=0&h=340&w=510&vh=340.00&vw=510.00&oh=340.00&ow=510.00';
//   }
//   // function showImage(name = '001.webp') {
//   //   const img = new Image();
//   //   img.onload = () => {
//   //     node.imgs = [img];
//   //     app.graph.setDirtyCanvas(true);
//   //   };
//   //   let folder_separator = name.lastIndexOf("/");
//   //   let subfolder = "";
//   //   if (folder_separator > -1) {
//   //     subfolder = name.substring(0, folder_separator);
//   //     name = name.substring(folder_separator + 1);
//   //   }
//   //   img.src = api.apiURL(`/view?filename=${encodeURIComponent(name)}&type=input&subfolder=${subfolder}${app.getPreviewFormatParam()}${app.getRandParam()}`);
//   //   node.setSizeForImage?.();
//   // }

//   const cb = node.callback;
//   lastWidget.callback = function () {
//     showImage();
//     if (cb) {
//       return cb.apply(this, arguments);
//     }
//     setTimeout(() => {
//       console.log(node)
//     }, 1000);
//   };

//   return { widget: uploadWidget }
// }



// ComfyWidgets.LImage = LImage


// import { injectCss } from './utils.js'
// import config from "./config.js";

// console.log('🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷')
// console.log(app)
// console.log($el)
// console.log(api)
// console.log('🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷🏷')
// function get_position_style (
//   ctx,
//   widget_width,
//   y,
//   node_height,
//   left = 44
// ) {
//   const MARGIN = 0 // the margin around the html element

//   /* Create a transform that deals with all the scrolling and zooming */
//   const elRect = ctx.canvas.getBoundingClientRect()

//   const scaleX = elRect.width / ctx.canvas.width
//   const scaleY = elRect.height / ctx.canvas.height
//   const transform = new DOMMatrix()
//     .scaleSelf(scaleX, scaleY)
//     .multiplySelf(ctx.getTransform())
//     .translateSelf(MARGIN, MARGIN + y)
//   return {
//     transformOrigin: '0 0',
//     transform: transform,
//     left: `0px`, 
//     top: `0px`,
//     position: "absolute",
//     marginTop: `${MARGIN}px`,
//     maxWidth: `${widget_width - MARGIN*2}px`,
//     maxHeight: `${node_height - MARGIN*2}px`,    // we're assuming we have the whole height of the node
//     width: `${widget_width - MARGIN * 2}px`,
//     height: `100px`,
//     background: 'red',
//     zIndex: 99
//   }
// }

// function makeColorWidget(node, inputName, inputData, widget) {
//   const color_hex = $el("input", {
//     type: "color",
//     value: inputData[1]?.default || "#00ff33",
//     oninput: () => widget.callback?.(color_hex.value),
//   });

//   const color_text = $el("div", {
//     title: "Click to copy color to clipboard",
//     style: {
//       textAlign: "center",
//       fontSize: "20px",
//       height: "20px",
//       fontWeight: "600",
//       lineHeight: 1.5,
//       background: "var(--comfy-menu-bg)",
//       border: "dotted 2px white",
//       fontFamily: "sans-serif",
//       letterSpacing: "0.5rem",
//       borderRadius: "8px",
//       textShadow: "0 0 4px #fff",
//       cursor: "pointer",
//     },
//     onclick: () => navigator.clipboard.writeText(color_hex.value),
//   });

//   const w_color_hex = node.addDOMWidget(inputName, "color_hex", color_hex, {
//     getValue() {
//       color_text.style.color = color_hex.value;
//       color_text.textContent = color_hex.value;
//       return color_hex.value;
//     },
//     setValue(v) {
//       widget.value = v;
//       color_hex.value = v;
//     },
//   });

//   widget.callback = (v) => {
//     let color = isValidStyle("color", v).result ? v : "#00ff33";
//     if (color.includes("#") && color.length === 4) {
//       const opt_color = new Option().style;
//       opt_color["color"] = color;
//       color = rgbToHex(opt_color["color"]);
//     }

//     color_hex.value = color;
//     widget.value = color;
//   };

//   const w_color_text = node.addDOMWidget(
//     inputName + "_box",
//     "color_hex_box",
//     color_text
//   );

//   w_color_hex.color_hex = color_hex;

//   widget.w_color_hex = w_color_hex;
//   widget.w_color_text = w_color_text;

//   return { widget };
// }

// const ext = {
//   // 扩展的唯一名称
//   name: 'ltg.color',
//   async init(app) {
//     injectCss(`${config.extpath}/libs/viewer/viewer.min.css`).then(e => console.log(888888888888888));
//     // 页面加载后立即运行的任何初始设置
//     // console.log('[logging]', 'extension init')
//     if (!window._nodesAll) {
//       // getObjectInfo().then(r => (window._nodesAll = r))
//     }
//   },
//   async setup(app) {
//     // 应用程序创建后运行的任何设置
//     // console.log('[logging]', 'extension setup')
//   },
//   async addCustomNodeDefs(defs, app) {
//     // 添加自定义节点定义
//     // 这些定义将自动配置和注册
//     // defs 是核心节点的查找表，将您的节点添加到其中
//     // console.log(
//     //   '[logging]',
//     //   'add custom node definitions',
//     //   'current nodes:',
//     //   Object.keys(defs)
//     // )
//   },
//   async getCustomWidgets(app) {
//     // 返回自定义小部件类型
//     // 请参阅 ComfyWidgets 获取小部件示例
//     // console.log('[logging]', 'provide custom widgets')
//   },
//   // async beforeRegisterNodeDef (nodeType, nodeData, app) {
//   //   if (nodeType.comfyClass == config.name) {
//   //     const orig_nodeCreated = nodeType.prototype.onNodeCreated
//   //     nodeType.prototype.onNodeCreated = async function () {
//   //       orig_nodeCreated?.apply(this, arguments)

//   //       const node = this
//   //       const widget = {
//   //         type: 'div',
//   //         name: 'upload',
//   //         draw (ctx, node, widget_width, y, widget_height) {
//   //           Object.assign(
//   //             this.div.style,
//   //             get_position_style(ctx, widget_width, y, node.size[1],36)
//   //           )
           
//   //         }
//   //       }

//   //       widget.div = $el('div', {})

//   //       const btn = document.createElement('button')
//   //       btn.innerText = '测试Upload Images JSON'

//   //       btn.style = `cursor: pointer;
//   //       font-weight: 300;
//   //       margin: 2px; 
//   //       color: var(--descrip-text);
//   //       background-color: var(--comfy-input-bg);
//   //       border-radius: 8px;
//   //       border-color: var(--border-color);
//   //       border-style: solid;height: 30px;min-width: 122px;
//   //       width: 100%; margin: 0;
//   //      `

//   //       btn.addEventListener('click', () => {
//   //         console.log(123)
//   //       })

//   //       widget.div.appendChild(btn)
//   //       document.body.appendChild(widget.div)
//   //       this.addCustomWidget(widget)

//   //       const onRemoved = this.onRemoved
//   //       this.onRemoved = () => {
//   //         widget.div.remove()
//   //         return onRemoved?.()
//   //       }
//   //       this.setSize([this.size[0], this.size[1] + 100])
//   //       if (this.onResize) {
//   //         this.onResize(this.size)
//   //       }

//   //       this.serialize_widgets = true //需要保存参数
//   //     }
//   //   }
//   // },
//   async beforeRegisterNodeDef(nodeType, nodeData, app) {
//     if (nodeType.comfyClass !== config.name) return;

//     nodeData.input.required.ltg = ['LImage']
//     return


//     const onNodeCreated = nodeType.prototype.onNodeCreated;
//     nodeType.prototype.onNodeCreated = function () {
//       const ret = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;

//       // 查询当前节点数量
//       const nodes = app.graph._nodes.filter(w => w.type == nodeData.name);
//       const nodeName = `${nodeData.name}_${nodes.length}`;

//       const lastWidget = this.widgets[this.widgets.length - 1];
//       let widgetColor = makeColorWidget(this, nodeName, 'nodeData?.input?.required?.color_hex', lastWidget);

//       // api.addEventListener("alekpet_get_color_hex", async ({ detail }) => {
//       //   const { color_hex, unique_id } = detail;

//       //   if (+unique_id !== this.id || !color_hex) {
//       //     return;
//       //   }

//       //   widgetColor.widget.w_color_hex.value = color_hex;
//       // });

//       return ret;
//     };
//     // 在节点定义注册到图形之前运行自定义逻辑
//     // if (nodeType.comfyClass === config.name) {
//     //   console.log('--------before register node: ', nodeType, nodeData)
//     // }
//     // 这将对每个节点定义触发，因此只记录一次
//     // delete ext.beforeRegisterNodeDef
//   },
//   async registerCustomNodes(app) {
//     //在此处注册任何自定义节点实现，以便比自定义节点定义更灵活。
//     // console.log('[logging]', 'register custom nodes')
//   },
//   loadedGraphNode(node, app) {
//     // 当加载/拖动/等操作工作流程的 JSON 或 PNG 时，对每个节点触发
//     // 如果在后端出现问题并且想要在前端修复工作流程
//     // 这就是进行修复的地方
//     // console.log('[logging]', 'loaded graph node: ', node)

//     // This fires for every node on each load so only log once
//     delete ext.loadedGraphNode
//   },
//   nodeCreated(node, app) {
//     // console.error('[logging]', 'node created: ', node)
//     // 每次构建节点时触发
//     // 您可以在此处修改小部件、添加处理程序等

//     // 这对每个节点触发，所以只记录一次
//     // delete ext.nodeCreated
//     window.abc = node
//   }
// }

// app.registerExtension(ext)