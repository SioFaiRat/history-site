const CITY_WIKIDATA_IDS = {
  moscow:      'Q649',    // Москва
  leningrad:   'Q656',    // Санкт-Петербург (Ленинград)
  volgograd:   'Q914',    // Волгоград (Сталинград)
  brest:       'Q140147', // Брест — ИСПРАВЛЕНО (было Q130338, это ошибка)
  kiev:        'Q1899',   // Киев
  odessa:      'Q1874',   // Одесса
  sevastopol:  'Q7525',   // Севастополь
  minsk:       'Q2280',   // Минск
  kerch:       'Q157065', // Керчь
  novorossiysk:'Q15760',  // Новороссийск
  tula:        'Q2770',   // Тула
  murmansk:    'Q1763',   // Мурманск
  smolensk:    'Q2337',   // Смоленск
};

export async function fetchHeroesFromWikidata(cityId) {
  const qId = CITY_WIKIDATA_IDS[cityId];
  if (!qId) {
    console.warn(`Wikidata ID для города ${cityId} не найден`);
    return [];
  }

  // SPARQL-запрос: найти людей, получивших звание "Герой Советского Союза" (Q188929), 
  // место рождения которых находится в административных границах этого города (P131*)
  const sparqlQuery = `
    SELECT ?hero ?heroLabel ?birthDate ?description WHERE {
      ?hero wdt:P31 wd:Q5;                # является человеком
            wdt:P166 wd:Q188929;          # награждён "Герой Советского Союза"
            wdt:P19 ?birthPlace.          # место рождения
      ?birthPlace wdt:P131* wd:${qId}.    # находится в границах города
      OPTIONAL { ?hero wdt:P569 ?birthDate. } # дата рождения (необязательно)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ru". }
    }
    LIMIT 15
  `;

  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/sparql-results+json' }
    });
    const data = await response.json();
    
    // Преобразуем сложный формат Wikidata в простой массив объектов
    return data.results.bindings.map(item => ({
      id: item.hero.value.split('/').pop(), // берём ID из URL
      name: item.heroLabel.value,
      birthDate: item.birthDate ? item.birthDate.value : 'Неизвестно',
      biography: item.description ? item.description.value : 'Информация уточняется',
      rank: 'Герой Советского Союза',
      branch: 'Не указан', // Wikidata не всегда хранит род войск в простом виде
      cityId: cityId,
      source: 'Wikidata'
    }));
  } catch (error) {
    console.error('Ошибка при запросе к Wikidata:', error);
    return [];
  }
}
