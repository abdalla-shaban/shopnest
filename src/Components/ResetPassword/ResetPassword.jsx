import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";

import { FaSpinner } from "react-icons/fa6";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Invaild Email"),
  newPassword: Yup.string()
    .required("Password is Required")
    .min(8, "Password must has 8 characters at least")
    .matches(
      /(?=.*?[A-Z])/,
      "Password must has at least one uppercase English letter."
    )
    .matches(
      /(?=.*?[a-z])/,
      "Password must has at least one lowercase English letter."
    )
    .matches(/(?=.*?[0-9])/, "Password must has at least one digit")
    .matches(
      /(?=.*?[#?!@$%^&*-])/,
      "Password must has at least one special character"
    )
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Enter vaild password"
    ),
});

export default function ResetPassword() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function handleResetPassword(values) {
    let loadingToaster = toast.loading("in progress !!");
    try {
      setIsLoading(true);
      let { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/auth/resetPassword`,
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      toast.success("Password Reset Successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToaster);
      setIsLoading(false);
    }
  }
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", newPassword: "" },
      onSubmit: handleResetPassword,
      validationSchema,
    });

  return (
    <>
      <header className="text-center">
        <h2 className="mt-10 mb-3 text-4xl font-semibold">
          Verification Code verified Successfully!
        </h2>
        <p>Enter your email and new password to reset your password</p>
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
        <CustomInput
          name="newPassword"
          type="password"
          id={"newPassword"}
          label={"New Password"}
          errors={errors.newPassword}
          touched={touched.newPassword}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-secondary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}
