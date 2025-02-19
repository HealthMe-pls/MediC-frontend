"use client";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";
import Shopside from "../components/ShopSide";

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <Image src={Logo} alt="Logo" width={86} height={86} />
      <Image
        src={`${process.env.NEXT_PUBLIC_GO_API_URL}/upload/workshop2.jpg`}
        alt="Workshop"
        width={86}
        height={86}
      />
      <Shopside blockName="A2" />
    </div>
  );
}
