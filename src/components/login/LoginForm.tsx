import { Formik } from "formik";

import * as yup from "yup";
import { Loader } from "../general/Loader";
import { TextFieldFormik } from "../input/TextFieldFormik";
import { toast } from "react-toastify";

interface IFormValue {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

interface IProps {
  loading?: boolean;
  onSubmit(values: any): void;
  onForgotPassord?(values: any): void;
}

export const LoginForm: React.FC<IProps> = (props) => {
  const { loading = false } = props;
  const initialValues: IFormValue = {
    username: "nafy123",
    password: "nafy123",
    // username: "",
    // password: "",
  };
  const onForgotPassord = (
    values: any,
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldTouched("password", false);
    toast.dismiss();
    if (values.username) {
      props.onForgotPassord && props.onForgotPassord(values);
    } else {
      setFieldTouched("username", true, true);
    }
  };
  const onSubmit = (values: any) => {
    toast.dismiss();
    props.onSubmit(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        //  isSubmitting,
        /* and other goodies */
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col">
                <TextFieldFormik
                  className="form-control"
                  name="username"
                  id="username"
                  disabled={props.loading!}
                  placeholder="User Name or Email"
                  labelClassName="labelfield"
                  label="User Name or Email"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  touched={touched}
                  errors={errors}
                  isLogin={true}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <TextFieldFormik
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  disabled={loading}
                  placeholder="Password"
                  labelClassName="labelfield"
                  label="Password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  touched={touched}
                  errors={errors}
                  isLogin={true}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <button type="submit" id="LoginBtn" className="greenbtnwide">
                  {loading ? <Loader /> : "Login"}
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col smallfont">
                Forgot password? Click{" "}
                <span
                  className="cursor smallfont"
                  style={{ color: "blue" }}
                  onClick={() => onForgotPassord(values, setFieldTouched)}
                >
                  {" "}
                  here.
                </span>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
