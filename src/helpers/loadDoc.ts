import { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { pdfjs } from "react-pdf";
import { FILE_BASE_URL } from "../constants";
import store from "../store/store";
import { setPDFImages } from "../actions/file";
import { updatePDFSettings } from "../actions/settings";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";

let loadingDocIdtTask;
let idtPageCount = 0;

const get = (id: string) => document.getElementById(id);

const renderDocIdtPageToCanvasesLoop = async (
  pdfDoc: PDFDocumentProxy,
  index: number
) => {
  const images = [];
  const length = pdfDoc.numPages;
  let pageX = 0;
  let pageY = 0;
  for (let i = 0; i < length; i++) {
    const canvname = "page" + i;
    const thepage = i + 1;
    const theCanvas = get(canvname) as HTMLCanvasElement;
    const ctx = theCanvas.getContext("2d", {
      alpha: false,
    });

    const page = await pdfDoc.getPage(thepage);
    const viewport = page.getViewport({
      scale: 2,
    });

    theCanvas.height = viewport.height;
    theCanvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx!,
      viewport: viewport,
    };

    const renderTask: RenderTask = page.render({ ...renderContext });

    await renderTask.promise;

    const { view = [] } = page._pageInfo || {};
    pageX = view[2] || 0;
    pageY = view[3] || 0;

    images.push({
      image: ctx!.canvas.toDataURL(),
      height: pageY,
      width: pageX,
    });
  }
  for (let p = 0; p < length; p++) {
    const el: any = get("page" + p);
    el.parentNode.removeChild(el);
  }
  store.dispatch(setPDFImages(images));
  store.dispatch(
    updatePDFSettings({
      index,
      maxx: pageX * 2,
      maxy: pageY * 2,
      total: length,
    })
  );
};

export const loadPDF = async (file: string, index: number, cb?: () => void) => {
  const filename = FILE_BASE_URL + "/" + file;
  const res = await processLoadIdtPDFJSON(filename, index);
  if (cb) {
    cb();
  }
  return res;
};

async function processLoadIdtPDFJSON(url: string, index: number) {
  loadingDocIdtTask = pdfjs.getDocument({ url });
  const pdfDoc = await loadingDocIdtTask.promise;
  for (let p = 0; p < pdfDoc.numPages; p++) {
    const elCanvas = document.createElement("canvas");
    elCanvas.id = "page" + p;
    elCanvas.className = "hidden";
    const body = get("body");
    body?.appendChild(elCanvas);
  }
  await renderDocIdtPageToCanvasesLoop(pdfDoc, index);
}
