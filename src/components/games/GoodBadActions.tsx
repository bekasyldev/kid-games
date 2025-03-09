import { useState, useEffect } from 'react';

interface Action {
  id: number;
  image: string;
  isGood: boolean;
  basket: 'good' | 'bad' | null;
}

const initialActions: Action[] = [
  { id: 1, image: '/images/actions/good-1.jpg', isGood: true, basket: null },
  { id: 2, image: '/images/actions/good-2.jpg', isGood: true, basket: null },
  { id: 3, image: '/images/actions/good-3.jpg', isGood: true, basket: null },
  { id: 4, image: '/images/actions/good-4.jpg', isGood: true, basket: null },
  { id: 5, image: '/images/actions/good-5.jpg', isGood: true, basket: null },
  { id: 6, image: '/images/actions/good-6.jpg', isGood: true, basket: null },
  { id: 7, image: '/images/actions/bad-1.jpg', isGood: false, basket: null },
  { id: 8, image: '/images/actions/bad-2.jpg', isGood: false, basket: null },
  { id: 9, image: '/images/actions/bad-3.jpg', isGood: false, basket: null },
];

const GoodBadActions = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setActions(shuffleArray(initialActions));
  }, []);

  const handleActionDrop = (actionId: number, basket: 'good' | 'bad') => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    const isCorrect = (basket === 'good' && action.isGood) || (basket === 'bad' && !action.isGood);
    
    setActions(actions.map(a =>
      a.id === actionId ? { ...a, basket } : a
    ));

    if (isCorrect) {
      setMessage({ text: 'Дұрыс!', type: 'success' });
      
      // Check if all actions are correctly placed
      const updatedActions = actions.map(a =>
        a.id === actionId ? { ...a, basket } : a
      );
      
      const allPlaced = updatedActions.every(a => a.basket !== null);
      const allCorrect = updatedActions.every(a => 
        (a.basket === 'good' && a.isGood) || (a.basket === 'bad' && !a.isGood)
      );
      
      if (allPlaced && allCorrect) {
        setTimeout(() => {
          setMessage({ text: 'Барлығы дұрыс! Жарайсың!', type: 'success' });
        }, 500);
      }
    } else {
      setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
      setTimeout(() => {
        setActions(actions.map(a =>
          a.id === actionId ? { ...a, basket: null } : a
        ));
        setMessage(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setActions(shuffleArray(initialActions));
    setMessage(null);
  };

  const handleDragStart = (e: React.DragEvent, action: Action) => {
    e.dataTransfer.setData('actionId', action.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, basket: 'good' | 'bad') => {
    e.preventDefault();
    const actionId = parseInt(e.dataTransfer.getData('actionId'));
    handleActionDrop(actionId, basket);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Теріс әрекеттер мен оң әрекеттер</h2>
        <p className="task-description">
          Мақсаты: Теріс (жағымсыз) және оң (жағымды) әрекеттерді ажырата білуге үйрету.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Good Actions Basket */}
          <div className="flex flex-col items-center">
            <div className="text-center text-green-700 font-semibold mb-4 text-xl">
              Жақсы әрекеттер
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'good')}
              className="relative w-64 h-48 flex flex-col items-center"
            >
              <img
                src="/images/good-backets.jpg"
                alt="Good Actions Basket"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 flex flex-wrap gap-2 justify-center items-center">
                {actions
                  .filter(a => a.basket === 'good')
                  .map(action => (
                    <div key={action.id} className="w-16 h-16">
                      <img
                        src={action.image}
                        alt={`Action ${action.id}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Bad Actions Basket */}
          <div className="flex flex-col items-center">
            <div className="text-center text-red-700 font-semibold mb-4 text-xl">
              Жаман әрекеттер
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'bad')}
              className="relative w-64 h-48 flex flex-col items-center"
            >
              <img
                src="/images/bad-backets.jpg"
                alt="Bad Actions Basket"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 flex flex-wrap gap-2 justify-center items-center">
                {actions
                  .filter(a => a.basket === 'bad')
                  .map(action => (
                    <div key={action.id} className="w-16 h-16">
                      <img
                        src={action.image}
                        alt={`Action ${action.id}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Unplaced Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {actions
            .filter(a => !a.basket)
            .map(action => (
              <div
                key={action.id}
                draggable
                onDragStart={(e) => handleDragStart(e, action)}
                className="aspect-square bg-white rounded-lg p-2 cursor-move hover:scale-105 transition-transform shadow-md hover:shadow-lg"
              >
                <img
                  src={action.image}
                  alt={`Action ${action.id}`}
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

export default GoodBadActions; 