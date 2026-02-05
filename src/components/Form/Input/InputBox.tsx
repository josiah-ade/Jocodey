import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  formName?: string;
  formType?: string;
  req?: boolean;
}

function InputBox({ label, formName, formType, req, ...rest }: Props) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-bold text-[var(--gray-text)] mb-2">
          {label}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={formType}
        name={formName}
        placeholder={label}
        className="form-control input-autofill-dark"
        required={req}
        onWheel={(e) => {
          if (formType === "number") {
            e.currentTarget.blur();
          }
        }}
        {...rest}
      />
    </div>
  );
}

export default InputBox;
