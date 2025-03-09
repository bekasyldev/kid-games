import { useState, useRef, useEffect } from 'react';

interface Animal {
  id: number;
  name: string;
  image: string;
  sound: string;
}

const animals: Animal[] = [
  {
    id: 1,
    name: 'Мысық',
    image: '/images/animals/cat.jpg',
    sound: '/sounds/animals/cat.wav'
  },
  {
    id: 2,
    name: 'Ит',
    image: '/images/animals/dog.jpg',
    sound: '/sounds/animals/dog.wav'
  },
  {
    id: 3,
    name: 'Сиыр',
    image: '/images/animals/cow.jpg',
    sound: '/sounds/animals/cow.wav'
  },
  {
    id: 4,
    name: 'Қой',
    image: '/images/animals/sheep.jpg',
    sound: '/sounds/animals/sheep.wav'
  }
];

const AnimalSounds = () => {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTimeLeft(5);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  };

  const initializeGame = () => {
    stopSound();
    setCurrentSound(null);
    setSelectedAnimal(null);
    setCorrectAnswers([]);
    setGameOver(false);
    
    // Pick a random animal
    const remainingAnimals = animals.filter(animal => !correctAnswers.includes(animal.id));
    if (remainingAnimals.length > 0) {
      const randomAnimal = remainingAnimals[Math.floor(Math.random() * remainingAnimals.length)];
      setCurrentSound(randomAnimal.sound);
      setIsShowingPattern(true);
      setIsPlaying(false);

      if (audioRef.current) {
        audioRef.current.src = randomAnimal.sound;
        audioRef.current.play();

        // Start countdown
        const countdownInterval = window.setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 5;
            }
            return prev - 1;
          });
        }, 1000);

        // After 5 seconds, stop showing pattern and allow selection
        timerRef.current = window.setTimeout(() => {
          stopSound();
          clearInterval(countdownInterval);
          setIsShowingPattern(false);
          setIsPlaying(true);
        }, 5000);
      }
    }
  };

  const handleAnimalClick = (animalId: number) => {
    if (!isPlaying || gameOver) return;

    setSelectedAnimal(animalId);
    const animal = animals.find(a => a.id === animalId);
    
    if (animal && animal.sound === currentSound) {
      if (!correctAnswers.includes(animalId)) {
        setCorrectAnswers([...correctAnswers, animalId]);
      }
      setGameOver(true);
      setIsPlaying(false);
    } else {
      setGameOver(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="section-title">Кімнің даусы?</h2>
        <p className="task-description">
          Мақсаты: Есту арқылы ақпаратты қабылдау және өңдеу қабілетін дамыту.
        </p>

        <div className="mb-8">
          {!isPlaying && !isShowingPattern && !gameOver && (
            <div className="text-center mb-6">
              <button onClick={initializeGame} className="btn btn-primary">
                Ойынды бастау
              </button>
            </div>
          )}

          {isShowingPattern && (
            <div className="text-center mb-4">
              <p className="text-lg text-primary-600">
                Дыбысты тыңдаңыз! ({timeLeft} секунд)
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {animals.map(animal => (
              <div
                key={animal.id}
                onClick={() => handleAnimalClick(animal.id)}
                className={`
                  aspect-square rounded-lg overflow-hidden transition-all
                  ${gameOver && animal.sound === currentSound ? 'ring-4 ring-green-500' : ''}
                  ${gameOver && selectedAnimal === animal.id && animal.sound !== currentSound ? 'ring-4 ring-red-500' : ''}
                  ${isPlaying ? 'cursor-pointer hover:ring-4 hover:ring-primary-300' : 'cursor-default'}
                `}
              >
                <div className="relative w-full h-full">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    <p className="font-medium">{animal.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gameOver && (
            <div className="mt-8 text-center">
              <p className={`text-xl font-semibold mb-4 ${selectedAnimal && animals.find(a => a.id === selectedAnimal)?.sound === currentSound ? 'text-green-600' : 'text-red-600'}`}>
                {selectedAnimal && animals.find(a => a.id === selectedAnimal)?.sound === currentSound
                  ? 'Құттықтаймыз! Дұрыс таптыңыз!'
                  : 'Қайтадан көріңіз'}
              </p>
              <button onClick={initializeGame} className="btn btn-primary">
                Қайтадан ойнау
              </button>
            </div>
          )}
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default AnimalSounds; 