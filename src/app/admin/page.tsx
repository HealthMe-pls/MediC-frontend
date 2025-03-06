import AdminLayouts from "../layouts/AdminLayouts";
import LandingPic from "../../../public/assets/2.png";
import Image from "next/image";

export default function AdminLandingPage() {
  return (
    <AdminLayouts currentPage="">
      <div className="h-full flex flex-col justify-center items-center ">
        {/* <h1>Welcome to Bamboo Family Market Backdoors!!!</h1> */}
        <div className="w-[50%] h-[50%] ">
          <Image src={LandingPic} alt="Landing Picture" layout="responsive" />
        </div>
      </div>
    </AdminLayouts>
  );
}
