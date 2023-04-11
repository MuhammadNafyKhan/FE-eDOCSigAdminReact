import {
  PageViewport,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist";
import { pdfjs } from "react-pdf";
import { setTemplates } from "../actions/template";
import { FILE_BASE_URL } from "../constants";
import { IComparingTemp } from "../interface";
import store from "../store/store";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";

class PageIdtData {
  public page: number;
  public height: number;
  public width: number;
  public samples: number[];
  constructor() {
    this.page = 0;
    this.height = 0;
    this.width = 0;
    this.samples = [];
  }
}

let loadingDocIdtTask;
let idtPageCount = 0;
let currentPage = -1;
const samplesPerW = 5;
const samplesPerH = 5;
const samplesPercentage = 0.5;
const threshhold = 97.5;
let theDocPageData: PageIdtData[] = [];
let matchingTemplates: IComparingTemp[] = [];

let compareTempList: IComparingTemp[] = [];

const get = (id: string) => document.getElementById(id);

const isInternetExplorer = () => {
  const ua = window.navigator.userAgent;
  const isIE = /MSIE|Trident/.test(ua);
  return isIE;
};

let callback: any = null;

const renderDocIdtPageToCanvasesLoop = async (pdfDoc: PDFDocumentProxy) => {
  const length = pdfDoc.numPages > 5 ? 5 : pdfDoc.numPages;
  const localPageDate = [];
  let pageX = 0;
  let pageY = 0;
  for (let i = 0; i < length; i++) {
    const canvname = "idtdocpage" + i;
    const thepage = i + 1;
    const theCanvas = get(canvname) as HTMLCanvasElement;
    const ctx = theCanvas.getContext("2d", {
      alpha: false,
      willReadFrequently: true,
    });

    const page = await pdfDoc.getPage(thepage);
    const viewport = page.getViewport({
      scale: 800 / page.getViewport({ scale: 1.0 }).width,
    });

    theCanvas.height = viewport.height;
    theCanvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx!,
      viewport: viewport,
      //  renderInteractiveForms: true,
    };

    const renderTask: RenderTask = page.render({ ...renderContext });

    await renderTask.promise;

    const { view = [] } = page._pageInfo || {};
    pageX = view[2] || 0;
    pageY = view[3] || 0;
    const PIData = new PageIdtData();
    PIData.page = i + 1;
    PIData.height = theCanvas.height;
    PIData.width = theCanvas.width;
    PIData.samples = [];
    const FrSp = 1 - samplesPercentage;
    const wSpace = Math.floor((theCanvas.width * FrSp) / (samplesPerW + 1));
    const hSpace = Math.floor((theCanvas.width * FrSp) / (samplesPerH + 1));
    const wLen = Math.floor(
      (theCanvas.width * samplesPercentage) / samplesPerW
    );
    const hLen = Math.floor(
      (theCanvas.height * samplesPercentage) / samplesPerH
    );
    let wOffset = wSpace;
    let hOffset = hSpace;

    for (let w = 0; w < samplesPerW; w++) {
      for (let h = 0; h < samplesPerH; h++) {
        //take sample
        let totalBr = 0;
        const pdata = ctx!.getImageData(wOffset, hOffset, wLen, hLen);
        const { data = [] } = pdata;
        let SampleBrightness = 0;
        for (let p = 0; p < data.length; p += 4) {
          const Bright =
            (data[p] * 299 + data[p + 1] * 587 + data[p + 2] * 114) / 1000;
          if (Bright > 130) {
            SampleBrightness++;
          }
          totalBr++;
        }
        PIData.samples.push((SampleBrightness / totalBr) * 100);
        hOffset = hOffset + hLen + hSpace;
      }
      wOffset = wOffset + wLen + wSpace;
      hOffset = hSpace;
    }
    localPageDate.push(PIData);

    console.log("page data here ===========> ", localPageDate);
  }
  for (let p = 0; p < idtPageCount; p++) {
    const el: any = get("idtdocpage" + p);
    el.parentNode.removeChild(el);
  }
  const res = findMatchingDocs(localPageDate, compareTempList);
  return { temps: res, pageX, pageY, total: pdfDoc.numPages };
};

