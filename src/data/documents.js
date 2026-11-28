// Document (Документ): id, title, archiveSource, scanUrl, cityId, date
// Ссылки на реальные архивные ресурсы: «Память народа», Подвиг народа, ОБД Мемориал, Росархив.

export const documents = [
  {
    id: 'decree-1965-moscow',
    title: 'Указ Президиума ВС СССР от 8 мая 1965 г. о присвоении звания «Город-герой» Москве и Ленинграду',
    archiveSource: 'Росархив / Ведомости Съезда народных депутатов',
    scanUrl: 'https://www.rosarkh.ru/',
    cityId: 'moscow',
    date: '1965-05-08',
  },
  {
    id: 'order-227',
    title: 'Приказ НКО №227 «Ни шагу назад!» от 28 июля 1942 г.',
    archiveSource: 'Подвиг народа (podvignaroda.ru)',
    scanUrl: 'https://podvignaroda.ru/?#id=15194381&tab=navDetailDocument',
    cityId: 'volgograd',
    date: '1942-07-28',
  },
  {
    id: 'brest-defense-acts',
    title: 'Акт и материалы расследования обороны Брестской крепости (1942–1945, трофейные документы вермахта)',
    archiveSource: 'Память народа (pamyat-naroda.ru)',
    scanUrl: 'https://pamyat-naroda.ru/',
    cityId: 'brest',
    date: '1942-01-01',
  },
  {
    id: 'leningrad-doroga-zhizni',
    title: 'Документы Ладожской военной флотилии и «Дороги жизни» (сезоны 1941–1943)',
    archiveSource: 'Память народа / ЦМО МО РФ',
    scanUrl: 'https://pamyat-naroda.ru/',
    cityId: 'leningrad',
    date: '1941-09-08',
  },
  {
    id: 'odessa-evacuation',
    title: 'Директива Ставки ВГК об эвакуации Одесского гарнизона (октябрь 1941)',
    archiveSource: 'Подвиг народа',
    scanUrl: 'https://podvignaroda.ru/',
    cityId: 'odessa',
    date: '1941-10-01',
  },
  // Смоленск
{
  id: 'smolensk-defense-order-1941',
  title: 'Приказ Ставки ВГК об обороне Смоленска (июль 1941)',
  archiveSource: 'Память народа (pamyat-naroda.ru)',
  scanUrl: 'https://pamyat-naroda.ru/',
  cityId: 'smolensk',
  date: '1941-07-10'
},
{
  id: 'smolensk-liberation-1943',
  title: 'Донесение об освобождении Смоленска (25 сентября 1943)',
  archiveSource: 'Подвиг народа (podvignaroda.ru)',
  scanUrl: 'https://podvignaroda.ru/',
  cityId: 'smolensk',
  date: '1943-09-25'
},
  {
  id: 'murmansk-defense-1941',
  title: 'Директива о обороне Мурманска и Кировской железной дороги (1941)',
  archiveSource: 'Память народа',
  scanUrl: 'https://pamyat-naroda.ru/',
  cityId: 'murmansk',
  date: '1941-06-29'
},
];

export const getDocumentsByCity = (cityId) =>
  documents.filter((d) => d.cityId === cityId);
