import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { LayoutGrid, Smartphone, Laptop, Shirt, House, BookOpen, Gamepad2, type LucideIcon } from 'lucide-react';

type Category = {
	id?: string;
	name?: string;
	description?: string;
};

const DEFAULT_ICON: LucideIcon = LayoutGrid;

const iconMap: Array<{ keywords: string[]; icon: LucideIcon }> = [
	{ keywords: ['phone', 'smartphone', 'mobile'], icon: Smartphone },
	{ keywords: ['laptop', 'computer', 'pc'], icon: Laptop },
	{ keywords: ['fashion', 'clothing', 'apparel'], icon: Shirt },
	{ keywords: ['home', 'furniture', 'kitchen'], icon: House },
	{ keywords: ['book', 'books'], icon: BookOpen },
	{ keywords: ['gaming', 'game', 'console'], icon: Gamepad2 },
];

function getCategoryIcon(name?: string) {
	const normalizedName = (name || '').toLowerCase();
	const match = iconMap.find((item) => item.keywords.some((keyword) => normalizedName.includes(keyword)));
	return match?.icon ?? DEFAULT_ICON;
}

export default function CategoryList() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchCategories = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<Category[]>('http://localhost:3000/api/categories');
				if (isMounted) {
					setCategories(response.data);
				}
			} catch (error) {
				if (isMounted) {
					console.error('Failed to load categories:', error);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		void fetchCategories();

		return () => {
			isMounted = false;
		};
	}, []);

	const categoryItems = useMemo(() => categories, [categories]);

	return (
		<section className="space-y-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-slate-800">Categories</h2>
			</div>

			{isLoading ? (
				<p className="text-sm text-slate-500">Loading...</p>
			) : (
				<div className="flex gap-4 overflow-x-auto pb-2">
					{categoryItems.map((category, index) => {
						const Icon = getCategoryIcon(category.name);
						return (
							<button
								key={category.id ?? `${category.name}-${index}`}
								type="button"
								className="min-w-[220px] bg-white border border-slate-200 rounded-xl p-4 text-left shadow-sm transition-all hover:shadow-md hover:border-indigo-500"
							>
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
										<Icon className="w-5 h-5" />
									</div>
									<h3 className="font-semibold text-slate-800">{category.name || 'Unnamed category'}</h3>
								</div>
								<p className="mt-2 text-sm text-slate-500 line-clamp-2">
									{category.description || 'No description available'}
								</p>
							</button>
						);
					})}
				</div>
			)}
		</section>
	);
}
