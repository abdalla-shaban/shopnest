import { Link } from "react-router";
import shopnestLogo from "../../assets/shopnest-logo.svg";
import { FaHeart } from "react-icons/fa6";

const badgesImages = [
  {
    src: "/src/assets/Badge.png",
    alt: "Visa Badge",
  },
  {
    src: "/src/assets/Badge-1.png",
    alt: "Master Card Badge",
  },
  {
    src: "/src/assets/Badge-2.png",
    alt: "PayPal Badge",
  },
  {
    src: "/src/assets/Badge-3.png",
    alt: "Apple Pay Badge",
  },
  {
    src: "/src/assets/Badge-4.png",
    alt: "Google Pay Badge",
  },
];

export default function Footer() {
  return (
    <footer className="pt-4 bg-gray-100">
      <div className="py-6 container flex flex-col md:flex-row items-center md:items-stretch md:justify-between gap-5">
        <div className="flex flex-col gap-3">
          <img src={shopnestLogo} alt="shopnest logo" className="w-42" />
          <p className="max-w-sm">
            We have products that suits your style and which you’re proud to
            wear. From women to men.
          </p>
        </div>
        <div className="flex flex-wrap">
          {badgesImages.map(({ src, alt }, i) => (
            <img
              key={i}
              src={src}
              alt={alt}
              className="object-contain max-w-16 md:max-w-28"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-1 py-5 px-2 border-t border-t-gray-200">
        <p> Shop.co © 2025, All Rights Reserved</p>
        <p className="flex items-center justify-center gap-1 flex-wrap">
          Developed with <FaHeart className="text-red-500" /> by
          <Link to={""} className="font-medium">
            Abdullah Madkour
          </Link>
        </p>
      </div>
    </footer>
  );
}
