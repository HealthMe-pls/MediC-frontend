import { Menu } from "@/utility/shopDetail";

interface CardMenuProps {
  menu: Menu; // ใช้ Interface Menu เพื่อกำหนดรูปแบบของ menu prop
}

const CardMenu: React.FC<CardMenuProps> = ({ menu }) => {
  return (
    <div key={menu.id} className="text-[14px] font-light mb-4">
      <div className="flex-col items-start gap-4 m-2">
        {/* รูปภาพของสินค้า */}
        {menu.photos?.length ? (
          <img
            src={menu.photos[0]?.pathfile}
            alt={menu.product_name}
            className="w-[100] h-[100] object-cover rounded-[10]"
          />
        ) : (
          <div className="w-[100] h-[100] object-cover rounded-[10] bg-[#F0F0F0] flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}

        {/* รายละเอียดของสินค้า */}
        <div className="my-1">
          <h5 className="font-light text-[14px]">{menu.product_name}</h5>
          <p className="font-medium text-[13px]">${menu.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
