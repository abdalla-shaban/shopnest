import { Link } from "react-router";
import useProducts from "../../Hooks/useProducts";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ProductsList from "../ProductsList/ProductsList";

export default function Products() {
  const { data, isLoading } = useProducts();

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold uppercase font-secondary">
          Recent Products
        </h2>
        <Link
          className="text-xl font-medium underline text-primary"
          to={"/products"}
        >
          See All
        </Link>
      </div>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <ProductsList products={data.data.slice(30)} />
      )}
    </div>
  );
}
