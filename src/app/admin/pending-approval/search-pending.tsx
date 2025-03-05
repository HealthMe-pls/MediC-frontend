export interface SearchPendingProps {
  onChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchPending({ onChanges }: SearchPendingProps) {
  return (
    <>
      <div className="min-w-[500px] flex items-center">
        <input
          type="text"
          placeholder="Search by Username"
          onChange={onChanges}
          style={{
            backgroundImage: "url(/assets/search-rounded.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            paddingLeft: "30px",
          }}
          className="max-w-[500px] min-h-[40px]  px-3 text-base placeholder-gray-600 border rounded-full focus:shadow-outline ml-2"
        />
      </div>
    </>
  );
}
