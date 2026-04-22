import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { useAuthStore } from './store/useAuthStore';
import Header from './components/Header';

function App() {
  const { currentRole } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h1 className="text-2xl font-bold text-slate-800">Робоча область</h1>
                  <p className="text-slate-500 mt-2">Ви увійшли як <span className="font-bold text-blue-600 capitalize">{currentRole.role_name}</span></p>
                </div>
              } />
              {/* Сюди ми будемо додавати маршрути для користувачів, категорій та товарів */}
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