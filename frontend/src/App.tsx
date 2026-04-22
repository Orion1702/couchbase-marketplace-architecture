import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { useAuthStore } from './store/useAuthStore';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
    const { currentRole } = useAuthStore();

    // Перевіряємо, чи є користувач адміном або продавцем
    const isStaff = currentRole.role_name === 'admin' || currentRole.role_name === 'seller';

    return (
        <Router>
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Header />
                
                <div className="flex flex-1">
                    {/* Показуємо Sidebar тільки для персоналу */}
                    {isStaff && <Sidebar />}

                    {/* Якщо це персонал — займаємо весь простір (flex-1).
                      Якщо покупець — додаємо центрування (max-w-7xl mx-auto) та повну ширину (w-full).
                    */}
                    <main className={`flex-1 p-8 ${!isStaff ? 'max-w-7xl mx-auto w-full' : ''}`}>
                        <Routes>
                            <Route path="/" element={
                                <ProductList roleName={currentRole.role_name} />
                            } />
                            
                            {/* Адмінські маршрути */}
                            <Route path="/admin/users" element={<div className="p-4">Сторінка керування користувачами</div>} />
                            <Route path="/admin/category" element={<div className="p-4">Сторінка керування категоріями</div>} />
                            <Route path="/admin/product" element={<div className="p-4">Сторінка керування товарами</div>} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;