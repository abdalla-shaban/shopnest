import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useCart } from "../../Context/CartContext";

const validationSchema = Yup.object().shape({
  details: Yup.string().required("Details is Required"),
  phone: Yup.string().required("Phone is Required"),
  city: Yup.string().required("City is Required"),
});

export default function CheckOut({ setIsCheckedOut, isCash }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { data: cartItems } = useCart();

  async function handleCheckOut(values) {
    let loadingToaster = toast.loading("in progress !!");

    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/orders/checkout-session/${
          cartItems.cartId
        }?url=https://shopnest-sigma.vercel.app/`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      location.href = data.session.url;
    } catch (error) {
      toast.error(error.response.data.message, { id: loadingToaster });
    } finally {
      setIsLoading(false);
    }
  }
  async function handleCashOrder(values) {
    let loadingToaster = toast.loading("in progress !!");

    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/orders/${cartItems.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success("Order Created Successfully!", { id: loadingToaster });
      navigate("/allorders");
    } catch (error) {
      toast.error(error.response.data.message, { id: loadingToaster });
    } finally {
      setIsLoading(false);
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        details: "",
        phone: "",
        city: "",
      },
      onSubmit: isCash ? handleCashOrder : handleCheckOut,
      validationSchema,
    });

  return (
    <>
      <h2 className="mt-10 text-4xl font-semibold">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
        <CustomInput
          name="city"
          type="text"
          id={"city"}
          label={"City"}
          errors={errors.city}
          touched={touched.city}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CustomInput
          name="details"
          type="text"
          id={"details"}
          label={"Details"}
          errors={errors.details}
          touched={touched.details}
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CustomInput
          name="phone"
          type="tel"
          id={"phone"}
          label={"phone"}
          errors={errors.phone}
          touched={touched.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCheckedOut(false)}
            className="bg-transparent text-primary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-primary hover:text-secondary transition-colors duration-300"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-secondary md:w-fit py-1.5 px-10 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Next"}
          </button>
        </div>
      </form>
    </>
  );
}
