import { useState } from 'react';

interface Sentence {
  id: number;
  text: string;
  answer: string;
  image: string;
}

const sentences: Sentence[] = [
  {
    id: 1,
    text: 'Көктемде ... жылы болады.',
    answer: 'күн',
    image: '/images/sun.jpg'
  },
  {
    id: 2,
    text: 'Мен мектепке ... алып келдім.',
    answer: 'кітап',
    image: '/images/notebook.jpg'
  },
  {
    id: 3,
    text: 'Күзде ... түседі.',
    answer: 'жапырақ',
    image: '/images/leaf.jpg'
  },
  {
    id: 4,
    text: '... көктемде келеді.',
    answer: 'құстар',
    image: '/images/animals/bird.jpg'
  },
  {
    id: 5,
    text: '... орманда өмір сүреді.',
    answer: 'аю',
    image: '/images/animals/bear.jpg'
  }
];

const SentenceCompletion = () => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    const correct = userAnswer.toLowerCase().trim() === sentences[currentSentence].answer.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => {
        if (currentSentence < sentences.length - 1) {
          setCurrentSentence(prev => prev + 1);
          setUserAnswer('');
          setIsCorrect(null);
          setShowHint(false);
        }
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(prev => prev + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentSentence > 0) {
      setCurrentSentence(prev => prev - 1);
      setUserAnswer('');
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Сөлемді толықтыр</h2>
        <p className="text-gray-600 mb-6">
          Мақсаты: Сөйлем құрастыру дағдыларын дамыту, сөздік қорын байыту және логикалық ойлау қабілетін жетілдіру.
        </p>

        <div className="mb-6">
          <div className="flex justify-center mb-6">
            <img
              src={sentences[currentSentence].image}
              alt="Hint"
              className="w-80 h-80 object-contain"
            />
          </div>

          <p className="text-lg text-center mb-4">
            {sentences[currentSentence].text.split('...').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="mx-2 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-600 outline-none w-32 text-center"
                  />
                )}
              </span>
            ))}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentSentence === 0}
            className="btn bg-gray-200 disabled:opacity-50"
          >
            Алдыңғы
          </button>
          <button onClick={handleCheck} className="btn btn-primary">
            Тексеру
          </button>
          <button
            onClick={handleNext}
            disabled={currentSentence === sentences.length - 1}
            className="btn bg-gray-200 disabled:opacity-50"
          >
            Келесі
          </button>
        </div>

        {isCorrect !== null && (
          <div className={`mt-4 text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Дұрыс!' : 'Қайтадан көріңіз'}
          </div>
        )}

        <div className="mt-4 text-center text-gray-500">
          {currentSentence + 1} / {sentences.length}
        </div>
      </div>
    </div>
  );
};

export default SentenceCompletion; 