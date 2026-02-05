"use client";


import { Button } from "@/components/Form/Button/Button";
import { useLoginForm } from "@/hooks/auth/login";
import { FaSpinner } from "react-icons/fa";

export default function LoginPageContainer() {
  const { formData, loading, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="min-h-[100vh] flex items-center justify-center !bg-dark-bg !text-white !font-inter">
      <div className="bg-bg2 rounded-xl p-7 border border-border1 w-[97%] max-w-[450px]">
        <div className="flex items-center flex-col justify-center">
          <h4 className="!text-xl text-white font-bold !mb-10">Welcome Back</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group text-gray-text">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control input-autofill-dark"
              placeholder="example@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group text-gray-text">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control input-autofill-dark"
              placeholder="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <FaSpinner className="animate-spin h-5 w-5 font-semibold" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* <div className="mt-5 flex flex-col items-center justify-center">
          <p className="text-gray-text">Don't have an account?</p>
          <Link
            href="/admin/register"
            className="underline text-green hover:opacity-[0.7]"
          >
            Register
          </Link>
        </div> */}
      </div>
    </div>
  );
}