const renderDocIdtPageToCanvases = (
  pdfDoc: PDFDocumentProxy,
  cb?: (arg: any) => void
) => {
  currentPage++;
  if (currentPage >= idtPageCount) {
    currentPage = -1;
    return false;
  }
  const canvname = "idtdocpage" + currentPage;
  const thepage = currentPage + 1;
  const theCanvas = get(canvname) as HTMLCanvasElement;
  const ctx = theCanvas.getContext("2d", {
    alpha: false,
    willReadFrequently: true,
  });
  pdfDoc.getPage(thepage).then(function (page: PDFPageProxy) {
    let viewport: PageViewport;
    if (isInternetExplorer()) {
      viewport = page.getViewport({
        scale: 801 / page.getViewport({ scale: 1.0 }).width,
      });
    } else {
      viewport = page.getViewport({
        scale: 800 / page.getViewport({ scale: 1.0 }).width,
      });
    }

    theCanvas.height = viewport.height;
    theCanvas.width = viewport.width;
    // Render PDF page into theCanvas context
    const renderContext = {
      canvasContext: ctx!,
      viewport: viewport,
      //  renderInteractiveForms: true,
    };
    const renderTask: RenderTask = page.render({ ...renderContext });
    // Wait for rendering to finish
    renderTask.promise.then(function () {
      const PIData = new PageIdtData();
      PIData.page = currentPage;
      PIData.height = theCanvas.height;
      PIData.width = theCanvas.width;
      PIData.samples = [];
      const FrSp = 1 - samplesPercentage;
      const wSpace = Math.floor((theCanvas.width * FrSp) / (samplesPerW + 1));
      const hSpace = Math.floor((theCanvas.width * FrSp) / (samplesPerH + 1));
      const wLen = Math.floor(
        (theCanvas.width * samplesPercentage) / samplesPerW
      );
      const hLen = Math.floor(
        (theCanvas.height * samplesPercentage) / samplesPerH
      );
      let wOffset = wSpace;
      let hOffset = hSpace;
      for (let w = 0; w < samplesPerW; w++) {
        for (let h = 0; h < samplesPerH; h++) {
          //take sample
          let totalBr = 0;
          const pdata = ctx!.getImageData(wOffset, hOffset, wLen, hLen);
          const { data = [] } = pdata;
          let SampleBrightness = 0;
          for (let p = 0; p < data.length; p += 4) {
            const Bright =
              (data[p] * 299 + data[p + 1] * 587 + data[p + 2] * 114) / 1000;
            if (Bright > 130) {
              SampleBrightness++;
            }
            totalBr++;
          }
          PIData.samples.push((SampleBrightness / totalBr) * 100);
          hOffset = hOffset + hLen + hSpace;
        }
        wOffset = wOffset + wLen + wSpace;
        hOffset = hSpace;
      }
      theDocPageData.push(PIData);
      if (thepage === idtPageCount || thepage > 4) {
        currentPage = -1;
        for (let p = 0; p < idtPageCount; p++) {
          const el: any = get("idtdocpage" + p);
          el.parentNode.removeChild(el);
        }
        findMatchingDocs(theDocPageData, compareTempList, cb);
        return true;
      } else {
        renderDocIdtPageToCanvases(pdfDoc, cb);
      }
    });
  });
};

export const identifyPDF = async (
  file: string,
  compareTemps: IComparingTemp[],
  cb?: (arg: any) => void
) => {
  compareTempList = compareTemps;
  const filename = FILE_BASE_URL + "/" + file;
  const res = await processLoadIdtPDFJSON(filename, cb);
  return res;
};

async function processLoadIdtPDFJSON(url: string, cb?: (arg: any) => void) {
  currentPage = -1;
  theDocPageData = [];
  loadingDocIdtTask = pdfjs.getDocument({ url });
  const pdfDoc = await loadingDocIdtTask.promise;
  idtPageCount = pdfDoc.numPages;
  for (let p = 0; p < idtPageCount; p++) {
    const elCanvas = document.createElement("canvas");
    elCanvas.setAttribute("willReadFrequently", "true");
    elCanvas.id = "idtdocpage" + p;
    elCanvas.className = "hidden";
    const body = get("body");
    body?.appendChild(elCanvas);
  }
  const res = await renderDocIdtPageToCanvasesLoop(pdfDoc);
  if (res.temps.length > 0 && cb) {
    cb("");
  }

  return res;
  // loadingDocIdtTask.promise.then(function (pdfDoc) {
  //   setTimeout(function () {
  //       renderDocIdtPageToCanvases(pdfDoc, cb);
  //   }, 10);
  // });
}

const findMatchingDocs = (
  docData: any,
  compareTemplateList: IComparingTemp[],
  cb?: (arg: any) => void
) => {
  matchingTemplates = [];
  for (const compareTemp of compareTemplateList) {
    if (compareTemp.pagedata.length === docData.length) {
      let totalscore = 0;
      let score = 0;
      for (let p = 0; p < compareTemp.pagedata.length; p++) {
        for (let s = 0; s < compareTemp.pagedata[p].length; s++) {
          const ctv = parseInt(compareTemp.pagedata[p][s]);
          totalscore += ctv;
          score += ctv - Math.abs(ctv - parseInt(docData[p].samples[s]));
        }
        if (p > 4) {
          break;
        }
      }
      const matchperc = (score / totalscore) * 100;
      if (matchperc > threshhold) {
        matchingTemplates.push({
          ...compareTemp,
          score: matchperc,
        });
      }
    }
  }

  matchingTemplates.sort((a, b) => {
    if (a.score! > b.score!) {
      return -1;
    }
    if (a.score! < b.score!) {
      return 1;
    }
    return 0;
  });

  console.log({ matchingTemplates });

  store.dispatch(
    setTemplates({ templates: matchingTemplates, templateType: "Signing" })
  );
  return [...matchingTemplates];
};
