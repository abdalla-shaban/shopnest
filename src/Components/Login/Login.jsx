import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaSpinner } from "react-icons/fa6";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is Required").email("Invaild Email"),
  password: Yup.string().required("Password is Required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleLogin(values) {
    let loadingToaster = toast.loading("in progress !!");
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        values
      );
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
      toast.success("Logged in Successfully!");
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
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: handleLogin,
      validationSchema,
    });

  return (
    <>
      <h2 className="mt-10 text-4xl font-semibold">Login:</h2>
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
          name="password"
          type="password"
          id={"password"}
          label={"Password"}
          errors={errors.password}
          touched={touched.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Link to={"forget-password"} className="w-fit hover:underline">
          Forget Password ?
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-secondary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
        </button>
      </form>
      <div className="mt-5">
        <p>
          Don&apos;t Have Accoutn ? {""}
          <Link to={"/signup"} className="underline">
            Signup
          </Link>
        </p>
      </div>
    </>
  );
}
