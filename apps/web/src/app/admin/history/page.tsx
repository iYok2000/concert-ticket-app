"use client";
import { withRoleGuard } from "@/hoc/withRoleGuard";

function AdminHistoryPage() {
  
  return  <div>Admin Reservation History</div>;
}

export default withRoleGuard(AdminHistoryPage, ["admin"]);