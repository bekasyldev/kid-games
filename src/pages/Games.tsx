import { useState } from 'react';
import WhoDoesWhat from '../components/games/WhoDoesWhat';
import WordPictureStory from '../components/games/WordPictureStory';
import FunPictures from '../components/games/FunPictures';
import FindSimilarPictures from '../components/games/FindSimilarPictures';
import HelpChef from '../components/games/HelpChef';
import GoodBadActions from '../components/games/GoodBadActions';
import LogicalSequences from '../components/games/LogicalSequences';
import RememberAndRepeat from '../components/games/RememberAndRepeat';
import FindLostPictures from '../components/games/FindLostPictures';
import MatchSounds from '../components/games/MatchSounds';
import MemoryGame from '../components/games/MemoryGame';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const categories = [
    { id: 'thinking', name: 'Ойлау', description: 'Ойлау қабілетін дамыту ойындары' },
    { id: 'attention', name: 'Зейін', description: 'Зейінді дамытуға арналған ойындар' },
    { id: 'memory', name: 'Есте сақтау', description: 'Есте сақтау қабілетін дамыту' },
  ];

  const games = [
    // Thinking games
    { 
      id: 'who-does-what', 
      name: 'Кім не істейді?', 
      description: 'Сөздер мен суреттерді сәйкестендір',
      category: 'thinking' 
    },
    { 
      id: 'word-picture', 
      name: 'Көркем сөздер және сурет', 
      description: 'Суреттерге қарап әңгіме құрастыр',
      category: 'thinking' 
    },
    { 
      id: 'fun-pictures', 
      name: 'Көңілді суреттер', 
      description: 'Берілген суреттерге байланысты сөйлем құра',
      category: 'thinking' 
    },
    // Attention games
    {
      id: 'find-similar-pictures',
      name: 'Ұқсас екі суретті тап',
      description: 'Әр қатардағы ұқсас екі суреттерді тап',
      category: 'attention'
    },
    {
      id: 'help-chef',
      name: 'Аспазға көмектес',
      description: 'Аспазға керек заттарды жина',
      category: 'attention'
    },
    {
      id: 'good-bad-actions',
      name: 'Теріс әрекеттер мен оң әрекеттер',
      description: 'Теріс және оң әрекеттерді ажырата білу',
      category: 'attention'
    },
    {
      id: 'logical-sequences',
      name: 'Логикалық тізбектер',
      description: 'Суреттер арасындағы байланыстарды анықта',
      category: 'attention'
    },
    // Memory games

    {
      id: 'memory-game',
      name: 'Есте сақта',
      description: 'Суреттерді есте сақтап қал',
      category: 'memory'
    },
  ];

  const renderGameContent = () => {
    switch (selectedGame) {
      case 'who-does-what':
        return <WhoDoesWhat />;
      case 'word-picture':
        return <WordPictureStory />;
      case 'fun-pictures':
        return <FunPictures />;
      case 'find-similar-pictures':
        return <FindSimilarPictures />;
      case 'help-chef':
        return <HelpChef />;
      case 'good-bad-actions':
        return <GoodBadActions />;
      case 'logical-sequences':
        return <LogicalSequences />;
      case 'remember-repeat':
        return <RememberAndRepeat />;
      case 'find-pictures':
        return <FindLostPictures />
      case 'match-sounds':
        return <MatchSounds />
      case 'memory-game':
        return <MemoryGame />
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="page-title">Ойындар</h1>
      
      {!selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="task-card text-left"
            >
              <h2 className="section-title mb-4">{category.name}</h2>
              <p className="task-description">{category.description}</p>
            </button>
          ))}
        </div>
      )}

      {selectedCategory && !selectedGame && (
        <>
          <button
            onClick={() => setSelectedCategory('')}
            className="mb-8 btn text-primary-600 hover:text-primary-700"
          >
            ← Артқа
          </button>
          <div className="grid grid-cols-1 gap-6">
            {games
              .filter((game) => game.category === selectedCategory)
              .map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className="task-card"
                >
                  <h3 className="task-title">{game.name}</h3>
                  <p className="task-description">{game.description}</p>
                </button>
              ))}
          </div>
        </>
      )}

      {selectedGame && (
        <>
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-8 btn text-primary-600 hover:text-primary-700"
          >
            ← Артқа
          </button>
          {renderGameContent()}
        </>
      )}
    </div>
  );
};

export default Games;
