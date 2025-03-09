import { useState } from 'react';

interface Story {
  id: number;
  image: string;
  userStory: string;
}

const WordPictureStory = () => {
  const [stories, setStories] = useState<Story[]>([
    { id: 1, image: '/images/stories/story1.jpg', userStory: '' },
    { id: 2, image: '/images/stories/story2.jpg', userStory: '' },
    { id: 3, image: '/images/stories/story3.jpg', userStory: '' },
  ]);

  const handleStoryChange = (id: number, story: string) => {
    setStories(stories.map(s => 
      s.id === id ? { ...s, userStory: story } : s
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="section-title">Көркем сурет және сөздер</h2>
        <p className="task-description">
          Мақсаты: Көру арқылы шығармашылық және тілдік қабілеттерін дамыту.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {stories.map(story => (
            <div key={story.id} className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={story.image}
                  alt={`Story ${story.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <textarea
                value={story.userStory}
                onChange={(e) => handleStoryChange(story.id, e.target.value)}
                placeholder="Суретке қарап әңгіме құрастырыңыз..."
                className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setStories(stories.map(s => ({ ...s, userStory: '' })))}
            className="btn btn-primary"
          >
            Қайтадан бастау
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordPictureStory; 