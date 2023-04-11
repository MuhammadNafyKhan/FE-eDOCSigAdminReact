import React, { useState, useRef } from "react";
import { PDFPageProxy } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

interface IProps {
  file: any;
  updatePDFSettings?(x: number, y: number, total: number): void;
}
const Pages: React.FC<{
  total: number;
  setWidth(width: number): void;
  updatePDFSettings?(x: number, y: number, total: number): void;
  width: number;
}> = ({ total, width, setWidth, updatePDFSettings }) => {
  const [height, setHeight] = useState(1);

  const onRenderSuccess = (p: PDFPageProxy) => {
    setWidth(p.originalWidth * 2);
    setHeight(p.originalHeight * 2);
    updatePDFSettings &&
      updatePDFSettings(p.originalWidth * 2, p.originalHeight * 2, total);
  };

  return (
    <div>
      <Page
        pageNumber={1}
        width={width}
        height={height}
        renderMode="svg"
        renderAnnotationLayer={false}
        renderTextLayer={false}
        renderInteractiveForms={false}
        onRenderSuccess={onRenderSuccess}
      />
    </div>
  );
};

const MemoPages = React.memo(Pages);

const CustomPDF: React.FC<IProps> = ({ file: url, updatePDFSettings }) => {
  const filePath = useRef({
    url: "https://sandbox.edoclogic.com/Temp/" + url,
  });
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Document file={filePath.current} onLoadSuccess={onDocumentLoadSuccess}>
      <MemoPages
        width={width}
        total={numPages!}
        setWidth={setWidth}
        updatePDFSettings={updatePDFSettings}
      />
    </Document>
  );
};

const PDF = React.memo(CustomPDF);

export default PDF;
