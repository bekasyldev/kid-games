import { useState, useEffect } from 'react';

interface Profession {
  id: number;
  name: string;
  action: string;
  image: string;
}

const professions: Profession[] = [
  {
    id: 1,
    name: 'Құрылысшы',
    action: 'Үй салады',
    image: '/images/professions/builder.jpg'
  },
  {
    id: 2,
    name: 'Сәулетші',
    action: 'Жаңа ғимараттың жобасын жасайды',
    image: '/images/professions/architect.jpg'
  },
  {
    id: 3,
    name: 'Дәрігер',
    action: 'Бала емдейді',
    image: '/images/professions/doctor.jpg'
  },
  {
    id: 4,
    name: 'Спортшы',
    action: 'Жарысқа қатысады',
    image: '/images/professions/runner.jpg'
  },
  {
    id: 5,
    name: 'Аспаз',
    action: 'Ас дайындайды',
    image: '/images/professions/chef.jpg'
  },
  {
    id: 6,
    name: 'Мұғалім',
    action: 'Сабақ береді',
    image: '/images/professions/teacher.jpg'
  }
];

const WhoDoesWhat = () => {
  const [shuffledProfessions, setShuffledProfessions] = useState<Profession[]>([]);
  const [shuffledActions, setShuffledActions] = useState<(Profession & { matched: boolean })[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    setShuffledProfessions(shuffleArray(professions));
    setShuffledActions(shuffleArray(professions).map(p => ({ ...p, matched: false })));
    setSelectedProfession(null);
    setSelectedAction(null);
    setMatches([]);
    setMessage(null);
  };

  const handleProfessionClick = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedProfession(selectedProfession === id ? null : id);
    setMessage(null);
  };

  const handleActionClick = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedAction(selectedAction === id ? null : id);
    setMessage(null);
  };

  useEffect(() => {
    if (selectedProfession !== null && selectedAction !== null) {
      if (selectedProfession === selectedAction) {
        setMatches(prev => [...prev, selectedProfession]);
        setMessage({ text: 'Дұрыс!', type: 'success' });
      } else {
        setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
      }

      setTimeout(() => {
        setSelectedProfession(null);
        setSelectedAction(null);
      }, 1000);
    }
  }, [selectedProfession, selectedAction]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Кім не істейді?</h2>
        <p className="task-description">
          Мақсаты: Жаңа сөздерді үйреніп, олардың мағынасын түсіну. Баланың белсенді оқуға қызығушылығын арттыру.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="task-title mb-4">Мамандықтар</h3>
            <div className="grid grid-cols-2 gap-4">
              {shuffledProfessions.map(profession => (
                <button
                  key={profession.id}
                  onClick={() => handleProfessionClick(profession.id)}
                  disabled={matches.includes(profession.id)}
                  className={`
                    aspect-square rounded-lg p-4 transition-all relative
                    ${matches.includes(profession.id)
                      ? 'bg-green-100 cursor-default'
                      : selectedProfession === profession.id
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                    }
                  `}
                >
                  <div className="w-full h-full flex flex-col items-center justify-between">
                    <div className="aspect-square w-full bg-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={profession.image}
                        alt={profession.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <p className="text-center font-medium">{profession.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="task-title mb-4">Әрекеттер</h3>
            <div className="grid grid-cols-1 gap-4">
              {shuffledActions.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  disabled={matches.includes(action.id)}
                  className={`
                    p-4 rounded-lg transition-all
                    ${matches.includes(action.id)
                      ? 'bg-green-100 cursor-default'
                      : selectedAction === action.id
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                    }
                  `}
                >
                  <p className="text-lg">{action.action}</p>
                </button>
              ))}
            </div>
          </div>
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

        {matches.length === professions.length && (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600 mb-4">
              Құттықтаймыз! Барлық сәйкестіктерді таптыңыз!
            </p>
            <button onClick={initializeGame} className="btn btn-primary">
              Қайтадан ойнау
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoDoesWhat; 