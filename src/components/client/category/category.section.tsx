import { Button } from "antd";
import styles from "styles/category.module.scss";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product/product.card";
import PrimaryButton from "@/components/button/primary.button";

interface IProduct {
  image: string;
  brand: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
}

interface IProps {
  title: string;
  banner?: string;
  products: IProduct[];
}

const CategorySection = (props: IProps) => {
  const navigate = useNavigate();
  const { title, banner, products } = props;
  return (
    <div className={"container"}>
      <div className={styles["category_section"]}>
        <h2>{title}</h2>
        <PrimaryButton onClick={() => navigate("/category")}>
          XEM TẤT CẢ
        </PrimaryButton>
      </div>
      {banner && (
        <img src={banner} className={styles["category_section__banner"]} />
      )}
      <div className={styles.product_list}>
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
