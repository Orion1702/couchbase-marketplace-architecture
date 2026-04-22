import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Users, LayoutGrid, Package, ChevronRight } from 'lucide-react';

export const Sidebar = () => {
	const { currentRole } = useAuthStore();

	// Визначаємо, які пункти показувати на основі дозволів (permissions)
	const menuItems = [
		{
			label: 'Користувачі',
			path: '/admin/users',
			icon: <Users size={18} />,
			show: currentRole.permissions.includes('user.manage')
		},
		{
			label: 'Категорії',
			path: '/admin/category',
			icon: <LayoutGrid size={18} />,
			show: currentRole.permissions.includes('category.manage') || currentRole.role_name === 'admin'
		},
		{
			label: 'Товари',
			path: '/admin/product',
			icon: <Package size={18} />,
			show: currentRole.permissions.includes('product.manage') || currentRole.permissions.includes('product.create')
		}
	];

	return (
		<aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] p-4">
			<nav className="space-y-2">
				{menuItems.map((item) => item.show && (
					<Link
						key={item.path}
						to={item.path}
						className="flex items-center justify-between p-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
					>
						<div className="flex items-center gap-3">
							{item.icon}
							<span className="font-medium">{item.label}</span>
						</div>
						<ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
					</Link>
				))}
			</nav>
		</aside>
	);
};