import useProducts from "../../Hooks/useProducts";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ProductsList from "../ProductsList/ProductsList";

export default function Products() {
  const { data, isLoading } = useProducts();

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-bold uppercase font-secondary">
        Products
      </h2>
      {isLoading ? <CardSkeleton /> : <ProductsList products={data.data} />}
    </div>
  );
}
