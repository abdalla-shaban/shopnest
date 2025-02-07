import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-52px)] text-center">
      <h1 className="max-w-3xl font-bold uppercase text-4xl/tight md:text-6xl/tight font-secondary">
        Find products that matches your style
      </h1>
      <p className="max-w-3xl my-4 md:text-lg">
        Browse through our diverse range of products designed to bring out your
        cater to your sense of style
      </p>
      <Link
        to={"/products"}
        className="px-10 py-2.5 text-white rounded-full border transition-all duration-300 bg-primary border-primary hover:bg-transparent hover:text-primary"
      >
        Shop Now
      </Link>
    </div>
  );
}
