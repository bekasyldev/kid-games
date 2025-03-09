import { useState, useEffect } from 'react';

interface Picture {
  id: string;
  image: string;
  matchId: string;
  isSelected: boolean;
  isMatched: boolean;
}

const FindSimilarPictures = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of pictures (3x6 grid = 18 pictures = 9 pairs)
    const pairs: Picture[] = [];
    for (let i = 1; i <= 9; i++) {
      const matchId = `pair-${i}`;
      pairs.push(
        {
          id: `${matchId}-1`,
          image: `/images/similar-pictures/pair-${i}-1.jpg`,
          matchId,
          isSelected: false,
          isMatched: false
        },
        {
          id: `${matchId}-2`,
          image: `/images/similar-pictures/pair-${i}-2.jpg`,
          matchId,
          isSelected: false,
          isMatched: false
        }
      );
    }

    // Shuffle the array
    const shuffled = [...pairs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setPictures(shuffled);
    setSelectedPicture(null);
    setMatches([]);
    setMessage(null);
  };

  const handlePictureClick = (picture: Picture) => {
    if (picture.isMatched || picture.isSelected) return;

    const updatedPictures = pictures.map(p =>
      p.id === picture.id ? { ...p, isSelected: true } : p
    );
    setPictures(updatedPictures);

    if (!selectedPicture) {
      setSelectedPicture(picture);
    } else {
      if (selectedPicture.matchId === picture.matchId) {
        // Found a match
        setMatches([...matches, picture.matchId]);
        setPictures(updatedPictures.map(p =>
          p.matchId === picture.matchId ? { ...p, isMatched: true } : p
        ));
        setMessage({ text: 'Дұрыс!', type: 'success' });

        // Check if all pairs are matched
        if (matches.length === 8) { // 8 because we're adding the current match
          setTimeout(() => {
            setMessage({ text: 'Құттықтаймыз! Барлық ұқсас суреттерді таптыңыз!', type: 'success' });
          }, 500);
        }
      } else {
        setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
        // Hide selected pictures after a delay
        setTimeout(() => {
          setPictures(updatedPictures.map(p =>
            p.isSelected && !p.isMatched ? { ...p, isSelected: false } : p
          ));
          setMessage(null);
        }, 1000);
      }
      setSelectedPicture(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Ұқсас екі суретті тап!</h2>
        <p className="task-description">
          Мақсаты: Зейін, көру арқылы қабылдауды және салыстыру дағдыларын дамыту. Логикалық ойлау қабілетін жетілдіру.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {pictures.map(picture => (
            <button
              key={picture.id}
              onClick={() => handlePictureClick(picture)}
              disabled={picture.isMatched}
              className={`
                aspect-square rounded-lg overflow-hidden transition-all
                ${picture.isMatched ? 'ring-4 ring-green-500' : ''}
                ${picture.isSelected && !picture.isMatched ? 'ring-4 ring-primary-500' : ''}
                ${!picture.isSelected && !picture.isMatched ? 'hover:ring-4 hover:ring-primary-300' : ''}
              `}
            >
              <img
                src={picture.image}
                alt={`Picture ${picture.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
            </button>
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

        {matches.length === 9 && (
          <div className="text-center">
            <p className="text-xl font-semibold text-green-600 mb-4">
              Құттықтаймыз! Барлық ұқсас суреттерді таптыңыз!
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

export default FindSimilarPictures; 