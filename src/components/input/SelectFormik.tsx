import React from "react";

interface IOptions {
  label: string;
  value: string;
  type?: string;
}

interface IProps {
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
  warpperClassName?: string;
  id?: string;
  options: IOptions[];
  errors: any;
  label: string;
  name: string;
  values: any;
  empty?: boolean;
  errorClassName?: string;
  touched: any;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: any): void;
  onSelect?(val: string): void;
  labelPostion?: string;
}

export const SelectFormik: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    id,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    disabled,
    label,
    labelClassName,
    warpperClassName,
    className = "form-select",
    options,
    empty = true,
    errorClassName = "formik_error",
    labelPostion,
    onSelect,
  } = props;
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    if (onSelect) {
      manageSelect(e.target.value);
    }
  };
  const manageSelect = (val: string) => {
    const index = options.findIndex((o) => o.value === val);
    if (index > -1) {
      onSelect && onSelect(options[index].type!);
    } else {
      onSelect && onSelect("");
    }
  };

  return (
    <div className={warpperClassName}>
      {labelPostion === "top" && (
        <label className={labelClassName} html-for={name}>
          {label}
        </label>
      )}
      <select
        className={className}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={handleBlur}
        value={values[name]}
        disabled={disabled}
      >
        {empty && <option value=""> </option>}

        {options.map((opt, i) => {
          return (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      {!labelPostion && (
        <label className={labelClassName} html-for={name}>
          {label}
        </label>
      )}
      <p className={errorClassName}>
        {errors[name] && touched[name] && errors[name]}
      </p>
    </div>
  );
};
