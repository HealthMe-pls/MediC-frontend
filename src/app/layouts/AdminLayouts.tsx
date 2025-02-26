import AdminNavigation from "../components/AdminNavigation";

interface AdminLayoutsProps {
  currentPage: string;
  children: React.ReactNode;
}

export default function AdminLayouts({
  currentPage,
  children,
}: AdminLayoutsProps) {
  return (
    <div className="flex bg-[#F5F5F5] font-lexend text-[#4C4343]">
      <AdminNavigation currentPage={currentPage} />

      <main className="flex-1 p-6">
        <h1 className="text-[150%]">{currentPage}</h1>
        {children}
      </main>
    </div>
  );
}
