import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">Зейінді балақай</Link>
            <nav className="space-x-6">
              <Link to="/authors" className="text-gray-600 hover:text-purple-600 transition-colors">Авторлар</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">Түсіндірме жазба</Link>
              <Link to="/games" className="text-gray-600 hover:text-purple-600 transition-colors">Ойындар</Link>
              <Link to="/tasks" className="text-gray-600 hover:text-purple-600 transition-colors">Тапсырмалар</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 Зейінді балақай - Электрондық оқу құралы</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Layout; 