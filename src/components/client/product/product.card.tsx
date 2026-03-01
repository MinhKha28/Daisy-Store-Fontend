import { Badge, Card, Rate } from "antd";
import styles from "styles/product.module.scss";

interface IProps {
  image: string;
  brand: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
}

const ProductCard = (props: IProps) => {
  const { image, brand, title, price, oldPrice, discount } = props;
  return (
    <Card hoverable className={styles["product_cart"]}>
      <div className={styles["product_card__imageBox"]}>
        <img src={image} className={styles["product_card__image"]} />
      </div>
      <div className={styles["product_card__brand"]}>{brand}</div>
      <div className={styles["product_card__title"]}>{title}</div>
      <div className={styles["product_card__rating"]}>
        <Rate className={styles["rate-small"]} disabled defaultValue={5} />
        <span>5</span>
      </div>
      <div className={styles["product_card__priceBox"]}>
        <div className={styles["product_card__price"]}>
          {price.toLocaleString()}đ
        </div>

        <div className={styles["product_card__oldPrice"]}>
          {oldPrice.toLocaleString()}
        </div>
        <Badge count={`${discount ?? 0}%`} />
      </div>
    </Card>
  );
};

export default ProductCard;
