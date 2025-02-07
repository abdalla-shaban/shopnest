import { Link } from "react-router";
import notfound from "../../assets/notfound.svg";
import { FaArrowLeft } from "react-icons/fa6";
export default function NotFound() {
  return (
    <>
      <div className="min-h-[calc(100vh-52px)] flex flex-col gap-10 items-center justify-center">
        <img className="size-80" src={notfound} alt="404 not found page" />
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-center uppercase font-secondary">
            Page Not Found
          </h2>
          <Link
            className="flex items-center gap-3 font-semibold text-center underline"
            to={"/"}
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
