import React, { useState } from "react";
import Modal from "../general/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { TextFieldFormik } from "../../components/input/TextFieldFormik";
import { SelectFormik } from "../../components/input/SelectFormik";
import { IApiEvent, IOptions } from "../../interface";

const eventOptions: IOptions[] = [
  {
    label: "Resend tickets if not signed",
    value: "PKG_RESEND_IF_N_SGND",
  },
  {
    label: "Notify creator if not signed",
    value: "PKG_NOTIFY_IF_N_SGND",
  },
  {
    label: "Delete package if not signed",
    value: "PKG_DELETE_IF_N_SGND",
  },
];

const schema = yup.object().shape({
  type: yup.string().required(),
  days: yup.number().required(),
});

const initialValues = {
  type: "PKG_RESEND_IF_N_SGND",
  days: 1,
};

interface IProps {
  events: IApiEvent[];
  toggleEventModal: () => void;
  handleRemoveEvent(ind: number): any;
  addEvent(val: any): void;
}
export const EventModal: React.FC<IProps> = ({
  events,
  toggleEventModal,
  handleRemoveEvent,
  addEvent,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const onCreate = (val: any) => {
    const option = eventOptions.find((o) => o.value === val.type);
    val.description = option?.label;
    addEvent(val);
    toggleAddForm();
  };

  return (
    <Modal onClose={toggleEventModal} classes="bg-white rounded p-4 w-50">
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <span>{showAddForm ? "Add New Event" : "Event"}</span>
          </div>
          <div>
            <button
              className="btn-close"
              type="button"
              onClick={toggleEventModal}
            ></button>
          </div>
        </div>
        <hr />

        {showAddForm ? (
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onCreate}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              return (
                <form id="event-form" onSubmit={handleSubmit}>
                  <SelectFormik
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    name="type"
                    options={eventOptions}
                    label="Select Event Type:"
                    empty={false}
                    labelPostion="top"
                  />
                  <TextFieldFormik
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    name="days"
                    type="number"
                    label="Execute event after this number of days:"
                    placeholder=""
                    isLogin={true} //to place label on top
                  />
                  <hr />
                  <div className="d-flex justify-content-end p-2">
                    <button
                      className="btn btn-primary me-2"
                      onClick={toggleAddForm}
                      type="button"
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Create Event
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        ) : (
          <div>
            <div>
              {events.length === 0 ? (
                <p>No added yet</p>
              ) : (
                <div>
                  {events.map((e, ind) => {
                    return (
                      <div
                        className="d-flex align-items-center justify-content-between p-1"
                        key={e.id}
                      >
                        <p className="m-0" style={{ fontWeight: "normal" }}>
                          {" "}
                          {e.description}
                        </p>
                        <div onClick={handleRemoveEvent(ind)}>
                          <i className="fas fa-trash-can px-1 float-end FAStandardIcon" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {!showAddForm && (
          <div>
            <hr />
            <div className="d-flex justify-content-end p-2">
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={toggleEventModal}
                  type="button"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleAddForm}
                >
                  Add New Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
