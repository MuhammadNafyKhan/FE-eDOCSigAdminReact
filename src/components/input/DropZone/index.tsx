import axios from "axios";
import React, { JSXElementConstructor } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { setFiles } from "../../../actions/file";
import { IStoreState } from "../../../reducers";
import { ApiService } from "../../../services/apiService";

import "./style.css";
interface IProps {
  children?: any;
  header_text: string;
  color: string;
  session: string;
  controlid: string;
  values: any;
  setFiles: (val: any) => void;
  onClick?(): void;
  toggleTemplateModal?(filename: string): void;
  name: string;
  setFieldValue(
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): void;
  setFieldTouched(
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ): void;
  modal: React.ReactElement<
    {
      onClose(): void;
      onTemplateClick(): void;
      onUploadClick(e: any): void;
      onUploadandApplyTemp?(e: any): void;
    },
    string | JSXElementConstructor<any>
  >;
}
interface IState {
  files: any[];
  showModal: boolean;
  showApplyTemplate: boolean;
  uploading: boolean;
  uploadProgress: number;
}
class CustomDropZone extends React.Component<IProps, IState> {
  constructor(p: IProps) {
    super(p);
    this.state = {
      files: [],
      showModal: false,
      showApplyTemplate: false,
      uploading: false,
      uploadProgress: 0,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onProgress = (p: any) => {
    const progress = (p.loaded / p.total) * 100;
    this.setState({ uploadProgress: progress });
  };

  handleScroll = () => {
    const el = document.getElementById("scrolling_div_" + this.props.name);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // onFileChanges = async (files: any[]) => {
  //   try {
  //     this.setState({ uploading: true, uploadProgress: 0 });
  //     this.handleScroll();
  //     const { name, values } = this.props;
  //     const formData = new FormData();
  //     // formData.set("fileupload", files[0]);
  //     // formData.set("SID", this.props.session);
  //     // formData.set("CID", this.props.controlid);
  //     formData.set("file", files[0]);
  //     const filesRes = await ApiService.upload(formData, this.onProgress);
  //     console.log("FielREs: ", filesRes);
  //     let url = filesRes.result.fileUrl.toString();
  //     let file_extn = url.split(".").pop();
  //     filesRes.uniqnm = url.split("/").pop();
  //     if (name === "sigining_docs" && file_extn !== "pdf") {
  //       const convertRes = await axios.post(
  //         "https://sandbox.edoclogic.com/eDOCSigAdminsb/restconvert.php",
  //         {
  //           session: this.props.session,
  //           controlid: this.props.controlid,
  //           thefile: filesRes[0].uniqnm,
  //         }
  //       );
  //       filesRes[0].uniqnm = convertRes.data.file;
  //     }
  //     this.setState({ uploading: false, uploadProgress: 0 });
  //     filesRes.display_name = filesRes.result.originalFileName;
  //     setTimeout(() => {
  //       this.props.setFieldValue!(name, [...values[name], filesRes]);
  //     }, 0);
  //     this.props.setFieldTouched(name, true);

  //     if (!values["current_package_name"]) {
  //       const date = new Date();
  //       const str =
  //         date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  //       this.props.setFieldValue(
  //         "current_package_name",
  //         filesRes.display_name + " " + str,
  //         false
  //       );
  //       //*    this.props.setFieldTouched("current_package_name", true, false);
  //     }

  //     if (this.state.showApplyTemplate) {
  //       this.props.toggleTemplateModal &&
  //         this.props.toggleTemplateModal(filesRes.uniqnm);
  //       this.setState({ showApplyTemplate: false });
  //     }
  //   } catch (e) {
  //     this.setState({ uploading: false, uploadProgress: 0 });
  //   }
  // };
  onFileChanges = async (files: any[]) => {
    try {
      this.setState({ uploading: true, uploadProgress: 0 });
      this.handleScroll();
      const { name, values } = this.props;
      const formData = new FormData();
      // formData.set("fileupload", files[0]);
      // formData.set("SID", this.props.session);
      // formData.set("CID", this.props.controlid);
      formData.set("file", files[0]);
      const filesRes = await ApiService.upload(formData, this.onProgress);
      console.log("FielREs: ", filesRes);
      let url = filesRes.result.fileUrl.toString();
      let file_extn = url.split(".").pop();
      filesRes.uniqnm = url.split("/").pop();
      if (name === "sigining_docs" && file_extn !== "pdf") {
        const convertRes = await axios.post(
          "https://sandbox.edoclogic.com/eDOCSigAdminsb/restconvert.php",
          {
            session: this.props.session,
            controlid: this.props.controlid,
            thefile: filesRes[0].uniqnm,
          }
        );
        filesRes[0].uniqnm = convertRes.data.file;
      }
      this.setState({ uploading: false, uploadProgress: 0 });
      filesRes.display_name = filesRes.result.originalFileName;
      setTimeout(() => {
        this.props.setFieldValue!(name, [...values[name], filesRes]);
      }, 0);
      this.props.setFieldTouched(name, true);

      if (!values["current_package_name"]) {
        const date = new Date();
        const str =
          date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

        this.props.setFieldValue(
          "current_package_name",
          filesRes.display_name + " " + str,
          false
        );
        //*    this.props.setFieldTouched("current_package_name", true, false);
      }

      if (this.state.showApplyTemplate) {
        this.props.toggleTemplateModal &&
          this.props.toggleTemplateModal(filesRes.uniqnm);
        this.setState({ showApplyTemplate: false });
      }
    } catch (e) {
      this.setState({ uploading: false, uploadProgress: 0 });
    }
  };

  // onFileChanges = async (files: any[]) => {
  //   try {
  //     this.setState({ uploading: true, uploadProgress: 0 });
  //     this.handleScroll();
  //     const { name, values } = this.props;
  //     const formData = new FormData();
  //     formData.set("fileupload", files[0]);
  //     formData.set("SID", this.props.session);
  //     formData.set("CID", this.props.controlid);
  //     const filesRes = await ApiService.upload(formData, this.onProgress);
  //     if (name === "sigining_docs" && filesRes[0].file_extn !== "pdf") {
  //       const convertRes = await axios.post(
  //         "https://sandbox.edoclogic.com/eDOCSigAdminsb/restconvert.php",
  //         {
  //           session: this.props.session,
  //           controlid: this.props.controlid,
  //           thefile: filesRes[0].uniqnm,
  //         }
  //       );
  //       filesRes[0].uniqnm = convertRes.data.file;
  //     }
  //     this.setState({ uploading: false, uploadProgress: 0 });
  //     filesRes[0].display_name = filesRes[0].filename.replace(
  //       "." + filesRes[0].file_extn,
  //       ""
  //     );
  //     setTimeout(() => {
  //       this.props.setFieldValue!(name, [...values[name], filesRes[0]]);
  //     }, 0);
  //     this.props.setFieldTouched(name, true);

  //     if (!values["current_package_name"]) {
  //       const date = new Date();
  //       const str =
  //         date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  //       this.props.setFieldValue(
  //         "current_package_name",
  //         filesRes[0].display_name + " " + str,
  //         false
  //       );
  //       //*    this.props.setFieldTouched("current_package_name", true, false);
  //     }

  //     if (this.state.showApplyTemplate) {
  //       this.props.toggleTemplateModal &&
  //         this.props.toggleTemplateModal(filesRes[0].uniqnm);
  //       this.setState({ showApplyTemplate: false });
  //     }
  //   } catch (e) {
  //     this.setState({ uploading: false, uploadProgress: 0 });
  //   }
  // };
  public render() {
    const { showModal } = this.state;
    const {
      children,
      header_text,
      color,
      modal,
      name = "sig_doc",
    } = this.props;

    return (
      <Dropzone
        onDrop={this.onFileChanges}
        onFileDialogCancel={() => {
          this.setState({ showApplyTemplate: false });
        }}
        multiple={false}
        accept={{
          "image/png": [".png"],
          "image/jpg": [".jpg"],
          "image/tiff": [".tiff"],
          "application/pdf": [".pdf"],
          "application/msword": [".doc", ".docx"],
        }}
      >
        {({ getRootProps, getInputProps }) => {
          const rootProps = getRootProps();
          const inputProps = getInputProps();

          return (
            <section className="dropzone_container">
              <div className={`dropzone_header background_${color}`}>
                <p className="header_text">{header_text}</p>
                <div onClick={this.toggleModal}>
                  <i className="fa-light fa-file-plus FAUploadIcon"></i>
                </div>
              </div>
              <div className={`dropzone_container_main border_${color}`}>
                {this.props.values && this.props.values[name].length === 0 ? (
                  <div {...rootProps}>
                    <input {...inputProps} />
                    <div
                      onClick={(e) => {
                        if (this.props.values)
                          if (this.props.values[name].length > 0) {
                            e.stopPropagation();
                            return;
                          } else {
                            e.stopPropagation();
                            this.toggleModal();
                          }
                      }}
                    >
                      {children}
                      <div className="w-100">
                        {this.state.uploading && (
                          <div className="progress w-100 mt-2">
                            <div
                              className={
                                "progress-bar progress-bar-striped progress-bar-animated background_" +
                                color
                              }
                              role="progressbar"
                              style={{ width: this.state.uploadProgress + "%" }}
                              aria-valuenow={this.state.uploadProgress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              {this.state.uploadProgress.toFixed(0)}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-100">
                    {children}
                    <div className="w-100 p-2">
                      {this.state.uploading && (
                        <div className="progress w-100 mt-2">
                          <div
                            className={
                              "progress-bar progress-bar-striped progress-bar-animated background_" +
                              color
                            }
                            role="progressbar"
                            style={{ width: this.state.uploadProgress + "%" }}
                            aria-valuenow={this.state.uploadProgress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {this.state.uploadProgress.toFixed(0)}%
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      id={"scrolling_div_" + name}
                      style={{ height: "24px" }}
                    ></div>
                  </div>
                )}
              </div>
              {showModal &&
                React.cloneElement(modal, {
                  onClose: this.toggleModal,
                  onUploadClick: (e: any) => {
                    rootProps.onClick && rootProps.onClick(e as any);
                  },
                  onUploadandApplyTemp: async (e: any) => {
                    rootProps.onClick && rootProps.onClick(e as any);
                    this.setState({ showApplyTemplate: true });
                  },
                })}
            </section>
          );
        }}
      </Dropzone>
    );
  }
}
// const CustomDropZone: React.FC<IProps> = ({
//   header_text,
//   children,
//   color,
//   setFiles: setFilesinStore,
//   modal,
//   toggleTemplateModal,
//   onClick,
// }) => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showApplyTemplate, setShowApplyTemplate] = useState(false);

//*   const toggleModal = () => {
//     setShowModal(!showModal);
//   };
//   useEffect(() => {
//     setFilesinStore(files);
//   }, [files]);

//   const onFileChanges = (acceptedFiles: any) => {
//     console.log({ showApplyTemplate, toggleTemplateModal });
//     setFiles(acceptedFiles);
//     if (showApplyTemplate) {
//       toggleTemplateModal && toggleTemplateModal();
//       setShowApplyTemplate(false);
//     }
//   };
//   console.log({ showApplyTemplate });
//   return (
//     <Dropzone
//       onDrop={onFileChanges}
//       onFileDialogCancel={() => {
//         setShowApplyTemplate(false);
//       }}
//       multiple={false}
//       accept={{
//         "image/png": [".png"],
//         "image/jpg": [".jpg"],
//         "image/tiff": [".tiff"],
//         "application/pdf": [".pdf"],
//         "application/msword": [".doc", ".docx"],
//       }}
//     >
//       {({ getRootProps, getInputProps }) => {
//         const rootProps = getRootProps();
//         const inputProps = getInputProps();

//         return (
//           <section className="dropzone_container">
//             <div className={`dropzone_header background_${color}`}>
//               <p className="header_text">{header_text}</p>
//               <div onClick={toggleModal}>
//                 <i className="fa-light fa-file-plus FAUploadIcon"></i>
//               </div>
//             </div>
//             <div className={`dropzone_container_main border_${color}`}>
//               <div className="dropzone_selected_files">
//                 {files.map((f, i) => {
//                   return (
//                     <span className="dropzone_file" key={i}>
//                       {f.name}
//                     </span>
//                   );
//                 })}
//               </div>

//               {files.length === 0 && (
//                 <div {...rootProps}>
//                   <input {...inputProps} />
//                   <div
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleModal();
//                     }}
//                   >
//                     {children}
//                   </div>
//                 </div>
//               )}
//             </div>
//             {showModal &&
//               React.cloneElement(modal, {
//                 onClose: toggleModal,
//                 onUploadClick: (e: any) => {
//                   rootProps.onClick && rootProps.onClick(e as any);
//                 },
//                 onUploadandApplyTemp: async (e: any) => {
//                   rootProps.onClick && rootProps.onClick(e as any);
//                   setShowApplyTemplate(true);
//                 },
//               })}
//           </section>
//         );
//       }}
//     </Dropzone>
//   );
// };

const mapStateToProps = (state: IStoreState) => {
  const { auth } = state;
  const { user } = auth;
  const { controlid = "", session = "" } = user || {};
  return { controlid, session };
};

export default connect(mapStateToProps, { setFiles })(CustomDropZone);
