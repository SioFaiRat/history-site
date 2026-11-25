// Клиент для архива «Память народа» / «Подвиг народа».
// ВНИМАНИЕ: официального публичного API нет; интеграция идёт через HTML-поиск
// сайтов pamyat-naroda.ru / podvignaroda.ru и требует собственного прокси (CORS).
// Интерфейс функций стабилен — верстальщик может работать с mock-данными.

const BASE_PAMYAT = 'https://pamyat-naroda.ru'; // TODO: через свой /api-proxy
const BASE_PODVIG = 'https://podvignaroda.ru';

/**
 * Поиск наградных документов по фамилии/городу боёв.
 * @param {object} params { surname, city, yearFrom, yearTo }
 * @returns {Promise<Array>} список найденных документов (mock, пока API не подключён)
 */
export async function searchAwardDocuments(params) {
  // TODO: реализовать fetch через прокси, например:
  // const res = await fetch(`/api-proxy/podvignaroda/filter?tField=fio&tValue=${params.surname}`);
  console.warn('podvignaroda API ещё не подключён, возвращены mock-данные', params);
  return [];
}

/**
 * Поиск безвозвратных потерь через ОБД «Мемориал».
 */
export async function searchMemorialLosses(params) {
  // TODO: obd-memorial.ru / memory-museum.ru — аналогично через прокси
  console.warn('OBD Memorial API ещё не подключён', params);
  return [];
}

export const SOURCES = {
  pamyatNaroda: BASE_PAMYAT,
  podvigNaroda: BASE_PODVIG,
  obdMemorial: 'https://www.obd-memorial.ru',
  rosarkhiv: 'https://www.rosarkh.ru',
};
