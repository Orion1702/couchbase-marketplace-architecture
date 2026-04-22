import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore, roles } from '../store/useAuthStore'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
	const currentRole = useAuthStore((state) => state.currentRole)
	const setRole = useAuthStore((state) => state.setRole)
	const location = useLocation()

	// Динамічна навігація на основі дозволів
	const navigation = [
		{ name: 'Dashboard', href: '/', show: true },
		{ 
			name: 'Користувачі', 
			href: '/admin/users', 
			show: currentRole.permissions.includes('user.manage') 
		},
		{ 
			name: 'Категорії', 
			href: '/admin/category', 
			show: currentRole.permissions.includes('category.manage') || currentRole.role_name === 'admin' 
		},
		{ 
		name: 'Товари', 
		href: '/admin/product', 
		show: currentRole.permissions.includes('product.manage') || currentRole.role_name === 'seller' 
		},
	]

	return (
		<Disclosure
			as="nav"
			className="relative bg-gray-800 shadow-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
		>
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="relative flex h-16 items-center justify-between gap-4">
			{/* Mobile menu button*/}
				<div className=" inset-y-0 left-0 flex items-center sm:!hidden">
					<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:!hidden">
						<span className="absolute -inset-0.5" />
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
						<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
					</DisclosureButton>
				</div>
				<div className="pointer-events-none inset-y-0 left-1/2 flex items-center sm:pointer-events-auto sm:static sm:translate-x-0">
					<span className="text-sm font-semibold text-white">Marketplace</span>
				</div>
				<div className="flex flex-1 items-center justify-center gap-4 sm:ml-6 sm:items-stretch sm:justify-start sm:gap-6">
					<div className="hidden sm:block">
					<div className="flex space-x-4">
						{navigation.map((item) => item.show && (
						<Link
							key={item.name}
							to={item.href}
							className={classNames(
							location.pathname === item.href 
								? 'bg-gray-900 text-white' 
								: 'text-gray-300 hover:bg-white/5 hover:text-white',
							'rounded-md px-3 py-2 text-sm font-medium transition-colors',
							)}
						>
							{item.name}
						</Link>
						))}
					</div>
					</div>
				</div>

				<div className="flex items-center gap-3 pr-2 sm:ml-6 sm:pr-0">
					<button
					type="button"
					className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none"
					>
				<ShoppingBagIcon aria-hidden="true" className="size-6" />
					</button>

					{/* Випадаюче меню профілю / ролей */}
					<Menu as="div" className="relative ml-3">
					<div>
						<MenuButton className="relative flex items-center gap-2 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border border-white/10 p-0.5 pr-2">
						<img
							alt="Role avatar"
							src={`https://ui-avatars.com/api/?name=${currentRole.role_name}&background=6366f1&color=fff`}
							className="size-8 rounded-full"
						/>
						<span className="text-gray-300 capitalize text-xs font-semibold hidden md:block">
							{currentRole.role_name}
						</span>
						</MenuButton>
					</div>

					<MenuItems
						transition
						className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-2xl ring-1 ring-white/10 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
					>
						<div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
						Змінити роль
						</div>
						{roles.map((role) => (
						<MenuItem key={role.id}>
							<button
							onClick={() => setRole(role.role_name)}
							className={classNames(
								currentRole.role_name === role.role_name 
								? 'bg-white/10 text-white font-bold' 
								: 'text-gray-300 hover:bg-white/5',
								'block w-full text-left px-4 py-2 text-sm transition-colors'
							)}
							>
							Як {role.role_name}
							</button>
						</MenuItem>
						))}
					</MenuItems>
					</Menu>
				</div>
			</div>
		</div>

		{/* Мобільна панель */}
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3 bg-gray-800">
					{navigation.map((item) => item.show && (
						<DisclosureButton
							key={item.name}
							as={Link}
							to={item.href}
							className={classNames(
								location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block rounded-md px-3 py-2 text-base font-medium'
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}