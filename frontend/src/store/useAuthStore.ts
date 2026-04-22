import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export function syncSessionWithCouchbase(role: Role) {
  // In production, this would sync the selected role/session into a Couchbase Ephemeral Bucket
  // (memory-first) so session state stays consistent across multiple devices.
  console.log(`Session sync placeholder for role: ${role.role_name}`);
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			currentRole: roles[2], // За замовчуванням - Buyer
			setRole: (roleName) => {
				const role = roles.find((r) => r.role_name === roleName) || roles[2];
				set({ currentRole: role });
				syncSessionWithCouchbase(role);
			},
		}),
		{
			name: 'market-auth',
			partialize: (state) => ({ currentRole: state.currentRole }),
		}
	)
);