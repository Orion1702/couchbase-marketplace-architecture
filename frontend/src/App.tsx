import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { useAuthStore } from './store/useAuthStore';
import Header from './components/Header';

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
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h1 className="text-2xl font-bold text-slate-800">Робоча область</h1>
                                    <p className="text-slate-500 mt-2">
                                        Ви увійшли як <span className="font-bold text-blue-600 capitalize">{currentRole.role_name}</span>
                                    </p>
                                </div>
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