import { useState } from 'react';

interface Picture {
  id: number;
  image: string;
  userSentence: string;
}

const FunPictures = () => {
  const [pictures, setPictures] = useState<Picture[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      image: `/images/fun-pictures/${i + 1}.jpg`,
      userSentence: ''
    }))
  );

  const handleSentenceChange = (id: number, sentence: string) => {
    setPictures(pictures.map(p => 
      p.id === id ? { ...p, userSentence: sentence } : p
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Көңілді суреттер</h2>
        <p className="task-description">
          Мақсаты: Сөйлеу, ойлау және қиялдау дағдыларын дамыту. Сөздік қорын байыту.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {pictures.map(picture => (
            <div key={picture.id} className="space-y-3">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={picture.image}
                  alt={`Picture ${picture.id}`}
                  className="w-full h-full object-cover "
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <input
                type="text"
                value={picture.userSentence}
                onChange={(e) => handleSentenceChange(picture.id, e.target.value)}
                placeholder="Сөйлем құрастырыңыз..."
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setPictures(pictures.map(p => ({ ...p, userSentence: '' })))}
            className="btn btn-primary"
          >
            Қайтадан бастау
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunPictures; 