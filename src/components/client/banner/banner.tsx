import { Carousel, Input, Row, Col } from "antd";
import styles from "styles/banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      {/* Slider */}
      <Carousel autoplay>
        <div>
          <img src="banner/slide_1.jpg" className={styles.banner_img} />
        </div>

        <div>
          <img src="/banner/slide_2.jpg" className={styles.banner_img} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
