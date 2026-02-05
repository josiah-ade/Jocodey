import React, { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  formName?: string;
  req?: boolean;
}

function TextAreaBox({ label, formName, req, ...rest }: Props) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-bold text-[var(--gray-text)] mb-2">
          {label}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={formName}
        placeholder={label}
        className="form-control input-autofill-dark"
        required={req}
        {...rest}
      ></textarea>
    </div>
  );
}

export default TextAreaBox;
