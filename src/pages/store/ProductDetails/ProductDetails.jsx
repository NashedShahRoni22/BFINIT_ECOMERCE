import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";
import Hero from "./Hero/Hero";

export default function ProductDetails() {
  const { productId } = useParams();
  const { user } = useAuth();

  const { data: productDetails } = useGetQuery({
    endpoint: `/product/?productId=${productId}`,
    token: user?.token,
    queryKey: ["products", productId],
    enabled: !!productId,
  });

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      {productDetails && <Hero productDetails={productDetails} />}
    </section>
  );
}
