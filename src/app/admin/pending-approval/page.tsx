import AdminLayouts from "@/app/layouts/AdminLayouts";
import SearchPending from "./search-pending";
import PendingCard from "./pending-card";

export default function PendingApprovalPage() {
  return (
    <AdminLayouts currentPage="Pending Approval">
      <div className="flex flex-row  p-6">
        <SearchPending />
        <PendingCard />
      </div>
    </AdminLayouts>
  );
}
