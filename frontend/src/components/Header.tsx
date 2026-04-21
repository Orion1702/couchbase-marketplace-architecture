import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore, roles } from '../store/useAuthStore';
import { ShoppingBag, Bell, Menu, X, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { currentRole, setRole } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', show: true },
    { name: 'Користувачі', href: '/admin/users', show: currentRole.permissions.includes('user.manage') },
    { name: 'Категорії', href: '/admin/category', show: currentRole.permissions.includes('category.manage') || currentRole.role_name === 'admin' },
    { name: 'Товари', href: '/admin/product', show: currentRole.permissions.includes('product.manage') || currentRole.role_name === 'seller' },
  ];

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          
          {/* 1. Ліва частина: Мобільна кнопка та Десктопне меню */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-start">
            {/* Лого */}
            <div className="flex shrink-0 items-center gap-2 mr-8">
              <ShoppingBag className="h-8 w-auto text-indigo-500" />
              <span className="text-white font-bold hidden md:block">LeaderBoard</span>
            </div>
            
            {/* Навігація (Desktop) */}
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => item.show && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.href 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Права частина: Дзвоник та Перемикач */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-1">
              <Bell size={24} />
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white p-1 pr-3 border border-gray-700"
              >
                <img 
                  className="size-8 rounded-full border border-indigo-500" 
                  src={`https://ui-avatars.com/api/?name=${currentRole.role_name}&background=6366f1&color=fff`} 
                  alt="" 
                />
                <span className="text-gray-200 font-medium capitalize hidden sm:block">{currentRole.role_name}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isProfileOpen && (
                <div 
                  className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">Змінити роль</div>
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setRole(role.role_name);
                        setIsProfileOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        currentRole.role_name === role.role_name ? 'bg-indigo-50 font-bold text-indigo-600' : ''
                      }`}
                    >
                      {role.role_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Мобільне меню */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 border-t border-gray-700 px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => item.show && (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};