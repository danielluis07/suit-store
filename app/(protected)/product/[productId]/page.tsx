import { Wrapper } from "@/components/wrapper";
import { ProductDiv } from "../_components/product-div";
import { ProductsCarousel } from "../../_components/products-carousel";
import { getProducts } from "@/actions/get-data/get-products";
import getProduct from "@/actions/get-data/get-product";
import { Reviews } from "./_components/reviews";
import { getReviewsByProduct } from "@/actions/get-data/get-reviews";
import { auth } from "@/auth";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const [product, reviews, newProducts, session] = await Promise.all([
    getProduct(params.productId),
    getReviewsByProduct({ productId: params.productId }),
    getProducts({ isNew: true }),
    auth(),
  ]);

  /* TODO: Related products, not new products */

  if (!product || product.stock <= 0) {
    return (
      <Wrapper>
        <div className="flex w-full h-full justify-center items-center">
          <div className="text-gray-300 font-extrabold text-xl cursor-default">
            Esse produto não está mais disponível!
          </div>
        </div>
      </Wrapper>
    );
  }

  const totalRating = reviews.reduce(
    (accumulator, review) => accumulator + review.rating,
    0
  );

  const averageRating = totalRating / reviews.length;

  function roundedValue(value: number) {
    var halfDistance = Math.abs(
      value - (value % 1 === 0 ? value : Math.floor(value) + 0.5)
    );

    var wholeDistance = Math.abs(value - Math.round(value));

    if (halfDistance < wholeDistance) {
      return value % 1 === 0 ? value : Math.floor(value) + 0.5;
    } else {
      return Math.round(value);
    }
  }

  return (
    <Wrapper className="mt-20">
      <div className="flex">
        <ProductDiv
          reviews={reviews}
          data={product}
          averageReviews={roundedValue(averageRating)}
          session={session}
        />
      </div>
      <div>
        <Reviews
          reviews={reviews}
          productId={params.productId}
          session={session}
        />
      </div>
      <div className="mt-10 sm:mt-36">
        <ProductsCarousel
          title="Novidades"
          products={newProducts}
          session={session}
        />
      </div>
    </Wrapper>
  );
};

export default ProductPage;
