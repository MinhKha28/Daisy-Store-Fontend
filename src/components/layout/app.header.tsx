import {
  AppstoreAddOutlined,
  DownOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Drawer,
  Dropdown,
  Popover,
  Row,
  Space,
} from "antd";
import type { MenuProps } from "antd";
import Search from "antd/es/transfer/search";
import { useCurrentApp } from "components/context/app.context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/header.module.scss";
import { logoutAPI } from "@/services/api";
import LoginModal from "../client/auth/login.modal";
interface IProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
const AppHeader = (props: IProps) => {
  const { searchTerm, setSearchTerm } = props;
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useCurrentApp();
  const [open, setOpen] = useState<boolean>(false);
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/admin"}>Trang quản trị</Link>,
    },
    {
      key: "2",
      label: <div onClick={() => setOpenAccount(true)}>Quản lý tài khoản</div>,
    },
    {
      key: "3",
      label: <Link to={"/history"}>Lịch sử mua hàng</Link>,
    },
    {
      key: "4",
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
    },
  ];
  const contentPopover = (
    <div className="popover-cart">
      <div className="popover-cart__button">
        <Button type="primary" danger onClick={() => navigate("/order")}>
          Xem giỏ hàng
        </Button>
      </div>
    </div>
  );

  const categories: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <div className={styles["header"]}>
      <Row gutter={16} justify="center" align="middle">
        <Col xs={0} sm={6} md={4} lg={3} xl={3}>
          <div className={styles["header-logo"]}>
            <Link to={"/"} className={`${styles["header-shop"]} ml-2`}>
              Daisy Story
            </Link>
          </div>
        </Col>

        <Col xs={0} sm={6} md={4} lg={3} xl={3}>
          <Dropdown
            menu={{ items: categories }}
            placement="bottom"
            overlayClassName={styles["category_dropdown"]}
            trigger={["click"]}
          >
            <div className={styles["header_category"]}>
              <AppstoreAddOutlined />
              Danh mục <DownOutlined />
            </div>
          </Dropdown>
        </Col>

        <Col xs={4} sm={0} md={0} lg={0} xl={0}>
          <Button type="primary" onClick={showDrawer}>
            <MenuFoldOutlined />
          </Button>

          <Drawer
            title="Menu chức năng"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
            placement="left"
          >
            <div className="menu">Quản lý tài khoản</div>
            <div style={{ cursor: "pointer" }} onClick={handleLogout}>
              Đăng xuất
            </div>
          </Drawer>
        </Col>

        <Col xs={18} sm={12} md={10} lg={12} xl={10}>
          <Space.Compact className={styles["header-search"]}>
            <Search
              placeholder="Bạn tìm gì hôm nay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Space.Compact>
        </Col>

        <Col xs={0} sm={6} md={5} lg={3} xl={3}>
          {isAuthenticated && user ? (
            <Dropdown menu={{ items }}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={urlAvatar}
                  alt="avatar"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    marginRight: 10,
                  }}
                />
                <Space className={styles["header-user"]}>
                  {user?.fullName}
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Space className={styles["header-user"]}>
              <span>Đăng nhập/ Đăng ký</span>

              <div
                className={styles["header-user__account"]}
                onClick={() => setOpenLogin(true)}
              >
                Tài khoản <DownOutlined />
              </div>
            </Space>
          )}
        </Col>

        <Col
          xs={2}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          className={styles["header-cart"]}
        >
          <Link to={"/order"}>
            <Popover
              content={contentPopover}
              title="Sản phẩm mới thêm"
              placement="bottomRight"
            >
              <Badge
                count={0}
                size="small"
                showZero
                className={styles["header-cart__icon"]}
              >
                <ShoppingCartOutlined />{" "}
              </Badge>
              <span className={styles["header-cart__title"]}>Giỏ hàng</span>
            </Popover>
          </Link>
        </Col>
      </Row>
      {/* Login Modal */}
      <LoginModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </div>
  );
};

export default AppHeader;
