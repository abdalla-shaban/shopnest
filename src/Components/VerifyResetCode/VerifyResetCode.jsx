import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";

import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import ResetPassword from "../ResetPassword/ResetPassword";

const validationSchema = Yup.object().shape({
  resetCode: Yup.string().required("Verification Code is Required"),
});

export default function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  async function handleResetPassword(values) {
    let loadingToaster = toast.loading("in progress !!");
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/verifyResetCode`,
        values
      );
      toast.success(data.status);
      setIsCodeVerified(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToaster);
      setIsLoading(false);
    }
  }
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { resetCode: "" },
      onSubmit: handleResetPassword,
      validationSchema,
    });

  return (
    <>
      {isCodeVerified ? (
        <ResetPassword />
      ) : (
        <>
          <header className="text-center">
            <h2 className="mt-10 mb-3 text-4xl font-semibold">
              Code Sent Successfully!
            </h2>
            <p>Enter verification code sent to your email</p>
          </header>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
            <CustomInput
              name="resetCode"
              type="text"
              id={"resetCode"}
              label={"Verification Code"}
              errors={errors.resetCode}
              touched={touched.resetCode}
              value={values.resetCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-secondary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Verify"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
