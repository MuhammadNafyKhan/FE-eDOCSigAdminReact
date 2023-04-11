import React from "react";
import { connect } from "react-redux";
import { IPDFImage } from "../../interface";
import { IStoreState } from "../../reducers";

interface IProps {
  file: any;
  currentPage?: number;
  pdf_images: IPDFImage[][];
  current_doc: number;
}

// const Pages: React.FC<{
//   total: number;
//   width: number;
//   currentPage?: number;
// }> = ({ total, width, currentPage }) => {
//   console.log(currentPage);
//   return (
//     <div id="page_right_bar">
//       {Array.from({ length: total }).map((v, i) => {
//         return (
//           <a href={`#pdf_page_${i}`} key={i} className="page_link">
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: "4px 16px",
//               }}
//             >
//               <div
//                 style={{
//                   border:
//                     currentPage === i + 1
//                       ? "3px solid yellow"
//                       : "1px solid gray",
//                   textAlign: "center",
//                 }}
//               >
//                 <Page
//                   pageNumber={i + 1}
//                   width={width / 2}
//                   renderAnnotationLayer={false}
//                   renderTextLayer={false}
//                   renderInteractiveForms={false}
//                 />
//               </div>
//               <span>{i + 1}</span>
//             </div>
//           </a>
//         );
//       })}
//     </div>
//   );
// };

const CustomPDF: React.FC<IProps> = ({
  file,
  currentPage,
  pdf_images,
  current_doc,
}) => {
  const curr = pdf_images[current_doc];
  if (!curr) {
    return <div>Loading...</div>;
  }
  return (
    <div id="page_right_bar">
      {pdf_images[current_doc] &&
        pdf_images[current_doc].map((img, i) => {
          return (
            <a href={`#pdf_page_${i}`} key={i} className="page_link">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "4px 16px",
                }}
              >
                <div
                  style={{
                    border:
                      currentPage === i + 1
                        ? "3px solid yellow"
                        : "1px solid gray",
                    textAlign: "center",
                  }}
                >
                  <img key={i} src={img.image} width={120} height={160} />
                </div>
                <span>{i + 1}</span>
              </div>
            </a>
          );
        })}
    </div>
  );
};

const mapStateToProps = (store: IStoreState) => {
  const { settings, file } = store;
  const { pdf_images } = file;
  const { current_doc } = settings;
  return {
    pdf_images,
    current_doc,
  };
};

export default connect(mapStateToProps)(CustomPDF);
