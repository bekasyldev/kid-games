import { useState } from 'react';
import NumberOrdering from '../components/tasks/NumberOrdering';
import SentenceCompletion from '../components/tasks/SentenceCompletion';
import SyllableMatching from '../components/tasks/SyllableMatching';
import SpotDifference from '../components/tasks/SpotDifference';
import FindHiddenObjects from '../components/tasks/FindHiddenObjects';
import AnimalSounds from '../components/tasks/AnimalSounds';
import RememberDots from '../components/tasks/RememberDots';
import FindSimilarPictures from '../components/games/FindSimilarPictures';

const Tasks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('');

  const categories = [
    { id: 'thinking', name: 'Ойлау', description: 'Ойлау қабілетін дамыту тапсырмалары' },
    { id: 'attention', name: 'Зейін', description: 'Зейінді дамытуға арналған тапсырмалар' },
    { id: 'memory', name: 'Есте сақтау', description: 'Есте сақтау қабілетін дамыту' },
  ];

  const tasks = [
    // Thinking tasks
    { id: 'numbers', name: 'Сандарды өсу және кему ретімен орналастыр', category: 'thinking' },
    { id: 'sentences', name: 'Сөлемді толықтыр', category: 'thinking' },
    { id: 'syllables', name: 'Буындарды аяқта', category: 'thinking' },
    // Attention tasks
    { id: 'spot-difference', name: 'Екі суреттің айырмашылығын тап', category: 'attention' },
    { id: 'find-hidden', name: 'Суреттегі заттардың жасырынған орнын тап', category: 'attention' },
    { id: 'find-similar', name: 'Ұқсасын тап', category: 'attention' },
    // Memory tasks
    { id: 'animal-sounds', name: 'Кімнің даусы?', category: 'memory' },
    { id: 'remember-dots', name: 'Нүктенің орнын есте сақта!', category: 'memory' },
  ];

  const renderTaskContent = () => {
    switch (selectedTask) {
      case 'numbers':
        return <NumberOrdering />;
      case 'sentences':
        return <SentenceCompletion />;
      case 'syllables':
        return <SyllableMatching />;
      case 'spot-difference':
        return <SpotDifference />;
      case 'find-hidden':
        return <FindHiddenObjects />;
      case 'find-similar':
        return <FindSimilarPictures />;
      case 'animal-sounds':
        return <AnimalSounds />;
      case 'remember-dots':
        return <RememberDots />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="page-title">Тапсырмалар</h1>
      
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

      {selectedCategory && !selectedTask && (
        <>
          <button
            onClick={() => setSelectedCategory('')}
            className="mb-8 btn text-primary-600 hover:text-primary-700"
          >
            ← Артқа
          </button>
          <div className="grid grid-cols-1 gap-6">
            {tasks
              .filter((task) => task.category === selectedCategory)
              .map((task) => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task.id)}
                  className="task-card"
                >
                  <h3 className="task-title">{task.name}</h3>
                </button>
              ))}
          </div>
        </>
      )}

      {selectedTask && (
        <>
          <button
            onClick={() => setSelectedTask('')}
            className="mb-8 btn text-primary-600 hover:text-primary-700"
          >
            ← Артқа
          </button>
          {renderTaskContent()}
        </>
      )}
    </div>
  );
};

export default Tasks; 