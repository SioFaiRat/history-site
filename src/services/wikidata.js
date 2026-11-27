const CITY_WIKIDATA_IDS = {
  moscow: 'Q649',
  leningrad: 'Q656',
  volgograd: 'Q914',
  brest: 'Q140147',
  kiev: 'Q1899',
  odessa: 'Q1874',
  sevastopol: 'Q7525',
  minsk: 'Q2280',
  kerch: 'Q157065',
  novorossiysk: 'Q15760',
  tula: 'Q2770',
  murmansk: 'Q1763',
  smolensk: 'Q2337',
};

// Маппинг: город → ключевые события ВОВ в Wikidata
const CITY_EVENTS = {
  moscow: ['Q1141842'], // Битва за Москву
  leningrad: ['Q157858'], // Блокада Ленинграда
  volgograd: ['Q182446'], // Сталинградская битва
  brest: ['Q2913632'], // Оборона Брестской крепости
  kiev: ['Q1142089'], // Киевская операция (1941)
  odessa: ['Q2003742'], // Оборона Одессы
  sevastopol: ['Q1193714'], // Оборона Севастополя (1941-1942)
  minsk: ['Q2913633'], // Оборона Минска
  kerch: ['Q2913634'], // Керченско-Феодосийская десантная операция
  novorossiysk: ['Q2913635'], // Новороссийская операция
  tula: ['Q2913636'], // Тульская оборонительная операция
  murmansk: ['Q2913637'], // Оборона Мурманска
  smolensk: ['Q1142090'], // Смоленское сражение (1941)
};

export async function fetchHeroesFromWikidata(cityId) {
  const qId = CITY_WIKIDATA_IDS[cityId];
  const events = CITY_EVENTS[cityId] || [];
  
  if (!qId) {
    console.warn(`Wikidata ID для города ${cityId} не найден`);
    return [];
  }

  // Строим UNION-запрос: ищем героев по всем доступным связям
  const eventConditions = events.map(eId => `?hero wdt:P1344 wd:${eId}.`).join('\n      UNION\n      ');
  
  const sparqlQuery = `
    SELECT DISTINCT ?hero ?heroLabel ?birthDate WHERE {
      ?hero wdt:P31 wd:Q5;
            wdt:P166 wd:Q188929.
      {
        ?hero wdt:P19 ?birthPlace.
        ?birthPlace wdt:P131* wd:${qId}.
      }
      UNION
      {
        ?hero wdt:P119 ?deathPlace.
        ?deathPlace wdt:P131* wd:${qId}.
      }
      UNION
      {
        ?hero wdt:P937 wd:${qId}.
      }
      ${eventConditions ? `UNION\n      { ${eventConditions} }` : ''}
      OPTIONAL { ?hero wdt:P569 ?birthDate. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "ru,en". }
    }
    LIMIT 50
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
    console.log(`Wikidata вернул ${data.results.bindings.length} результатов для ${cityId}`);
    
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
