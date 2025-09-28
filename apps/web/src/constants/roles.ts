import { Role } from "@concert/shared";

export const ROLE_ARRAYS = {
  ADMIN_ONLY: ["admin"] as const,
  USER_ONLY: ["user"] as const,
  ALL_ROLES: ["admin", "user"] as const,
} satisfies Record<string, readonly Role[]>;

