import React, { useState } from "react";
import { TextFieldFormik } from "../../input/TextFieldFormik";
import { Formik } from "formik";
import * as yup from "yup";
import { SelectFormik } from "../../input/SelectFormik";
import { connect } from "react-redux";
import {
  addParticipant,
  editParticipant,
  removeParticipant,
} from "../../../actions/participant";
import { IStoreState } from "../../../reducers";
import { IParticipants } from "../../../interface";

interface IProps {
  removeParticipant(): void; //remove from local array
  addParticipant(payload: any): void;
  editParticipant(payload: any): void;
  removeParticipantStore(payload: any): void; //remove from redux store
  index: number;
  keys: string[];
  participant: IParticipants;
  participantKey: string;
}

const color_classes = {
  0: "bg-blue",
  1: "bg-skin",
  2: "bg-light_green",
  3: "bg-light_yellow",
};

const getBackgroud = (ind: number): string => {
  const index = ind % 4;
  return (color_classes as any)[index];
};

const schema = yup.object().shape({
  display_name: yup.string(),
  fullname: yup.string().required(),
  signing_order: yup.string().required(),
  email: yup.string().required().email(),
  text_number: yup
    .string()
    .when("notification_type", {
      is: "Text",
      then: yup.string().required().min(10).max(11),
    })
    .label("phone number"),
  account: yup.string().when("notification_type", {
    is: "Private",
    then: yup.string().required(),
  }),
  notification_type: yup.string().required(),
  auth_code: yup.string(),
  id_check: yup.string(),
  allow_delegation: yup.string(),
});

