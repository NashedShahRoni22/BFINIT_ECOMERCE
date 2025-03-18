import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar1 from "../../../components/site/shared/Navbar/Navbar";
import Banner1 from "../../../components/site/Banner";
import Slider1 from "../../../components/site/sliders/Slider1/Slider1";
import Slider2 from "../../../components/site/sliders/Slider2/Slider2";
import Slider3 from "../../../components/site/sliders/Slider3/Slider3";
import Category1 from "../../../components/site/categories/Category1";
import Category2 from "../../../components/site/categories/Category2";
import Highlight1 from "../../../components/site/ProductAdBanner";
import Highlight2 from "../../../components/site/ProductShowCase";
import Product1 from "../../../components/site/products/Product1";
import Product2 from "../../../components/site/products/Product2";
import Product3 from "../../../components/site/products/Product3";
import Footer1 from "../../../components/site/shared/Footer/Footer";

const componentsData = {
  navbar: {
    nav1: Navbar1,
  },
  banner: {
    banner1: Banner1,
  },
  slider: {
    slider1: Slider1,
    slider2: Slider2,
    slider3: Slider3,
  },
  category: {
    category1: Category1,
    category2: Category2,
  },
  highlight: {
    highlight1: Highlight1,
    highlight2: Highlight2,
  },
  product: {
    product1: Product1,
    product2: Product2,
    product3: Product3,
  },
  footer: {
    footer1: Footer1,
  },
};

// TODO: delete this after real api call
const demoAPIResponse = {
  1: [
    { type: "navbar", variant: "nav1" },
    { type: "slider", variant: "slider2" },
    { type: "category", variant: "category1" },
    { type: "product", variant: "product3" },
    { type: "highlight", variant: "highlight2" },
    { type: "footer", variant: "footer1" },
  ],
  2: [
    { type: "navbar", variant: "nav1" },
    { type: "slider", variant: "slider1" },
    { type: "category", variant: "category2" },
    { type: "product", variant: "product2" },
    { type: "highlight", variant: "highlight1" },
    { type: "footer", variant: "footer1" },
  ],
  3: [
    { type: "navbar", variant: "nav1" },
    { type: "slider", variant: "slider3" },
    { type: "category", variant: "category2" },
    { type: "product", variant: "product2" },
    { type: "banner", variant: "banner1" },
    { type: "footer", variant: "footer1" },
  ],
};

export default function Preview() {
  const { id } = useParams();
  const [previewData, setPreviewData] = useState([]);

  useEffect(() => {
    // TODO: add api here
    /* fetch(`/api/store-layout/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPreviewData(data.components);
      }); */

    setPreviewData(demoAPIResponse[id]);
  }, [id]);

  return (
    <div>
      {previewData.map((data, i) => {
        const ComponentToRender = componentsData[data.type]?.[data.variant];
        return ComponentToRender && <ComponentToRender key={i} />;
      })}
    </div>
  );
}
