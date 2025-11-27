import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

// Гостевые страницы
import HomePage from '../pages/HomePage/HomePage';
import AnimalsPage from '../pages/AnimalsPage/AnimalsPage';
import AnimalDetailsPage from '../pages/AnimalDetailsPage/AnimalDetailsPage';
import TariffsPage from '../pages/TariffsPage/TariffsPage';
import LoginPage from '../pages/LoginPage/LoginPage';

// Админ страницы
import AdminPage from '../pages/admin/AdminPage';
import AdminAnimalsPage from '../pages/admin/Admin.Animals/AnimalsPage';
import AdminMainPagePage from '../pages/admin/Admin.MainPage/MainPage';
import AdminTariffsPage from '../pages/admin/Admin.Tariffs/TariffsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="animals/:id" element={<AnimalDetailsPage />} />
          <Route path="tariffs" element={<TariffsPage />} />
          <Route path="login" element={<LoginPage />} />
          
          {/* Админ маршруты */}
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/animals" element={<AdminAnimalsPage />} />
          <Route path="admin/main-page" element={<AdminMainPagePage />} />
          <Route path="admin/tariffs" element={<AdminTariffsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




