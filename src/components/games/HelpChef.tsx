import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  image: string;
  isNeeded: boolean;
  isSelected: boolean;
}

const HelpChef = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Сәбіз', image: '/images/chef/carrot.jpg', isNeeded: true, isSelected: false },
    { id: 2, name: 'Картоп', image: '/images/chef/potatoes.jpg', isNeeded: true, isSelected: false },
    { id: 3, name: 'Қырыққабат', image: '/images/chef/cabbage.jpg', isNeeded: true, isSelected: false },
    { id: 4, name: 'Шалқан', image: '/images/chef/radish.jpg', isNeeded: true, isSelected: false },
    { id: 5, name: 'Кастрөл', image: '/images/chef/pot.jpg', isNeeded: true, isSelected: false },
    { id: 6, name: 'Тұз', image: '/images/chef/salt.jpg', isNeeded: true, isSelected: false },
    { id: 7, name: 'Су', image: '/images/chef/water.jpg', isNeeded: true, isSelected: false },
    { id: 8, name: 'Сұлы', image: '/images/chef/oats.jpg', isNeeded: true, isSelected: false },
    { id: 9, name: 'Глобус', image: '/images/chef/globus.jpg', isNeeded: false, isSelected: false },
    { id: 10, name: 'Сөмке', image: '/images/chef/bag.jpg', isNeeded: false, isSelected: false },
    { id: 11, name: 'Дүрбі', image: '/images/chef/binoculars.jpg', isNeeded: false, isSelected: false },
    { id: 12, name: 'Бояу', image: '/images/chef/watercolor.jpg', isNeeded: false, isSelected: false },
    { id: 13, name: 'Бұранда', image: '/images/chef/screw.jpg', isNeeded: false, isSelected: false },
  ]);

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleItemClick = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    ));
  };

  const checkAnswers = () => {
    const allCorrect = items.every(item => item.isSelected === item.isNeeded);
    if (allCorrect) {
      setMessage({ text: 'Жарайсың! Барлық керекті заттарды таптың!', type: 'success' });
    } else {
      setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
    }
  };

  const resetGame = () => {
    setItems(items.map(item => ({ ...item, isSelected: false })));
    setMessage(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Аспазға көмектес</h2>
        <p className="task-description">
          Мақсаты: Заттар мен ұғымдарды ажырата білу қабілетін дамыту. Күнделікті өмірге деген түсінігін арттырып, танымдық қабілеттерді жақсарту.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <div className="aspect-square bg-primary-100 rounded-lg p-4 flex items-center justify-center">
            <img
              src="/images/professions/chef.jpg"
              alt="Аспаз"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                aspect-square rounded-lg p-4 transition-all relative
                ${item.isSelected ? 'ring-4 ring-primary-500 bg-primary-50' : 'bg-gray-100 hover:bg-gray-200'}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-between">
                <div className="aspect-square w-full bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <p className="text-center font-medium">{item.name}</p>
              </div>
            </button>
          ))}
        </div>

        {message && (
          <div
            className={`text-center p-4 rounded-lg mb-6 ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button onClick={checkAnswers} className="btn btn-primary">
            Тексеру
          </button>
          <button onClick={resetGame} className="btn bg-gray-100">
            Қайтадан бастау
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpChef; 