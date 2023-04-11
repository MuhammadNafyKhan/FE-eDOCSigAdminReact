import React, { useEffect, useState } from "react";
import "./style.css";
import { getPackages, setSinglePackage } from "../../actions/packages";
import { connect } from "react-redux";
import SelectPackageModal from "../../components/add-doc/SelectPackageModal";
import { removeSigner } from "../../actions/file";
import { IStoreState } from "../../reducers";
import {
  IApiPackage,
  IApiParticipant,
  IComparingTemp,
  IParticipants,
  ISigningDoc,
} from "../../interface";
import AddSigningDoc from "../../components/add-doc/AddSigningDoc";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setFiles } from "../../actions/file";
import { saveParticipant } from "../../actions/participant";
import { getSigingTemplate } from "../../actions/template";
import {
  updatePDFSettings,
  deletePDFSettings,
  resetIndex,
} from "../../actions/settings";
import { setElements, setElementArray } from "../../actions/element";

const schema = yup.object().shape({
  current_package_name: yup
    .string()
    .min(3)
    .max(64)
    .label("package name")
    .required(),
  sigining_docs: yup
    .array()
    .of(
      yup.object().shape({
        display_name: yup.string().required("filename is required"),
      })
    )
    .required()
    .test(
      "check review docs and request docs",
      "one document to sign is required, when both document to review and document to upload are empty",
      function (value = []) {
        const { parent = {} } = this;
        const { review_docs = [], requested_docs } = parent;
        const result =
          value.length === 0 &&
          review_docs.length === 0 &&
          requested_docs.length === 0;
        return !result;
      }
    ),
  // review_docs: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       display_name: yup.string().required("filename is required"),
  //     })
  //   )
  //   .required()
  //   .test(
  //     "check siging docs and request docs",
  //     "one document for review is required, when both document to sign and document to upload are empty",
  //     function (value = []) {
  //       const { parent = {} } = this;
  //       const { sigining_docs = [], requested_docs } = parent;
  //       const result =
  //         value.length === 0 &&
  //         sigining_docs.length === 0 &&
  //         requested_docs.length === 0;
  //       return !result;
  //     }
  //   ),
  // requested_docs: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       name: yup.string().required("name is required"),
  //       message: yup.string().required("message is required"),
  //     })
  //   )
  //   .required()
  //   .test(
  //     "check sigining_docs docs and review docs",
  //     "one document for upload is required, when both document to sign and document to review are empty",
  //     function (value = []) {
  //       const { parent = {} } = this;
  //       const { review_docs = [], sigining_docs } = parent;
  //       const result =
  //         value.length === 0 &&
  //         review_docs.length === 0 &&
  //         sigining_docs.length === 0;
  //       return !result;
  //     }
  //   ),
});

interface IProps {
  host: string;
  session: string | null;
  controlid: string;
  packages: IApiPackage[];
  selectedPackage: IApiPackage | null;
  sigining_docs: ISigningDoc[];
  current_package_name: string;
  comparingTempLoaded: boolean;
  comparingTemps: IComparingTemp[];
  getPackages(payload?: any): void;
  setSinglePackage(payload?: any): void;
  setFiles(payload?: any): void;
  saveParticipant(payload?: any): void;
  updatePDFSettings(payload?: any): void;
  deletePDFSettings(payload?: any): void;
  resetIndex(payload?: any): void;
  setElements(payload?: any): void;
  setElementArray(payload?: any): void;
  getSigingTemplate(payload?: any): void;
  removeSigner(args?: any): void;
}

