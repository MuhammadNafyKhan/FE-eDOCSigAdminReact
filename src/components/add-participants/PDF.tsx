import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPDFImage, ISigningDoc } from "../../interface";
import { IStoreState } from "../../reducers";
import { FixedSizeList as List } from "react-window";
import { loadPDF } from "../../helpers/loadDoc";

interface IProps {
  file: any;
  updatePDFSettings?(x: number, y: number, total: number): void;
  handlePageHeight?(total: number): void;
  sigining_docs: ISigningDoc[];
  currentPage?: number;
  pdf_images: IPDFImage[][];
  current_doc: number;
}
// const Pages: React.FC<{
//   total: number;
//   handlePageHeight?(total: number): void;
//   setWidth(width: number): void;
//   updatePDFSettings?(x: number, y: number, total: number): void;
//   width: number;
// }> = ({ total, handlePageHeight, width, setWidth, updatePDFSettings }) => {
//   const [height, setHeight] = useState(1);

//   const onRenderSuccess = (p: PDFPageProxy) => {
//     setWidth(p.originalWidth * 2);
//     setHeight(p.originalHeight * 2);
//     updatePDFSettings &&
//       updatePDFSettings(p.originalWidth * 2, p.originalHeight * 2, total);
//   };

//   const onLoadSuccess = (p: PDFPageProxy) => {
//     if (handlePageHeight) {
//       handlePageHeight(total);
//     }
//   };
//   return (
//     <div>
//       {Array.from({ length: total }).map((v, i) => {
//         return (
//           <div key={i} id={"pdf_page_" + i} style={{ userSelect: "none" }}>
//             <Page
//               pageNumber={i + 1}
//               width={width}
//               height={height}
//               //  renderMode="svg"
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//               renderInteractiveForms={false}
//               onRenderSuccess={onRenderSuccess}
//               onLoadSuccess={onLoadSuccess}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const MemoPages = React.memo(Pages);
interface IPageProps {
  index: number;
  style: any;
  width: number;
  list: IPDFImage[];
}
const Page: React.FC<IPageProps> = ({ index, style, width, list }) => (
  <div style={{ ...style, userSelect: "none" }} id={"pdf_page_" + index}>
    <img draggable={false} src={list[index].image} width={width} />
  </div>
);

const CustomPDF: React.FC<IProps> = ({
  file,
  handlePageHeight,
  updatePDFSettings,
  pdf_images,
  current_doc,
  sigining_docs,
}) => {
  const [mainHeight, setMainHeight] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  useEffect(() => {
    const el = document.getElementById("pdf-images");
    const height = el?.clientHeight;
    setMainHeight(height || 0);
  }, []);

  useEffect(() => {
    const curr = pdf_images[current_doc];
    if (curr) {
      setPdfLoaded(true);
    } else {
      setPdfLoaded(false);
      loadPDF(sigining_docs[current_doc].uniqnm, current_doc);
    }
  }, [pdf_images]);
  if (!pdfLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div id="pdf-images">
      {/* <List
        height={mainHeight || 0}
        itemCount={pdf_images[current_doc].length}
        itemSize={pdf_images[current_doc][0].height * 2}
        width={pdf_images[current_doc][0].width * 2}
      >
        {(props) =>
          Page({
            ...props,
            list: pdf_images[current_doc],
            width: pdf_images[current_doc][0].width * 2,
          })
        }
      </List> */}
      {pdf_images[current_doc] &&
        pdf_images[current_doc].map((img, i) => {
          return (
            <div key={i} id={"pdf_page_" + i} style={{ userSelect: "none" }}>
              <img
                draggable={false}
                src={img.image}
                width={img.width * 2}
                height = {img.height*2}
                style={{ borderRight: "2px solid #BBB6B6" }}
              />
            </div>
          );
        })}
    </div>
  );
};

// const PDF = React.memo(CustomPDF);

const mapStateToProps = (store: IStoreState) => {
  const { settings, file } = store;
  const { pdf_images, sigining_docs } = file;
  const { current_doc } = settings;
  return {
    pdf_images,
    current_doc,
    sigining_docs,
  };
};

export default connect(mapStateToProps)(CustomPDF);
