import { useState, useEffect } from 'react';

interface SequenceItem {
  id: number;
  image: string;
  category: 'weather' | 'seasons' | 'animals' | 'space';
  isPlaced: boolean;
}

const categories = [
  { id: 'weather', name: 'Ауа райы' },
  { id: 'seasons', name: 'Жыл мезгілдері' },
  { id: 'animals', name: 'Үй жануарлары' },
  { id: 'space', name: 'Аспан әлемі' },
];

const LogicalSequences = () => {
  const [items, setItems] = useState<SequenceItem[]>([
    // Weather sequence
    { id: 1, image: '/images/sequences/weather1.jpg', category: 'weather', isPlaced: false },
    { id: 2, image: '/images/sequences/weather2.jpg', category: 'weather', isPlaced: false },
    { id: 3, image: '/images/sequences/weather3.jpg', category: 'weather', isPlaced: false },
    { id: 4, image: '/images/sequences/weather4.jpg', category: 'weather', isPlaced: false },
    // Seasons sequence
    { id: 5, image: '/images/sequences/season1.jpg', category: 'seasons', isPlaced: false },
    { id: 6, image: '/images/sequences/season2.jpg', category: 'seasons', isPlaced: false },
    { id: 7, image: '/images/sequences/season3.jpg', category: 'seasons', isPlaced: false },
    { id: 8, image: '/images/sequences/season4.jpg', category: 'seasons', isPlaced: false },
    // Animals sequence
    { id: 9, image: '/images/sequences/animal1.jpg', category: 'animals', isPlaced: false },
    { id: 10, image: '/images/sequences/animal2.jpg', category: 'animals', isPlaced: false },
    { id: 11, image: '/images/sequences/animal3.jpg', category: 'animals', isPlaced: false },
    { id: 12, image: '/images/sequences/animal4.jpg', category: 'animals', isPlaced: false },
    // Space sequence
    { id: 13, image: '/images/sequences/space1.jpg', category: 'space', isPlaced: false },
    { id: 14, image: '/images/sequences/space2.jpg', category: 'space', isPlaced: false },
    { id: 15, image: '/images/sequences/space3.jpg', category: 'space', isPlaced: false },
    { id: 16, image: '/images/sequences/space4.jpg', category: 'space', isPlaced: false },
  ]);

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [sequences, setSequences] = useState<{ [key: string]: number[] }>({
    weather: [],
    seasons: [],
    animals: [],
    space: [],
  });

  useEffect(() => {
    shuffleItems();
  }, []);

  const shuffleItems = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled);
  };

  const handleDragStart = (e: React.DragEvent, item: SequenceItem) => {
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, category: string, position: number) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    const item = items.find(i => i.id === itemId);
    
    if (!item || item.isPlaced) return;

    const isCorrectCategory = item.category === category;
    const categoryItems = sequences[category];

    if (isCorrectCategory && categoryItems.length < 4) {
      setItems(items.map(i =>
        i.id === itemId ? { ...i, isPlaced: true } : i
      ));
      setSequences({
        ...sequences,
        [category]: [...categoryItems, itemId]
      });
      setMessage({ text: 'Дұрыс!', type: 'success' });

      // Check if category is complete
      if (categoryItems.length === 3) {
        setTimeout(() => {
          setMessage({ text: `${categories.find(c => c.id === category)?.name} тізбегі толық!`, type: 'success' });
        }, 500);
      }

      // Check if all categories are complete
      const updatedSequences = {
        ...sequences,
        [category]: [...categoryItems, itemId]
      };
      const allComplete = Object.values(updatedSequences).every(seq => seq.length === 4);
      if (allComplete) {
        setTimeout(() => {
          setMessage({ text: 'Құттықтаймыз! Барлық тізбектер толық!', type: 'success' });
        }, 1000);
      }
    } else if (!isCorrectCategory) {
      setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
      setTimeout(() => setMessage(null), 1000);
    }
  };

  const resetGame = () => {
    setItems(items.map(item => ({ ...item, isPlaced: false })));
    setSequences({
      weather: [],
      seasons: [],
      animals: [],
      space: [],
    });
    setMessage(null);
    shuffleItems();
  };

  const unplacedItems = items.filter(item => !item.isPlaced);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Логикалық тізбектер</h2>
        <p className="task-description">
          Мақсаты: Логикалық ойлауды жақсарту, анализ және синтез жасауға үйрету.
        </p>

        <div className="space-y-8 mb-8">
          {categories.map(category => (
            <div key={category.id} className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-700">{category.name}</h3>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(position => {
                  const placedItemId = sequences[category.id][position - 1];
                  const placedItem = items.find(item => item.id === placedItemId);

                  return (
                    <div
                      key={position}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, category.id, position)}
                      className={`
                        aspect-square rounded-lg border-2 border-dashed
                        ${placedItem ? 'border-green-500' : 'border-gray-300'}
                        flex items-center justify-center
                      `}
                    >
                      {placedItem ? (
                        <img
                          src={placedItem.image}
                          alt={`${category.name} ${position}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400">{position}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-8">
          {unplacedItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="aspect-square bg-gray-100 rounded-lg p-2 cursor-move hover:bg-gray-200 transition-colors"
            >
              <img
                src={item.image}
                alt={`Item ${item.id}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
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

        <div className="text-center">
          <button onClick={resetGame} className="btn btn-primary">
            Қайтадан бастау
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogicalSequences; 