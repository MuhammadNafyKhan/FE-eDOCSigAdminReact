import React from "react";

interface IProps {
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
  warpperClassName?: string;
  errorClassName?: string;
  id?: string;
  type?: string;

  errors: any;
  label: string;
  name: string;
  placeholder: string;
  values: any;
  isLogin?: boolean;
  touched: any;
  autoComplete?: string;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: any): void;
}

export const TextFieldFormik: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    id,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    disabled,
    placeholder,
    type = "text",
    label,
    labelClassName,
    warpperClassName,
    className = "form-control",
    errorClassName = "formik_error",
    isLogin = false,
    autoComplete = "on",
  } = props;

  return (
    <div className={warpperClassName}>
      {isLogin && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={className}
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {!isLogin && label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      {errors[name] && touched[name] && (
        <p className={errorClassName}>
          {errors[name] && touched[name] && errors[name]}
        </p>
      )}
    </div>
  );
};
