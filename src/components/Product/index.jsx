// import { useEffect, useState } from "react";

import { Header, PageLoader, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Typography, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  // const fetchProduct = async () => {
  //   try {
  //     const product = await productsApi.show(slug);
  //     setProduct(product);
  //   } catch {
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    // availableQuantity,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <div>
        <Header title={name} />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10" />
          <AddToCart {...{ slug }} />
          <Button
            className="bg-neutral-800 hover:bg-neutral-950"
            label="Buy now"
            size="large"
            to={routes.checkout}
            onClick={() => setSelectedQuantity(selectedQuantity || 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
