import { Menu } from "@/utility/shopDetail";

interface CardMenuProps {
  menu: Menu; // ใช้ Interface Menu เพื่อกำหนดรูปแบบของ menu prop
}

const NEXT_API = "http://127.0.0.1:3000";

const CardProductDetail: React.FC<CardMenuProps> = ({ menu }) => {
  return (
    <div
      key={menu.id}
      className="text-[14px] font-light bg-[#FFF7EB] rounded-[10px] max-w-[500px] max-h-[350px]"
    >
      <div className="flex gap-4 border border-[#CECECE] bg-white  rounded-[10px] p-2 max-w-[350px] max-h-[200px] items-start aspect-[35/20]">
        {/* Product Image */}
        <div className="max-w-[150px] max-h-[100px] aspect-[15/10]">
          {menu.photos?.length ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${menu.photos[0]?.pathfile}`}
              alt={menu.product_name}
              className="w-full h-full object-cover rounded-[10px] border border-[#CECECE]"
            />
          ) : (
            <div className="w-full h-full bg-[#F0F0F0] flex items-center justify-center rounded-[10px] border border-[#CECECE]">
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-start h-full space-y-1">
          <h5 className="font-medium text-[14px]">{menu.product_name}</h5>
          <p className="font-medium text-[13px]">
            {menu.price.toFixed(2)} Baht
          </p>
          <p className="font-medium text-[14px]">Description</p>
          <p className="font-light text-[14px]">{menu.product_description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProductDetail;
