type Product = {
	id?: string;
	name?: string;
	price?: number;
	category?: string;
	image?: string;
	image_url?: string;
};

type ProductCardProps = {
	product: Product;
};

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image';

export default function ProductCard({ product }: ProductCardProps) {
	const imageSrc = product.image || product.image_url || FALLBACK_IMAGE;
	const name = product.name || 'Unnamed product';
	const category = product.category || 'Uncategorized';
	const priceLabel = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Price unavailable';

	return (
		<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
			<img
				src={imageSrc}
				alt={name}
				className="w-full h-44 object-cover bg-slate-100"
				onError={(event) => {
					event.currentTarget.src = FALLBACK_IMAGE;
				}}
			/>
			<div className="p-4">
				<h3 className="font-semibold text-slate-800 line-clamp-2 min-h-[3rem]">{name}</h3>
				<p className="text-sm text-slate-500 mt-1">{category}</p>
				<p className="text-lg font-bold text-blue-700 mt-3">{priceLabel}</p>
			</div>
		</div>
	);
}
