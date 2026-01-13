import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';

/**
 * MainLayout - Layout chính cho các trang customer
 * Bao gồm: Navbar, content, BottomNav, Footer
 */
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}
