import { create } from 'zustand';

export interface Role {
  id: number;
  role_name: string;
  permissions: string[];
}

export const roles: Role[] = [
  {
    id: 1,
    role_name: "admin",
    permissions: ["user.manage", "product.manage", "order.manage", "category.manage", "reports.view", "system.settings"]
  },
  {
    id: 2,
    role_name: "seller",
    permissions: ["product.create", "product.edit", "product.delete_own", "order.view_own", "inventory.update", "reviews.reply"]
  },
  {
    id: 3,
    role_name: "buyer",
    permissions: ["product.view", "order.create", "order.view_personal", "cart.manage", "reviews.create", "profile.edit"]
  }
];

interface AuthState {
  currentRole: Role;
  setRole: (roleName: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRole: roles[2], // За замовчуванням - Buyer
  setRole: (roleName) => {
    const role = roles.find(r => r.role_name === roleName) || roles[2];
    set({ currentRole: role });
  },
}));