import React from "react";
import { Field, FieldProps } from "formik";

interface IProps {
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
  warpperClassName?: string;
  errorClassName?: string;
  id?: string;
  type?: string;
  label: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
}
export const TextField: React.FC<IProps> = ({
  name,
  id,
  disabled,
  placeholder,
  type = "text",
  label,
  labelClassName,
  warpperClassName,
  className = "form-control",
  errorClassName = "formik_error",
  autoComplete = "on",
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={warpperClassName}>
          <input
            id={id}
            disabled={disabled}
            className={className}
            autoComplete={autoComplete}
            type={type}
            {...field}
            placeholder={placeholder}
          />

          {label && (
            <label htmlFor={name} className={labelClassName}>
              {label}
            </label>
          )}

          {meta.touched && meta.error && (
            <p className={errorClassName}>{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
};
