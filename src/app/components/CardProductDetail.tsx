import { Menu } from "@/utility/shopDetail";

interface CardMenuProps {
  menu: Menu; // ใช้ Interface Menu เพื่อกำหนดรูปแบบของ menu prop
}

const NEXT_API = "http://127.0.0.1:3000";

const CardProductDetail: React.FC<CardMenuProps> = ({ menu }) => {
  return (
    <div
      key={menu.id}
      className="text-[14px] font-light sm:bg-[#FFF7EB] md:bg-white rounded-[10px] max-w-[500px] max-h-[350px]"
    >
      <div className="flex gap-4 border border-[#CECECE] bg-white  rounded-[10px] p-2 max-w-[350px] max-h-[200px] items-start aspect-[35/20]">
        {/* Product Image */}
        <div className="w-[100px] h-[100px] ">
          {menu.photos?.length ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/${menu.photos[0]?.pathfile}`}
              alt={menu.product_name}
              className="w-[100px] h-[100px] object-cover rounded-[10px] border border-[#CECECE]"
              onLoad={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.setProperty(
                    "min-height",
                    `${e.currentTarget.clientHeight}px`
                  );
                  parent.style.setProperty(
                    "min-width",
                    `${e.currentTarget.clientWidth}px`
                  );
                }
              }}
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-[#F0F0F0] flex items-center justify-center rounded-[10px] border border-[#CECECE]">
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
