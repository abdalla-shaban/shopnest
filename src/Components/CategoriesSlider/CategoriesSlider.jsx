import Slider from "react-slick";
import { useCategories } from "../../Hooks/useCategories";
import CategoriesSkeleton from "../CategoriesSkeleton/CategoriesSkeleton";
import CategoryCard from "../CategoryCard/CategoryCard";
import { Link } from "react-router";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CategoriesSlider() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="my-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold uppercase font-secondary">
          Categories
        </h2>
        <Link
          className="text-xl font-medium underline text-primary"
          to={"/categories"}
        >
          See All
        </Link>
      </div>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.slug} className="px-4 py-8">
                <CategoryCard category={category} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
