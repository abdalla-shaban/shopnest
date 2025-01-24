import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";

import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import VerifyResetCode from "../VerifyResetCode/VerifyResetCode";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Invaild Email"),
});

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  async function handleForgetPassword(values) {
    let loadingToaster = toast.loading("in progress !!");
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forgotPasswords`,
        values
      );
      toast.success(data.message);
      setIsCodeSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToaster);
      setIsLoading(false);
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      onSubmit: handleForgetPassword,
      validationSchema,
    });

  return (
    <>
      {isCodeSent ? (
        <VerifyResetCode />
      ) : (
        <>
          <header className="text-center">
            <h2 className="mt-10 mb-3 text-4xl font-semibold">
              Forget Password?
            </h2>
            <p>Enter your email to reset your password</p>
          </header>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
            <CustomInput
              name="email"
              type="email"
              id={"email"}
              label={"Email"}
              errors={errors.email}
              touched={touched.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-secondary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Get Code"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
