// function beforeRegisterNodeDef(nodeType, nodeData, app) {
//   if (nodeType.comfyClass !== config.name) return;

//   const onNodeCreated = nodeType.prototype.onNodeCreated;
//   nodeType.prototype.onNodeCreated = function () {
//     const ret = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;

//     // 查询当前节点数量
//     const nodes = app.graph._nodes.filter(w => w.type == nodeData.name);
//     const nodeName = `${nodeData.name}_${nodes.length}`;

//     const lastWidget = this.widgets[this.widgets.length - 1];
//     let widgetColor = makeColorWidget(this, nodeName, 'nodeData?.input?.required?.color_hex', lastWidget);

//     // api.addEventListener("alekpet_get_color_hex", async ({ detail }) => {
//     //   const { color_hex, unique_id } = detail;

//     //   if (+unique_id !== this.id || !color_hex) {
//     //     return;
//     //   }

//     //   widgetColor.widget.w_color_hex.value = color_hex;
//     // });

//     return ret;
//   };
//   // 在节点定义注册到图形之前运行自定义逻辑
//   // if (nodeType.comfyClass === config.name) {
//   //   console.log('--------before register node: ', nodeType, nodeData)
//   // }
//   // 这将对每个节点定义触发，因此只记录一次
//   // delete ext.beforeRegisterNodeDef
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
