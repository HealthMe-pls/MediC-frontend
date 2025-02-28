import { Menu } from "@/utility/shopDetail";
import Image from "next/image";

interface CardMenuProps {
  menu: Menu; // ใช้ Interface Menu เพื่อกำหนดรูปแบบของ menu prop
}

const CardProductDetail: React.FC<CardMenuProps> = ({ menu }) => {
  return (
    <div
      key={menu.id}
      className="text-[14px] font-light mb-2 bg-white p-2 rounded-[10px] w-[100%] content-start"
    >
      <div className="flex gap-4 m-2">
        {/* รูปภาพของสินค้า */}
        <div className="w-[100px] h-[100px] flex-shrink-0">
          {menu.photos?.length ? (
            (() => {
              // const imageUrl = `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0]?.pathfile}`;
              // console.log(imageUrl); // Console log URL ของรูปภาพ
              return (
                <div className="overflow-hidden max-w-[100px] max-h-[100px] rounded-[10]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0]?.pathfile}`}
                    alt={menu.product_name}
                    width={100}
                    height={100}
                  />
                </div>
              );
            })()
          ) : (
            <div className="w-full h-full object-cover rounded-[10px] bg-[#F0F0F0] flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>
        {/* รายละเอียดของสินค้า */}
        <div className="flex flex-col justify-center content-start h-[100%]">
          <h5 className="font-medium text-[14px]">{menu.product_name}</h5>
          <p className="font-medium text-[13px]">
            {menu.price.toFixed(2)} Baht
          </p>
          <p className="font-medium text-[14px] mt-2">Description</p>
          <p className="font-light text-[14px]">{menu.product_description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProductDetail;
