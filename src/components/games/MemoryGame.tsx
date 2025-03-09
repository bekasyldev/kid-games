import { useState, useEffect } from 'react';

interface Level {
  id: string;
  name: string;
  image: string;
  showTime: number; // in seconds
  description: string;
}

const levels: Level[] = [
  {
    id: 'easy',
    name: 'Оңай',
    image: '/images/memory/easy.jpg',
    showTime: 5,
    description: '5 секунд'
  },
  {
    id: 'medium',
    name: 'Орташа',
    image: '/images/memory/medium.jpg',
    showTime: 5,
    description: '3 секунд'
  },
  {
    id: 'hard',
    name: 'Қиын',
    image: '/images/memory/hard.jpg',
    showTime: 5,
    description: '2 секунд'
  }
];

const MemoryGame = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isShowingImage, setIsShowingImage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (selectedLevel && isShowingImage) {
      setTimeLeft(selectedLevel.showTime);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsShowingImage(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedLevel, isShowingImage]);

  const handleBoxClick = (level: Level) => {
    setSelectedLevel(level);
    setIsShowingImage(true);
  };

  const handleTryAgain = () => {
    setIsShowingImage(true);
  };

  const handleBack = () => {
    setSelectedLevel(null);
    setIsShowingImage(false);
    setTimeLeft(0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Есте сақта</h2>
        <p className="task-description">
          Тапсырма: Қораптарды басып, суретке қарап, бірнеше секунд ішінде есіңе сақтап қал. Суреттегі нәрселер есіңде қалды ма?
        </p>
        <p className="task-description mb-8">
          Мақсаты: Есте сақтау қабілетін, зейінін және көру арқылы қабылдау дағдыларын дамыту.
        </p>

        {!selectedLevel ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {levels.map((level) => (
              <div key={level.id} className="flex flex-col items-center">
                <div 
                  onClick={() => handleBoxClick(level)}
                  className="w-48 h-48 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg 
                    hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer
                    flex flex-col items-center justify-center text-white"
                >
                  <span className="text-2xl font-bold mb-2">{level.name}</span>
                  <span className="text-sm opacity-75">{level.description}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-primary-600">
                {selectedLevel.name} деңгей
              </h3>
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Артқа
              </button>
            </div>

            <div className="space-y-6">
              {isShowingImage ? (
                <>
                  <div className="text-center text-2xl font-bold text-primary-600 mb-4">
                    {timeLeft} секунд қалды
                  </div>
                  <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
                    <div className="relative w-full flex justify-center items-center">
                      <img
                        src={selectedLevel.image}
                        alt="Memory Test"
                        className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-xl">Уақыт бітті! Суреттегі нәрселер есіңде қалды ма?</p>
                  <button onClick={handleTryAgain} className="btn btn-primary">
                    Қайтадан көру
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame; 