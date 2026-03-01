import { Outlet } from "react-router-dom";
import AppHeader from "components/layout/app.header";
import { useState } from "react";
import Banner from "components/client/banner/banner";
import CategorySection from "components/client/category/category.section";

const fakeProducts = [
  {
    brand: "Collagen Elasten",
    title:
      "Viên Uống Tinh Dầu Hoa Anh Thảo Blackmores Evening Primrose Oil 190 Viên",
    price: 2190000,
    oldPrice: 200000,
    discount: 10,
    image: "/products/thumbnail_3018177_1_.webp",
  },

  {
    brand: "Blackmores",
    title:
      "Viên Uống Tinh Dầu Hoa Anh Thảo Blackmores Evening Primrose Oil 190 Viên",
    price: 727000,
    oldPrice: 200000,
    discount: 10,
    image: "/products/thumbnail_3018177_1_.webp",
  },

  {
    brand: "Goodlife",
    title: "Thực Phẩm Bảo Vệ Sức Khoẻ Collagen Elasten Hộp 28 Ống",
    price: 551000,
    oldPrice: 200000,
    discount: 10,
    image: "/products/thumbnail_3018177_1_.webp",
  },
  {
    brand: "Goodlife",
    title:
      "Viên Uống Tinh Dầu Hoa Anh Thảo Blackmores Evening Primrose Oil 190 Viên",
    price: 551000,
    oldPrice: 200000,
    discount: 10,
    image: "/products/thumbnail_3032127_1_.webp",
  },
  {
    brand: "Goodlife",
    title:
      "Viên Uống Tinh Dầu Hoa Anh Thảo Blackmores Evening Primrose Oil 190 Viên",
    price: 551000,
    oldPrice: 200000,
    discount: 10,
    image: "/products/thumbnail_3032127_1_.webp",
  },
];
function Layout() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <>
      <AppHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Banner />
      <CategorySection
        title="CHĂM SÓC SỨC KHỎE"
        banner="/banner/1280x234__7.webp"
        products={fakeProducts}
      />
      <CategorySection
        title="TUẦN LỄ THƯƠNG HIỆU"
        banner="/banner/1280x234__7.webp"
        products={fakeProducts}
      />
      <Outlet context={[searchTerm, setSearchTerm]} />
    </>
  );
}

export default Layout;
