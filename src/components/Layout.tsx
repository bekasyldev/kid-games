import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
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