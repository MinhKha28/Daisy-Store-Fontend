import { Button } from "antd";
import styles from "styles/button.module.scss";
import { RightOutlined } from "@ant-design/icons";

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton = (props: IProps) => {
  const { children, onClick } = props;
  return (
    <Button className={styles.primary_button} onClick={onClick}>
      {children}
      <RightOutlined />
    </Button>
  );
};

export default PrimaryButton;
