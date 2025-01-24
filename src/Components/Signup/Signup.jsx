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
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name must be 3 characters at least"),
  email: Yup.string().required("Email is Required").email("Invaild Email"),
  password: Yup.string()
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
  rePassword: Yup.string()
    .required("Confirm password  is Required")
    .oneOf([Yup.ref("password")], "Confirm password don't match password"),
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(/^(01[0-25])[0-9]{8}$/, "Enter valid egyption number"),
});

export default function Signup() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSignup(values) {
    let loadingToaster = toast.loading("in progress !!");
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        values
      );
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
      toast.success("Account Created Successfully!");
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
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: handleSignup,
      validationSchema,
    });

  return (
    <>
      <h2 className="mt-10 text-4xl font-semibold">Signup:</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
        <CustomInput
          name="name"
          type="text"
          id={"name"}
          label={"Name"}
          errors={errors.name}
          touched={touched.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
        <CustomInput
          name="rePassword"
          type="password"
          id={"rePassword"}
          label={"Confirm Password"}
          errors={errors.rePassword}
          touched={touched.rePassword}
          value={values.rePassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CustomInput
          name="phone"
          type="tel"
          id={"phone"}
          label={"Phone"}
          errors={errors.phone}
          touched={touched.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-secondary w-fit py-1.5 px-6 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Signup"}
        </button>
      </form>
      <div className="mt-5">
        <p>
          Do you Have Accoutn?{" "}
          <Link to={"/"} className="underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
