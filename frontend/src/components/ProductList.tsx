import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CategoryList from './CategoryList';

type Product = {
	id?: string;
	name?: string;
	price?: number;
	category?: string;
	image?: string;
	image_url?: string;
};

type ProductListProps = {
	roleName: string;
};

export default function ProductList({ roleName }: ProductListProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<Product[]>('http://localhost:3000/api/products');
				if (isMounted) {
					setProducts(response.data);
					setErrorMessage('');
				}
			} catch (error) {
				if (isMounted) {
					console.error('Failed to load products:', error);
					setErrorMessage('Не вдалося завантажити товари. Спробуйте ще раз.');
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		void fetchProducts();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="space-y-6">
			<div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
				<h1 className="text-2xl font-bold text-slate-800">Marketplace Dashboard</h1>
				<p className="text-slate-500 mt-2">
					Ви увійшли як <span className="font-bold text-blue-600 capitalize">{roleName}</span>
				</p>
			</div>

			<CategoryList />

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
							<div className="h-40 bg-slate-200 rounded-md" />
							<div className="h-4 bg-slate-200 rounded mt-4" />
							<div className="h-4 bg-slate-200 rounded mt-2 w-2/3" />
							<div className="h-6 bg-slate-200 rounded mt-4 w-1/3" />
						</div>
					))}
				</div>
			) : errorMessage ? (
				<div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">{errorMessage}</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product, index) => (
						<ProductCard key={product.id ?? `${product.name}-${index}`} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