const Participant: React.FC<IProps> = (props) => {
  const { participantKey: key } = props;
  const [hideForm, setHideForm] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const initialValues: IParticipants = {
    ...props.participant,
  };
  const isAdded = props.keys.find((k) => k === key) ? true : false;

  const toggleForm = () => {
    setHideForm(!hideForm);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleRemove = () => {
    props.removeParticipant();
    if (isAdded) {
      props.removeParticipantStore({ key });
    }
  };
  const backgroundClass = getBackgroud(props.index);
  const classes = "participant_item " + backgroundClass;
  return (
    <div className={classes}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values: IParticipants, helper) => {
          helper.setValues({ ...values, isSaved: true });
          values.key = key;
          values.display_name = values.display_name
            ? values.display_name
            : initialValues.display_name;

          isAdded
            ? props.editParticipant({ value: values })
            : props.addParticipant({ value: values });
          toggleForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          // setFieldTouched,
          // setFieldValue,
          //  isSubmitting,
          /* and other goodies */
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={"participant_username " + backgroundClass}>
                <div title="toggle form" className="row">
                  <div
                    className="col-2 p-0 toggle_button-container"
                    onClick={toggleForm}
                  >
                    <span style={{ display: !hideForm ? "none" : "initial" }}>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                    <span style={{ display: hideForm ? "none" : "inline" }}>
                      <i className="fa-solid fa-angle-right"></i>
                    </span>
                  </div>
                  <div className="col-9 p-0">
                    <TextFieldFormik
                      name="display_name"
                      className={
                        "px-0 w-100 full_name_input display_name " +
                        backgroundClass
                      }
                      id="display_name"
                      placeholder=""
                      label=""
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                      autoComplete={"off"}
                    />
                  </div>
                </div>
              </div>

              <div style={hideForm ? { display: "none" } : undefined}>
                <div className="row mt-4 pt-2">
                  <div className="col-7 pe-0">
                    <TextFieldFormik
                      warpperClassName="form-floating form_input_text h-100"
                      className="form-control participant_input"
                      name="fullname"
                      id="fullname"
                      placeholder="Full Name"
                      labelClassName="participant_input_label"
                      label="Full Name"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                  <div className="col-5">
                    <SelectFormik
                      warpperClassName="form-floating"
                      className="form-select"
                      name="signing_order"
                      id="signing_order"
                      options={[
                        {
                          label: "1",
                          value: "0",
                        },
                        {
                          label: "2",
                          value: "1",
                        },
                        {
                          label: "3",
                          value: "2",
                        },
                        {
                          label: "4",
                          value: "3",
                        },
                        {
                          label: "5",
                          value: "4",
                        },
                        {
                          label: "6",
                          value: "5",
                        },
                        {
                          label: "7",
                          value: "6",
                        },
                        {
                          label: "8",
                          value: "7",
                        },
                        {
                          label: "9",
                          value: "8",
                        },
                      ]}
                      labelClassName="participant_input_label"
                      label="Signing Order"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <TextFieldFormik
                      warpperClassName="form-floating form_input_text"
                      className="form-control participant_input"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      labelClassName="participant_input_label"
                      label="Email"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <SelectFormik
                      warpperClassName="form-floating"
                      className="form-select"
                      name="notification_type"
                      id="notification_type"
                      options={[
                        {
                          label: "Gmail",
                          value: "Public",
                        },
                        {
                          label: "SMS",
                          value: "Text",
                        },
                        {
                          label: "Home Banking",
                          value: "Private",
                        },
                        {
                          label: "Don't Send",
                          value: "No Email",
                        },
                      ]}
                      labelClassName="participant_input_label"
                      label="Notification Type"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                    />
                  </div>
                </div>
                {values.notification_type === "Text" && (
                  <div className="row mt-2">
                    <div className="col">
                      <TextFieldFormik
                        warpperClassName="form-floating form_input_text"
                        className="form-control participant_input"
                        name="text_number"
                        id="text_number"
                        type="number"
                        placeholder="Text Number"
                        labelClassName="participant_input_label"
                        label="Text Number"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                {values.notification_type === "Private" && (
                  <div className="row mt-2">
                    <div className="col">
                      <TextFieldFormik
                        warpperClassName="form-floating form_input_text"
                        className="form-control participant_input"
                        name="account"
                        id="account"
                        placeholder="Account"
                        labelClassName="participant_input_label"
                        label="Account"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                <div
                  className="d-flex align-items-center cursor_pointer mt-2 advanced_feature_container"
                  onClick={toggleAdvancedOptions}
                >
                  <span style={showAdvanced ? { display: "none" } : undefined}>
                    <i className="fa-solid fa-caret-down"></i>
                  </span>
                  <span style={!showAdvanced ? { display: "none" } : undefined}>
                    <i className="fa-solid fa-caret-up"></i>
                  </span>

                  <p>Advanced Feature</p>
                </div>
                <div style={!showAdvanced ? { display: "none" } : undefined}>
                  <div className="row mt-2">
                    <div className="col-7">
                      <TextFieldFormik
                        warpperClassName="form-floating form_input_text"
                        className="form-control participant_input"
                        name="auth_code"
                        id="auth_code"
                        type="number"
                        placeholder="Auth Code"
                        labelClassName="participant_input_label"
                        label="Auth Code"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                    <div className="col-3 text-center text-white form_icon">
                      <i className="fa-thin fa-message-lines" />
                    </div>
                    <div className="col-2 text-white form_icon">
                      <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-6">
                      <SelectFormik
                        warpperClassName="form-floating"
                        className="form-select"
                        name="id_check"
                        id="id_check"
                        options={[
                          {
                            label: "None",
                            value: "None",
                          },
                          {
                            label: "Questions Only",
                            value: "IDology",
                          },
                          {
                            label: "Questions and ID Scan",
                            value: "eDS_IDTEST",
                          },
                          {
                            label: "ID Scann App",
                            value: "IDPal",
                          },
                        ]}
                        labelClassName="participant_input_label"
                        label="ID Check"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                    <div className="col-6">
                      <SelectFormik
                        warpperClassName="form-floating"
                        className="form-select"
                        name="allow_delegation"
                        id="allow_delegation"
                        options={[
                          {
                            label: "No",
                            value: "no",
                          },
                          {
                            label: "Yes",
                            value: "yes",
                          },
                        ]}
                        labelClassName="participant_input_label"
                        label="Allow Delegation"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        touched={touched}
                        errors={errors}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <span onClick={handleRemove}>
                    <i className="participant_delete_icon fa-solid fa-trash-can"></i>
                  </span>
                </div>

                <div className="row mt-2 text-center">
                  <div className="col">
                    <button
                      type="submit"
                      id="LoginBtn"
                      className={`btn btn-success w-100 ${backgroundClass}`}
                    >
                      {values.isSaved ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (store: IStoreState) => {
  const { participant } = store;
  const { participants } = participant;
  const keys = participants.map((p) => p.key);
  return { keys };
};
export default connect(mapStateToProps, {
  addParticipant,
  editParticipant,
  removeParticipantStore: removeParticipant,
})(Participant);
