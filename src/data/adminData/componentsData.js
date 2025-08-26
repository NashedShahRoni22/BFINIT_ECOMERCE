import Navbar1 from "../../components/site/shared/Navbar/Navbar";
import Banner1 from "../../components/site/Banner";
import Slider1 from "../../components/site/sliders/Slider1/Slider1";
import Slider2 from "../../components/site/sliders/Slider2/Slider2";
import Slider3 from "../../components/site/sliders/Slider3/Slider3";
import Category1 from "../../components/site/categories/Category1";
import Category2 from "../../components/site/categories/Category2";
import Highlight1 from "../../components/site/ProductAdBanner";
import Highlight2 from "../../components/site/ProductShowCase";
import Product1 from "../../components/site/products/Product1";
import Product2 from "../../components/site/products/Product2";
import Product3 from "../../components/site/products/Product3";
import Footer1 from "../../components/site/shared/Footer/Footer";
import CategoryBar from "../../components/site/shared/CategoryBar/CategoryBar";
import Hero from "../../components/maria/Hero";

export const componentsData = {
  navbarStyle: {
    nav1: Navbar1,
  },
  categoryBarStyle: {
    categoryBar1: CategoryBar,
  },
  sliderStyle: {
    slider1: Slider1,
    slider2: Slider2,
    slider3: Slider3,
  },
  heroStyle: {
    hero1: Hero,
  },
  categoryStyle: {
    category1: Category1,
    category2: Category2,
  },
  /* highlightStyle: {
    highlight1: Highlight1,
    highlight2: Highlight2,
  }, */
  productStyle: {
    product1: Product1,
    product2: Product2,
    product3: Product3,
  },
  /*  bannerStyle: {
    banner1: Banner1,
  }, */
  footerStyle: {
    footer1: Footer1,
  },
};
