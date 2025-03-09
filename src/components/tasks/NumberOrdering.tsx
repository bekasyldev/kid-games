import { useState, useEffect } from 'react';

const NumberOrdering = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateNewNumbers();
  }, []);

  const generateNewNumbers = () => {
    const newNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
    // Shuffle the numbers
    for (let i = newNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newNumbers[i], newNumbers[j]] = [newNumbers[j], newNumbers[i]];
    }
    setNumbers(newNumbers);
    setIsCorrect(null);
  };

  const handleDragStart = (index: number) => {
    setIsDragging(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (isDragging === null) return;

    const newNumbers = [...numbers];
    const [draggedNumber] = newNumbers.splice(isDragging, 1);
    newNumbers.splice(targetIndex, 0, draggedNumber);
    
    setNumbers(newNumbers);
    setIsDragging(null);
  };

  const checkOrder = () => {
    const isOrderCorrect = numbers.every((num, index) => {
      if (isAscending) {
        return index === 0 || num > numbers[index - 1];
      } else {
        return index === 0 || num < numbers[index - 1];
      }
    });
    setIsCorrect(isOrderCorrect);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Сандарды {isAscending ? 'өсу' : 'кему'} ретімен орналастыр
        </h2>
        <p className="text-gray-600 mb-6">
          Мақсаты: Сандарды салыстыру, реттілікпен орналастыру дағдыларын дамыту
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setIsAscending(true)}
            className={`btn ${isAscending ? 'btn-primary' : 'bg-gray-200'}`}
          >
            Өсу реті
          </button>
          <button
            onClick={() => setIsAscending(false)}
            className={`btn ${!isAscending ? 'btn-primary' : 'bg-gray-200'}`}
          >
            Кему реті
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {numbers.map((number, index) => (
            <div
              key={number}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="w-60 h-60 flex items-center justify-center text-2xl font-bold bg-purple-100 rounded-lg cursor-move hover:bg-purple-200 transition-colors"
            >
              {number}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={checkOrder} className="btn btn-primary">
            Тексеру
          </button>
          <button onClick={generateNewNumbers} className="btn bg-gray-200">
            Жаңа сандар
          </button>
        </div>

        {isCorrect !== null && (
          <div className={`mt-4 text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Дұрыс!' : 'Қайтадан көріңіз'}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberOrdering; 