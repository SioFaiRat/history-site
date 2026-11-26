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

  // Ищем Героев Советского Союза, родившихся в этом городе
  // P19 = место рождения, P131* = транзитивная связь через административную иерархию
  const sparqlQuery = `
    SELECT DISTINCT ?hero ?heroLabel ?birthDate WHERE {
      ?hero wdt:P31 wd:Q5;
            wdt:P166 wd:Q188929;
            wdt:P19 ?birthPlace.
      ?birthPlace wdt:P131* wd:${qId}.
      OPTIONAL { ?hero wdt:P569 ?birthDate. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ru,en". }
    }
    LIMIT 20
  `;

  const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  console.log('Запрос к Wikidata:', url);

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/sparql-results+json' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Ответ Wikidata:', data);
    console.log('Количество результатов:', data.results.bindings.length);
    
    return data.results.bindings.map(item => ({
      id: item.hero.value.split('/').pop(),
      name: item.heroLabel?.value || 'Имя не указано',
      birthDate: item.birthDate?.value || null,
      biography: 'Информация уточняется',
      rank: 'Герой Советского Союза',
      branch: 'Не указан',
      cityId: cityId,
      source: 'Wikidata'
    }));
  } catch (error) {
    console.error('Ошибка при запросе к Wikidata:', error);
    return [];
  }
}
