import { useState, useEffect } from 'react';

interface Syllable {
  id: string;
  text: string;
  isFirst: boolean;
  pairId: string;
}

interface SyllablePair {
  id: string;
  first: string;
  second: string;
  word: string;
}

interface Match {
  pairId: string;
  firstSyllableId: string;
  secondSyllableId: string;
  word: string;
}

const correctPairs: SyllablePair[] = [
  { id: 'pair1', first: 'А', second: 'ТА', word: 'АТА' },
  { id: 'pair2', first: 'АЛ', second: 'МА', word: 'АЛМА' },
  { id: 'pair3', first: 'БА', second: 'ЛА', word: 'БАЛА' },
  { id: 'pair4', first: 'А', second: 'НА', word: 'АНА' },
  { id: 'pair5', first: 'БО', second: 'ТА', word: 'БОТА' },
  { id: 'pair6', first: 'ҚА', second: 'ЛА', word: 'ҚАЛА' },
];

const SyllableMatching = () => {
  const [firstSyllables, setFirstSyllables] = useState<Syllable[]>([]);
  const [secondSyllables, setSecondSyllables] = useState<Syllable[]>([]);
  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const first = correctPairs.map(pair => ({
      id: pair.id + '-first',
      text: pair.first,
      isFirst: true,
      pairId: pair.id
    }));
    const second = correctPairs.map(pair => ({
      id: pair.id + '-second',
      text: pair.second,
      isFirst: false,
      pairId: pair.id
    }));

    // Shuffle both arrays
    for (let i = first.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [first[i], first[j]] = [first[j], first[i]];
    }
    for (let i = second.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [second[i], second[j]] = [second[j], second[i]];
    }

    setFirstSyllables(first);
    setSecondSyllables(second);
    setMatches([]);
    setMessage(null);
  };

  const handleSyllableClick = (syllable: Syllable) => {
    if (syllable.isFirst) {
      setSelectedFirst(selectedFirst === syllable.id ? null : syllable.id);
      setMessage(null);
    } else {
      setSelectedSecond(selectedSecond === syllable.id ? null : syllable.id);
      setMessage(null);
    }
  };

  useEffect(() => {
    if (selectedFirst && selectedSecond) {
      const firstSyllable = firstSyllables.find(s => s.id === selectedFirst);
      const secondSyllable = secondSyllables.find(s => s.id === selectedSecond);
      
      if (firstSyllable && secondSyllable) {
        const pair = correctPairs.find(p => p.id === firstSyllable.pairId && p.id === secondSyllable.pairId);

        if (pair) {
          if (!matches.some(m => m.firstSyllableId === selectedFirst || m.secondSyllableId === selectedSecond)) {
            const newMatch: Match = {
              pairId: pair.id,
              firstSyllableId: selectedFirst,
              secondSyllableId: selectedSecond,
              word: pair.word
            };
            setMatches(prev => [...prev, newMatch]);
            setMessage({ text: 'Дұрыс!', type: 'success' });
          }
        } else {
          setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
        }

        setTimeout(() => {
          setSelectedFirst(null);
          setSelectedSecond(null);
        }, 1000);
      }
    }
  }, [selectedFirst, selectedSecond, matches, firstSyllables, secondSyllables]);

  const isMatched = (syllable: Syllable) => {
    return matches.some(match => 
      syllable.isFirst 
        ? match.firstSyllableId === syllable.id
        : match.secondSyllableId === syllable.id
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Буындарды аяқта</h2>
        <p className="text-gray-600 mb-6">
          Мақсаты: жазу және оқу дағдыларын дамыту
        </p>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-4">Бірінші буын</h3>
            <div className="space-y-2">
              {firstSyllables.map(syllable => (
                <button
                  key={syllable.id}
                  onClick={() => handleSyllableClick(syllable)}
                  className={`w-full p-3 rounded-lg transition-colors ${
                    selectedFirst === syllable.id
                      ? 'bg-purple-600 text-white'
                      : isMatched(syllable)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  }`}
                  disabled={isMatched(syllable)}
                >
                  {syllable.text}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-4">Екінші буын</h3>
            <div className="space-y-2">
              {secondSyllables.map(syllable => (
                <button
                  key={syllable.id}
                  onClick={() => handleSyllableClick(syllable)}
                  className={`w-full p-3 rounded-lg transition-colors ${
                    selectedSecond === syllable.id
                      ? 'bg-purple-600 text-white'
                      : isMatched(syllable)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  }`}
                  disabled={isMatched(syllable)}
                >
                  {syllable.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`text-center p-2 rounded-lg ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-4">Құрастырылған сөздер:</h3>
            <div className="flex flex-wrap gap-2">
              {matches.map(match => (
                <div
                  key={match.pairId}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                >
                  {match.word}
                </div>
              ))}
            </div>
          </div>
        )}

        {matches.length === correctPairs.length && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold mb-4">
              Құттықтаймыз! Барлық сөздерді дұрыс құрастырдыңыз!
            </p>
            <button
              onClick={initializeGame}
              className="btn btn-primary"
            >
              Қайтадан ойнау
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllableMatching; 