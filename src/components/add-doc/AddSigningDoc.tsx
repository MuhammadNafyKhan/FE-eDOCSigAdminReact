import CustomDropZone from "../../components/input/DropZone";
import React, { useState } from "react";
import AddDocModal from "./AddDocModal";
import TemplatesModal from "./TemplatesModal";
import { FieldArray } from "formik";
import { TextField } from "../input/field/TextField";
import {
  IApiSigboxTemplate,
  IApiTemplate,
  IComparingTemp,
  IElement,
  IOptions,
} from "../../interface";
import { ApiService } from "../../services/apiService";
import PendingDocModal from "./PendingDocModal";
import PDF from "../pdf";
import { getElementType } from "../../helpers/adapters";
import { hex32Toa } from "../../helpers/hex32toa";
import { identifyPDF } from "../../helpers/formIdentify";
import { loadPDF } from "../../helpers/loadDoc";

interface IProps {
  inputProps?: {};
  name: string;
  values: any;
  errors: any;
  touched: any;
  host: string;
  session: string;
  controlid: string;
  comparingTemps: IComparingTemp[];
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
  updatePDFSettings(payload?: any): void;
  deletePDFSettings(payload?: any): void;
  setElements(payload?: any): void;
  resetIndex(): void;
}

const AddSigningDoc: React.FC<IProps> = ({
  name,
  values,
  touched,
  errors,
  session,
  controlid,
  host,
  comparingTemps,
  setFieldTouched,
  setFieldValue,
  resetIndex,
  deletePDFSettings,
  updatePDFSettings,
  setElements,
}) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [loadingTempDetails, setLoadingTempDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showPedingDoc, setShowPendingDoc] = useState(false);
  const [tempData, setTempData] = useState({
    index: -1,
    url: "",
    elements: [],
    tempId: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const toggleTemplateModal = (filter = true) => {
    if (!showTemplateModal) {
      setShowFilters(!!filter);
    } else {
      setShowFilters(true);
    }
    setShowTemplateModal(!showTemplateModal);
    if (filter === true) {
      setSelectedFile("");
    }
  };

  const toggleTemplateModalCb = () => {
    toggleTemplateModal(false);
  };

  const handleApplyTempToggale = (file: string = "") => {
    toggleTemplateModal();
    setSelectedFile(file);
  };

  const applyTemplate = (file: string) => {
    setSelectedFile(file);
    setShowTemplateModal(true);
    setShowFilters(true);
  };

  const tooglePendingDoc = () => {
    setShowPendingDoc(!showPedingDoc);
  };

  const setFieldValueCustom = (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => {
    setFieldValue(field, value, shouldValidate);
    if (field === name) {
      const filename = value[0].uniqnm;
      // const filename = value.slice(-1)[0].uniqnm;
      setSelectedFile(filename);
      identifyPDF(filename, comparingTemps, toggleTemplateModalCb);
      loadPDF(filename, values[name].length);
    }
  };
  const onChoose = async (temp?: IApiTemplate) => {
    try {
      if (temp) {
        setLoadingTempDetails(true);
        const body = {
          session: session,
          host: host,
          cont: controlid,
          action: "EDIT",
          docid: temp.id,
        };

        const res = await ApiService.post("/TEMPLATES/", body);
        const { form, graphic: uniqnm, ...rest } = res;
        const object = {
          form,
          display_name: form,
          uniqnm,
          is_template: true,
          template_applied: false,
          tempId: temp.id,
          ...rest,
        };
        if (!values["current_package_name"]) {
          const date = new Date();
          const str =
            date.getMonth() +
            1 +
            "-" +
            date.getDate() +
            "-" +
            date.getFullYear();
          setFieldValue("current_package_name", temp.name + " " + str, false);
        }

        let selectedIndex = values[name].length;
        if (selectedFile) {
          const clone = [...values[name]];
          const index = clone.findIndex((f) => f.uniqnm === selectedFile);
          selectedIndex = index;
          if (index > -1) {
            object.uniqnm = selectedFile;
            object.template_applied = true;
            const newObject = { ...object, ...clone[index] };
            clone[index] = newObject;
            setFieldValue(name, clone);
          }
        } else {
          setTimeout(() => {
            setFieldValue(name, [...values[name], object]);
          }, 0);
        }

        setFieldTouched(name, true);

        setTempData({
          url: object.uniqnm,
          index: selectedIndex,
          elements: object.sigboxes,
          tempId: object.temId,
        });
      }
      setSelectedFile("");
    } catch (e) {
      setSelectedFile("");
      setLoadingTempDetails(false);
    }
  };

  const onChoosePendingDoc = (entry: any[], applyTemplate: boolean) => {
    if (entry.length > 0) {
      setFieldValue(name, [...values[name], ...entry]);

      setFieldTouched(name, true);
      if (!values["current_package_name"]) {
        const date = new Date();
        const str =
          date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
        setTimeout(() => {
          setFieldValue(
            "current_package_name",
            entry[0].display_name + " " + str,
            true
          );
          console.log(values);
        }, 1000);
      }
    }
  };

  const percToDecimal = (val: string | number, total: number) => {
    let num: number;
    if (typeof val === "string") {
      num = parseFloat(val);
    } else {
      num = val;
    }

    return (num / 100) * total;
  };

  const updateDocSettings = (width: number, height: number, total: number) => {
    updatePDFSettings({
      maxx: width,
      maxy: height,
      total,
      index: tempData.index,
    });
    const elements: IElement[] = [];
    tempData.elements.forEach((t: IApiSigboxTemplate) => {
      const {
        width: eWidth,
        height: eHeight,
        top,
        left,
        esigntype,
        boxid,
        pagenumber,
        // font,
        // fontsize,
        // lineheight,
        fieldname,
        // fieldvalue,
        //   defaultvalue,
        //  fieldlabel,
        //  fieldrequired,
        //  depfield,
        //  depfieldvalue,
        //  depoperator,
        //  checked,
        //  uncheckedvalue,
        checkedvalue,
        signsetid,
      } = t;

      const y = parseFloat(pagenumber) * height + percToDecimal(top, height);
      const type = getElementType(esigntype);

      let options: IOptions[] = [];
      const str = hex32Toa(checkedvalue);
      if (esigntype === "10") {
        const arr = JSON.parse(str);
        options = arr.map
          ? arr.map((a: any) => {
              const [label = "", value = ""] = a;
              return {
                label,
                value,
              };
            })
          : [];
      }

      const element: IElement = {
        width: percToDecimal(eWidth, width),
        height: percToDecimal(eHeight, height),
        x: percToDecimal(left, width),
        y,
        id: boxid,
        name: fieldname ? fieldname : type,
        options,
        signer: signsetid + tempData.tempId,
        type,
      };
      elements.push(element);
    });
    setElements({
      index: tempData.index,
      element: elements,
      total: elements.length,
      showNotification: false,
    });
    toggleTemplateModal();
    setLoadingTempDetails(false);
    setTempData({ index: -1, url: "", elements: [], tempId: "" });
  };

  const updatePendingDocSettings = (
    maxx: number,
    maxy: number,
    index: number,
    total: number,
    rawEls: IApiSigboxTemplate[],
    tempId: string
  ) => {
    updatePDFSettings({
      maxx,
      maxy,
      total,
      index,
    });
    const elements: IElement[] = [];
    rawEls.forEach((t: IApiSigboxTemplate) => {
      const {
        width: eWidth,
        height: eHeight,
        top,
        left,
        esigntype,
        boxid,
        pagenumber,
        // font,
        // fontsize,
        // lineheight,
        fieldname,
        // fieldvalue,
        //   defaultvalue,
        //  fieldlabel,
        //  fieldrequired,
        //  depfield,
        //  depfieldvalue,
        //  depoperator,
        //  checked,
        //  uncheckedvalue,
        checkedvalue,
        signsetid,
      } = t;

      const y = parseFloat(pagenumber) * maxx + percToDecimal(top, maxy);
      const type = getElementType(esigntype);

      let options: IOptions[] = [];
      const str = hex32Toa(checkedvalue);
      if (esigntype === "10") {
        const arr = JSON.parse(str);
        options = arr.map
          ? arr.map((a: any) => {
              const [label = "", value = ""] = a;
              return {
                label,
                value,
              };
            })
          : [];
      }

      const element: IElement = {
        width: percToDecimal(eWidth, maxx),
        height: percToDecimal(eHeight, maxy),
        x: percToDecimal(left, maxx),
        y,
        id: boxid,
        name: fieldname ? fieldname : type,
        options,
        signer: signsetid + tempId,
        type,
      };
      elements.push(element);
    });
    setElements({
      index,
      element: elements,
      total: elements.length,
      showNotification: false,
    });
  };

  const color = values[name] && values[name].length > 0 ? "blue py-2" : "blue";

  return (
    <div>
      <CustomDropZone
        color={color}
        header_text="Document to Sign"
        toggleTemplateModal={handleApplyTempToggale}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValueCustom}
        name={name}
        values={values}
        modal={
          <AddDocModal
            onClose={() => {}}
            onTemplateClick={toggleTemplateModal}
            onUploadClick={() => {}}
            onUploadandApplyTemp={() => {}}
            onPendingDocsClick={tooglePendingDoc}
          />
        }
      >
        {values[name] && values[name].length > 0 ? (
          <FieldArray
            name={name}
            render={(arrayHelper) => {
              return (
                <div className="w-100">
                  {values[name].map((f: any, index: number) => {
                    return (
                      <div
                        key={f.uniqnm}
                        className="d-flex px-2 mt-1 align-items-center"
                      >
                        <div>
                          <i className="fas fa-file FAFileIcon color_blue" />
                        </div>
                        <div className="flex-fill ps-3">
                          {f.form ? (
                            <div className="row align-items-center">
                              <div className="col-6">
                                <TextField
                                  name={`${name}.${index}.display_name`}
                                  label=""
                                  labelClassName="d-none"
                                  placeholder="Enter filename"
                                />
                              </div>
                              <div className="col-6">
                                <span className="text-muted">({f.form})</span>
                              </div>
                            </div>
                          ) : (
                            <TextField
                              name={`${name}.${index}.display_name`}
                              label=""
                              labelClassName="d-none"
                              placeholder="Enter filename"
                            />
                          )}
                        </div>

                        <div>
                          {!f.is_template && (
                            <span
                              onClick={() => {
                                applyTemplate(f.uniqnm);
                              }}
                            >
                              <i className="fa fa-file-invoice FAStandardIcon mx-1" />
                            </span>
                          )}
                          <span
                            onClick={() => {
                              arrayHelper.remove(index);
                              deletePDFSettings({ index });
                              resetIndex();
                            }}
                          >
                            <i className="fa fa-trash-alt FAStandardIcon mx-1" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
        ) : (
          <p className="dropzone_content">
            drag and drop, click <span className="upload_button">browse</span>{" "}
            or click add icon to select a decument or template for signin (.pdf,
            .doc, .png, .jpg, .tff)
            <br />
            {touched[name] && errors[name] && (
              <span style={{ color: "red", fontSize: "10px" }}>
                {errors[name]}
              </span>
            )}
          </p>
        )}
      </CustomDropZone>
      {showTemplateModal && (
        <TemplatesModal
          onClose={toggleTemplateModal}
          onChoose={onChoose}
          loadingDetails={loadingTempDetails}
          showFilter={showFilters}
        />
      )}
      {showPedingDoc && (
        <PendingDocModal
          onClose={tooglePendingDoc}
          onChoosePendingDoc={onChoosePendingDoc}
          updatePendingDocSettings={updatePendingDocSettings}
          comparingTemps={comparingTemps}
          total={values[name] ? values[name].length : 0}
          loader={false}
          type="signing"
        />
      )}
      {tempData.index > -1 && (
        <div className="d-none">
          <PDF file={tempData.url} updatePDFSettings={updateDocSettings} />
        </div>
      )}
    </div>
  );
};
export default AddSigningDoc;
