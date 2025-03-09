const Authors = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Авторлар</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Такибаева Жанар Джумабековна</h2>
          <p className="text-gray-600">
            Е.А. Бөкетов атындағы Қарағанды Университеті, Арнайы педагогика және инклюзивті білім беру кафедрасының екінші курс магистранты.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Алшынбекова Гульназия Канагатовна</h2>
          <p className="text-gray-600">
            Е.А. Бөкетов атындағы Қарағанды Университеті, Арнайы педагогика және инклюзивті білім беру кафедрасының қауымдастырылған профессоры, биология ғылымдарының кандидаты
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authors; 