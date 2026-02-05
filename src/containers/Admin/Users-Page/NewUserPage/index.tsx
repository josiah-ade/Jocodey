"use client";

import { createUser } from "@/app/admin/users/create/actions";
import HeaderTitle from "@/components/Admin/Title/HeaderTitle";
import { Button } from "@/components/Form/Button/Button";
import InputBox from "@/components/Form/Input/InputBox";
import SelectBox from "@/components/Form/Select/SelectBox";
import TextAreaBox from "@/components/Form/TextArea/TextAreaBox";
import { userFields } from "@/const/admin/Form/users";
import { useEntityActionForm } from "@/hooks/form-actions/entity-actions";
import { FaSpinner } from "react-icons/fa";

function NewUserPageContainer() {
  const { formData, loading, handleChange, handleSubmit } = useEntityActionForm(
    {
      mode: "create",
      formFields: userFields,
      redirectPath: "/admin/users",
      onCreate: createUser,
    }
  );

  return (
    <>
      <HeaderTitle title="Create a new user" subTitle="Creating a new user." />
      <section className="bg-bg2 p-6 md:p-8 text-gray-text rounded-xl shadow-lg border border-border1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userFields.map((field, idx) =>
              field.section ? (
                <div key={`section-${idx}`} className="col-span-2 mt-4 mb-3">
                  <h2 className="text-green font-semibold">{field.section}</h2>
                  <hr className="mt-1 border-gray-300 border-dotted" />
                </div>
              ) : field.hidden ? (
                <input
                  key={field.name}
                  type="hidden"
                  name={field.name}
                  value={formData[field.name] ?? ""}
                />
              ) : field.type === "select" ? (
                <div
                  key={field.name}
                  className={field.fullWidth ? "col-span-2" : ""}
                >
                  <SelectBox
                    label={field.label}
                    formName={field.name}
                    value={formData[field.name] || field.defaultValue || ""}
                    options={field.options || []}
                    onChange={handleChange}
                    req={field.required}
                  />
                </div>
              ) : field.type === "textarea" ? (
                <div
                  key={field.name}
                  className={field.fullWidth ? "col-span-2" : ""}
                >
                  <TextAreaBox
                    label={field.label}
                    formName={field.name}
                    onChange={handleChange}
                    req={field.required}
                    value={formData[field.name] ?? ""}
                  />
                </div>
              ) : (
                <div
                  key={field.name}
                  className={field.fullWidth ? "col-span-2" : ""}
                >
                  <InputBox
                    label={field.label}
                    formName={field.name}
                    formType={field.type}
                    onChange={handleChange}
                    req={field.required}
                    value={
                      field.type === "date"
                        ? formData[field.name] || field.defaultValue || ""
                        : (formData[field.name] ?? "")
                    }
                    readOnly={field.readonly}
                  />
                </div>
              )
            )}
          </div>

          <Button
            type="submit"
            className="w-full sm:max-w-[250px]"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin h-5 w-5 font-semibold" />
            ) : (
              "Create User"
            )}
          </Button>
        </form>
      </section>
    </>
  );
}

export default NewUserPageContainer;
