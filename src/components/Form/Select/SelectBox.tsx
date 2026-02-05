import React, { SelectHTMLAttributes } from "react";

type Option = string | { label: string; value: string };

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  formName?: string;
  req?: boolean;
  options: Option[];
}

function SelectBox({ label, formName, options, req, ...rest }: Props) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-bold text-[var(--gray-text)] mb-2">
          {label}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={formName}
        required={req}
        className="form-control "
        {...rest}
      >
        <option value="" className="bg-darker-bg">
          Select
        </option>
        {options.map((option, i) => {
          if (typeof option === "string") {
            return (
              <option value={option} key={i} className="bg-darker-bg">
                {option}
              </option>
            );
          }
          return (
            <option
              value={option.value}
              key={i}
              className="bg-darker-bg"
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
