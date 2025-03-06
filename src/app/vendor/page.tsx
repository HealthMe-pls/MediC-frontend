import VendorLayouts from "../layouts/VendorLayouts";
import LandingPic from "../../../public/assets/1.png";
import Image from "next/image";

export default function VendorLandingPage() {
  return (
    <VendorLayouts currentPage="">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[50%] h-[50%] ">
          <Image src={LandingPic} alt="Landing Picture" layout="responsive" />
        </div>
      </div>
    </VendorLayouts>
  );
}
