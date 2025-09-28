"use client";
import { withRoleGuard } from "@/hoc/withRoleGuard";
import { ROLE_ARRAYS } from "@concert/shared";

function AdminHistoryPage() {
  
  return  <div>Admin Reservation History</div>;
}

export default withRoleGuard(AdminHistoryPage, ROLE_ARRAYS.ADMIN_ONLY);