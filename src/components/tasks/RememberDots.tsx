import { useState } from 'react';

interface Cell {
  id: number;
  hasDot: boolean;
  selected: boolean;
}

const RememberDots = () => {
  const [cells, setCells] = useState<Cell[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    // Create 6 cells (2x3 grid)
    const newCells = Array.from({ length: 9 }, (_, index) => ({
      id: index,
      hasDot: false,
      selected: false,
    }));

    // Randomly place 3 dots
    let dotsPlaced = 0;
    while (dotsPlaced < 3) {
      const randomIndex = Math.floor(Math.random() * 6);
      if (!newCells[randomIndex].hasDot) {
        newCells[randomIndex].hasDot = true;
        dotsPlaced++;
      }
    }

    setCells(newCells);
    setIsShowingPattern(true);
    setIsPlaying(false);
    setGameOver(false);

    // Hide pattern after 7 seconds
    setTimeout(() => {
      setIsShowingPattern(false);
      setIsPlaying(true);
      setCells(cells => cells.map(cell => ({ ...cell, selected: false })));
    }, 5000);
  };

  const handleCellClick = (id: number) => {
    if (!isPlaying || gameOver) return;

    setCells(cells.map(cell =>
      cell.id === id ? { ...cell, selected: true } : cell
    ));

    const cell = cells.find(c => c.id === id);
    if (cell) {
      if (cell.hasDot) {
        setScore(prev => prev + 1);
        if (score + 1 === cells.filter(c => c.hasDot).length) {
          setGameOver(true);
          setIsPlaying(false);
        }
      } else {
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="section-title">Нүктенің орнын есте сақта!</h2>
        <p className="task-description">
          Мақсаты: Кеңістікті есте сақтау, зейінді шоғырландыру және визуалды қабылдауды дамытуға бағытталған.
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
                Нүктелердің орнын есте сақтаңыз! (5 секунд)
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {cells.map(cell => (
              <button
                key={cell.id}
                onClick={() => handleCellClick(cell.id)}
                disabled={!isPlaying || cell.selected}
                className={`
                  aspect-square rounded-lg border-2 transition-all
                  ${isShowingPattern && cell.hasDot ? 'bg-primary-500' : ''}
                  ${!isShowingPattern && cell.selected && cell.hasDot ? 'bg-green-500' : ''}
                  ${!isShowingPattern && cell.selected && !cell.hasDot ? 'bg-red-500' : ''}
                  ${!cell.selected ? 'hover:border-primary-500' : ''}
                  ${isPlaying ? 'cursor-pointer' : 'cursor-default'}
                `}
              />
            ))}
          </div>

          {gameOver && (
            <div className="mt-8 text-center">
              <p className={`text-xl font-semibold mb-4 ${score === 3 ? 'text-green-600' : 'text-red-600'}`}>
                {score === 3 
                  ? 'Құттықтаймыз! Барлық нүктелерді дұрыс таптыңыз!'
                  : 'Қайтадан көріңіз'}
              </p>
              <button onClick={initializeGame} className="btn btn-primary">
                Қайтадан ойнау
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RememberDots; 