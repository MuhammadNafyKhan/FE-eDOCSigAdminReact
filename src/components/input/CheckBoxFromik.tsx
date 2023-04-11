import React from "react";

interface IProps {
  className?: string;
  disabled?: boolean;

  warpperClassName?: string;

  name: string;
  values: any;
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  setFieldTouched(
    field: string,
    isTouched: boolean,
    shouldValidate?: boolean
  ): void;
}

export const CheckBoxFormik: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    values,
    setFieldTouched,
    setFieldValue,
    disabled,
    warpperClassName,
    className = "form-control",
  } = props;

  const onChange = (e: any) => {
    setFieldValue(props.name, e.target.checked);
    setFieldTouched(props.name, true, true);
  };

  return (
    <div className={warpperClassName}>
      <input
        type="checkbox"
        className={className}
        name={name}
        onChange={onChange}
        disabled={disabled}
        checked={values[name] || false}
      />
    </div>
  );
};