const AddDocs: React.FC<IProps> = (props) => {
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const [packageParticipants, setPackageparticipants] = useState<
    IApiParticipant[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    props.getPackages();
    if (!props.comparingTempLoaded) {
      props.getSigingTemplate();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePackagestModal = () => {
    setShowPackagesModal(!showPackagesModal);
  };

  const handleReset = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    return () => {
      props.setSinglePackage(null);
      setFieldValue("current_package_name", "");
    };
  };

  const onSubmit = (values: any) => {
    props.setFiles(values);
    const { sigining_docs } = values;
    const participants: IParticipants[] = [];
    packageParticipants.forEach((signer: IApiParticipant) => {
      const {
        delegate: allow_delegation,
        authcode: auth_code,
        email,
        name,
        // signsetname,
        //  id,
        signsetid: key,
        idprovider: id_check,
        tier: signing_order,
        phone,
      } = signer;
      const obj: IParticipants = {
        allow_delegation: allow_delegation ? "yes" : "no",
        auth_code,
        email,
        display_name: "role",
        fullname: name,
        key,
        id_check,
        signing_order,
        notification_type: "",
        text_number: phone,
      };
      participants.push(obj);
    });
    sigining_docs.forEach((doc: ISigningDoc) => {
      const { signsets = [], tempId } = doc;
      signsets.forEach((s) => {
        const {
          delegate: allow_delegation,
          authcode: auth_code,
          role,
          email,
          name,
          // signsetname,
          //   signerid,
          signsetid: key,
          idprovider: id_check,
          tier: signing_order,
        } = s;

        const obj: IParticipants = {
          allow_delegation: allow_delegation ? "yes" : "no",
          auth_code,
          //role,
          email,
          display_name: role,
          fullname: name,
          // signerid,
          key: key + tempId,
          id_check,
          signing_order: signing_order + "",
          notification_type: "",
        };
        participants.push(obj);
      });
    });

    props.saveParticipant({ participants });
    props.setElementArray({ index: sigining_docs.length });
    sigining_docs.forEach((item: any) => (item.signsets = []));
    props.removeSigner(sigining_docs);
    navigate("/app/addparticipants");
  };

  const onSelect = (pkg: IApiPackage, participants: IApiParticipant[]) => {
    props.setSinglePackage(pkg);
    setPackageparticipants(participants);
  };

  const { selectedPackage } = props;

  return (
    <div>
      <div>
        <main className="flex-shrink-0">
          <Formik
            initialValues={{
              current_package_name: props.current_package_name,
              sigining_docs: props.sigining_docs,
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              isValid,
            }) => {
              console.log({ errors, values, isValid });
              return (
                <form
                  className="row w-100 p-4 main_container"
                  onSubmit={handleSubmit}
                >
                  <div className="select_package_container">
                    <div className="header_container">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <input
                          className="create_select_input"
                          type="text"
                          placeholder="Create/Select Package"
                          name="current_package_name"
                          value={values["current_package_name"]}
                          disabled={!!selectedPackage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        {touched["current_package_name"] &&
                          errors["current_package_name"] && (
                            <span style={{ color: "red", fontSize: "10px" }}>
                              {errors.current_package_name}
                            </span>
                          )}
                      </div>

                      {!selectedPackage ? (
                        <span onClick={togglePackagestModal}>
                          <i className="fal fa-folder-plus FAFolderIcon mx-3" />
                        </span>
                      ) : (
                        <button
                          type="button"
                          style={{ width: "120px" }}
                          className="ediBtn navBack mx-3"
                          onClick={handleReset(setFieldValue)}
                        >
                          Reset
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary btn-submit"
                        style={{ alignSelf: "flex-end" }}
                      >
                        Next
                      </button>
                    </div>
                    <div className="upload_etUploadDocconatiner">
                      <p className="paragraph">
                        Create or select an existing package, then select a
                        document to begin
                      </p>
                      <div>
                        <AddSigningDoc
                          name="sigining_docs"
                          values={values}
                          errors={errors}
                          touched={touched}
                          session={props.session!}
                          host={props.host}
                          controlid={props.controlid}
                          setFieldTouched={setFieldTouched}
                          setFieldValue={setFieldValue}
                          updatePDFSettings={props.updatePDFSettings}
                          deletePDFSettings={props.deletePDFSettings}
                          resetIndex={props.resetIndex}
                          setElements={props.setElements}
                          comparingTemps={props.comparingTemps}
                        />
                      </div>
                    </div>
                  </div>
                  {showPackagesModal && (
                    <SelectPackageModal
                      packages={props.packages}
                      onClose={togglePackagestModal}
                      onSelect={onSelect}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      host={props.host}
                      session={props.session}
                      controlid={props.controlid}
                    />
                  )}
                </form>
              );
            }}
          </Formik>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

const mapStateToProps = (store: IStoreState) => {
  const { packageState, auth, file, template, participant, elements } = store;
  const { review_docs, requested_docs, sigining_docs, current_package_name } =
    file;
  const { ip: host, token: session, user } = auth;
  const { elementStatus } = elements;
  const { controlid = "" } = user || {};
  const { loader, packages, selectedPackage } = packageState;
  const { comparingTempLoaded, comparingTemps } = template;
  const { participants } = participant;
  return {
    packages,
    loader,
    selectedPackage,
    host,
    session,
    controlid,
    review_docs,
    requested_docs,
    sigining_docs,
    elementStatus,
    current_package_name,
    comparingTempLoaded,
    comparingTemps,
    participants,
  };
};
export default connect(mapStateToProps, {
  getPackages,
  setSinglePackage,
  setFiles,
  saveParticipant,
  updatePDFSettings,
  resetIndex,
  deletePDFSettings,
  setElements,
  getSigingTemplate,
  setElementArray,
  removeSigner,
})(AddDocs);
