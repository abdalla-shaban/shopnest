import { Link } from "react-router";
import shopnestLogo from "../../assets/shopnest-logo.svg";
import visa from "../../assets/Badge.png";
import masterCard from "../../assets/Badge-1.png";
import payPal from "../../assets/Badge-2.png";
import applePay from "../../assets/Badge-3.png";
import googlePay from "../../assets/Badge-4.png";
import { FaHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="pt-4 bg-gray-100">
      <div className="container flex flex-col items-center gap-5 py-6 md:flex-row md:items-stretch md:justify-between">
        <div className="flex flex-col gap-3">
          <img src={shopnestLogo} alt="shopnest logo" className="w-42" />
          <p className="max-w-sm">
            We have products that suits your style and which you’re proud to
            wear. From women to men.
          </p>
        </div>
        <div className="flex flex-wrap">
          <img
            src={visa}
            alt={"visa Badge"}
            className="object-contain max-w-16 md:max-w-28"
          />
          <img
            src={masterCard}
            alt={"Master Card Badge"}
            className="object-contain max-w-16 md:max-w-28"
          />
          <img
            src={payPal}
            alt={"PayPal Badge"}
            className="object-contain max-w-16 md:max-w-28"
          />
          <img
            src={applePay}
            alt={"ApplePay Badge"}
            className="object-contain max-w-16 md:max-w-28"
          />
          <img
            src={googlePay}
            alt={"GooglePay Badge"}
            className="object-contain max-w-16 md:max-w-28"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1 px-2 py-5 border-t border-t-gray-200">
        <p> Shop.co © 2025, All Rights Reserved</p>
        <p className="flex flex-wrap items-center justify-center gap-1">
          Developed with <FaHeart className="text-red-500" /> by
          <Link to={""} className="font-medium">
            Abdullah Madkour
          </Link>
        </p>
      </div>
    </footer>
  );
}
