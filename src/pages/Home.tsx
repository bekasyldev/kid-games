import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
      Зейінді балақай
      </h1>
      <h2 className="text-2xl text-purple-600 mb-8">
        Электрондық оқу құралы
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
      <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform h-64 flex flex-col justify-center">
          <Link to="/authors" className="h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6">Авторлар</h3>
            <p className="text-gray-600 text-lg">
              Электрондық оқу құралын жасаушылар туралы ақпарат
            </p>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform h-64 flex flex-col justify-center">
          <Link to="/about" className="h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6">Түсіндірме жазба</h3>
            <p className="text-gray-600 text-lg">
              Электрондық оқу құралының мақсаты мен міндеттері
            </p>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform h-64 flex flex-col justify-center">
          <Link to="/games" className="h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6">Ойындар</h3>
            <p className="text-gray-600 text-lg">
              Қызықты және дамытушы ойындар арқылы білім алыңыз
            </p>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform h-64 flex flex-col justify-center">
          <Link to="/tasks" className="h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6">Тапсырмалар</h3>
            <p className="text-gray-600 text-lg">
              Танымдық тапсырмалар арқылы дағдыларыңызды дамытыңыз
            </p>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Home;