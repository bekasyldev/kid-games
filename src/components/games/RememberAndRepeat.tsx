import { useState, useEffect } from 'react';

interface MemoryItem {
  id: number;
  image: string;
  isVisible: boolean;
  isSelected: boolean;
}

const RememberAndRepeat = () => {
  const [items, setItems] = useState<MemoryItem[]>([
    { id: 1, image: '/images/memory/item1.jpg', isVisible: false, isSelected: false },
    { id: 2, image: '/images/memory/item2.jpg', isVisible: false, isSelected: false },
    { id: 3, image: '/images/memory/item3.jpg', isVisible: false, isSelected: false },
    { id: 4, image: '/images/memory/item4.jpg', isVisible: false, isSelected: false },
    { id: 5, image: '/images/memory/item5.jpg', isVisible: false, isSelected: false },
    { id: 6, image: '/images/memory/item6.jpg', isVisible: false, isSelected: false },
    { id: 7, image: '/images/memory/item7.jpg', isVisible: false, isSelected: false },
    { id: 8, image: '/images/memory/item8.jpg', isVisible: false, isSelected: false },
    { id: 9, image: '/images/memory/item9.jpg', isVisible: false, isSelected: false },
  ]);

  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const startGame = () => {
    // Randomly select 3-5 items to remember
    const numItems = Math.floor(Math.random() * 3) + 3; // 3-5 items
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, numItems);

    setItems(items.map(item => ({
      ...item,
      isVisible: selectedItems.some(s => s.id === item.id),
      isSelected: false
    })));

    setIsShowingPattern(true);
    setIsPlaying(false);
    setScore(0);
    setMessage(null);

    // Hide pattern after 5 seconds
    setTimeout(() => {
      setItems(items.map(item => ({ ...item, isVisible: false })));
      setIsShowingPattern(false);
      setIsPlaying(true);
    }, 5000);
  };

  const handleItemClick = (id: number) => {
    if (!isPlaying) return;

    const item = items.find(i => i.id === id);
    if (!item) return;

    setItems(items.map(i =>
      i.id === id ? { ...i, isSelected: true } : i
    ));

    if (item.isVisible) {
      setScore(prev => prev + 1);
      setMessage({ text: 'Дұрыс!', type: 'success' });
    } else {
      setMessage({ text: 'Қате!', type: 'error' });
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Есте сақта және қайтала</h2>
        <p className="task-description">
          Мақсаты: Есте сақтау қабілетін, зейінін және көру арқылы қабылдау дағдыларын дамыту.
        </p>

        {!isPlaying && !isShowingPattern && (
          <div className="text-center mb-8">
            <button onClick={startGame} className="btn btn-primary">
              Ойынды бастау
            </button>
          </div>
        )}

        {isShowingPattern && (
          <div className="text-center mb-4">
            <p className="text-lg text-primary-600">
              Суреттерді есте сақтаңыз! (5 секунд)
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              disabled={!isPlaying || item.isSelected}
              className={`
                aspect-square rounded-lg overflow-hidden transition-all
                ${item.isSelected ? 'ring-4 ring-primary-500' : ''}
                ${!isPlaying && !item.isVisible ? 'bg-gray-100' : ''}
                ${isPlaying ? 'hover:ring-4 hover:ring-primary-300 cursor-pointer' : ''}
              `}
            >
              {(item.isVisible || item.isSelected) && (
                <img
                  src={item.image}
                  alt={`Item ${item.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              )}
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

        {isPlaying && (
          <div className="text-center">
            <p className="text-xl font-semibold text-primary-600 mb-4">
              Дұрыс жауаптар: {score}
            </p>
          </div>
        )}

        {!isPlaying && score > 0 && (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600 mb-4">
              Ойын аяқталды! Сіз {score} сурет таптыңыз!
            </p>
            <button onClick={startGame} className="btn btn-primary">
              Қайтадан ойнау
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RememberAndRepeat; 