import { Link
  
 } from "react-router-dom";
const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Зейінді балақай
      </h1>
      <h2 className="text-2xl text-purple-600 mb-8">
        Электрондық оқу құралы
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
          <Link to="/games">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">Ойындар</h3>
          <p className="text-gray-600">
            Қызықты және дамытушы ойындар арқылы білім алыңыз
          </p>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
        <Link to="/tasks">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">Тапсырмалар</h3>
          <p className="text-gray-600">
            Танымдық тапсырмалар арқылы дағдыларыңызды дамытыңыз
          </p>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Home; 