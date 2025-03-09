import { useState, useEffect } from 'react';

interface Picture {
  id: string;
  image: string;
  matchId: string;
  isMatched: boolean;
}

const FindSimilarPictures = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [selectedPictures, setSelectedPictures] = useState<Picture[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of pictures (4x6 grid = 24 pictures = 12 pairs)
    const pairs: Picture[] = [];
    for (let i = 1; i <= 12; i++) {
      const matchId = `pair${i}`;
      pairs.push(
        {
          id: `${matchId}-1`,
          image: `/images/similar-pictures/pair${i}-1.jpg`,
          matchId,
          isMatched: false
        },
        {
          id: `${matchId}-2`,
          image: `/images/similar-pictures/pair${i}-2.jpg`,
          matchId,
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
    setSelectedPictures([]);
    setMessage(null);
  };

  const handlePictureClick = (picture: Picture) => {
    if (picture.isMatched) return;
    
    // If picture is already selected, deselect it
    if (selectedPictures.find(p => p.id === picture.id)) {
      setSelectedPictures(selectedPictures.filter(p => p.id !== picture.id));
      return;
    }

    const newSelected = [...selectedPictures, picture];
    setSelectedPictures(newSelected);

    // Check for match when we have 2 selected pictures
    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      
      if (first.matchId === second.matchId) {
        // Found a match
        setPictures(pictures.map(p => 
          p.matchId === first.matchId ? { ...p, isMatched: true } : p
        ));
        setMessage({ text: 'Дұрыс!', type: 'success' });
        
        // Check if all pairs are matched
        const allMatched = pictures.every(p => 
          p.isMatched || p.matchId === first.matchId
        );
        
        if (allMatched) {
          setTimeout(() => {
            setMessage({ text: 'Құттықтаймыз! Барлық ұқсас суреттерді таптыңыз!', type: 'success' });
          }, 500);
        }
      } else {
        setMessage({ text: 'Қайтадан көріңіз', type: 'error' });
      }
      
      // Clear selections after a delay
      setTimeout(() => {
        setSelectedPictures([]);
        setMessage(null);
      }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Ұқсас екі суретті тап!</h2>
        <p className="task-description">
          Мақсаты: Зейін, көру арқылы қабылдауды және салыстыру дағдыларын дамыту. Логикалық ойлау қабілетін жетілдіру.
        </p>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-8">
          {pictures.map(picture => (
            <button
              key={picture.id}
              onClick={() => handlePictureClick(picture)}
              disabled={picture.isMatched}
              className={`
                aspect-square rounded-lg overflow-hidden transition-all
                ${picture.isMatched ? 'ring-4 ring-green-500' : ''}
                ${selectedPictures.find(p => p.id === picture.id) ? 'ring-4 ring-primary-500' : ''}
                ${!selectedPictures.find(p => p.id === picture.id) && !picture.isMatched ? 'hover:ring-4 hover:ring-primary-300' : ''}
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

        <div className="text-center">
          <button onClick={initializeGame} className="btn btn-primary">
            Қайтадан ойнау
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindSimilarPictures; 