const getWidth = function (fontSize: number, text: string) {
  const f = fontSize + "px arial" || "12px arial";
  const o = document.createElement("div");
  o.innerText = text;
  o.style.position = "absolute";
  o.style.float = "left";
  o.style.whiteSpace = "nowrap";
  o.style.visibility = "hidden";
  o.style.font = f;
  document.body.appendChild(o);
  const w = o.clientWidth;
  o.remove();
  return w;
};

export const getFontSize = (bw: number, bh: number, nc: number) => {
  nc = Math.min(nc, 35);
  let str = "";
  for (let i = 0; i < nc; i++) {
    str = str + "0";
  }
  //start at the box height and go down
  for (let i = bh - 1; i > 8; i--) {
    if (getWidth(i, str) < bw) return i;
  }
  return 8;
};
