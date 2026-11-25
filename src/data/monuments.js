// Monument (Памятник): id, name, cityId, coordinates [lat, lng], description, photoUrl
// Реальные мемориалы городов-героев.

export const monuments = [
  {
    id: 'mamayev-kurgan',
    name: 'Мемориальный комплекс «Мамаев курган» («Родина-мать зовёт!»)',
    cityId: 'volgograd',
    coordinates: [48.7415, 44.5386],
    description:
      'Главный мемориал Сталинградской битвы. Скульптура «Родина-мать зовёт!» (1967, В. Вучетич) — 85 м с мечом. Объект ЮНЕСКО-номинации, символ Победы.',
    photoUrl: '/images/monuments/mamayev-kurgan.jpg',
  },
  {
    id: 'brest-fortress',
    name: 'Мемориальный комплекс «Брестская крепость-герой» («Взрывная волна»)',
    cityId: 'brest',
    coordinates: [52.0600, 23.6836],
    description:
      'Открыт в 1971 году на месте руин цитадели. Монумент «Жажда» (штык-колодец 100 т), обелиск «Штык-молния» высотой 100 метров.',
    photoUrl: '/images/monuments/brest-fortress.jpg',
  },
  {
    id: 'piskaryovskoye',
    name: 'Пискарёвское мемориальное кладбище',
    cityId: 'leningrad',
    coordinates: [59.9994, 30.3725],
    description:
      'Место захоронения более 500 тысяч ленинградцев, погибших в блокаду, и воинов Невской заставы. Мемориальный ансамбль (1960) со статуей Матери-Родины.',
    photoUrl: '/images/monuments/piskaryovskoye.jpg',
  },
  {
    id: 'sapyun',
    name: 'Сапун-гора — мемориал обороны Севастополя',
    cityId: 'sevastopol',
    coordinates: [44.5540, 33.6340],
    description:
      'Место самых ожесточённых боёв 1942 и 1944 годов. Панорама «Штурм Сапун-горы 7 мая 1944 года», Обелиск Славы, экспозиция под открытым небом.',
    photoUrl: '/images/monuments/sapun-gora.jpg',
  },
  {
    id: 'krepost-minsk',
    name: 'Третьи ворота Минского гетто / Мемориал «Яма»',
    cityId: 'minsk',
    coordinates: [53.8980, 27.5640],
    description:
      'Мемориал жертвам Минского гетто — одного из крупнейших лагерей уничтожения на оккупированной территории СССР.',
    photoUrl: '/images/monuments/minsk-getto.jpg',
  },
  {
    id: 'kurgan-slavy-moscow',
    name: 'Поклонная гора и Музей Победы на Поклонной горе',
    cityId: 'moscow',
    coordinates: [55.7222, 37.5086],
    description:
      'Комплекс памяти Великой Отечественной войны (открыт 9 мая 1995 г.): Обелиск Победы (141,8 м — высота по годам войны), храм Георгия Победоносца, музей.',
    photoUrl: '/images/monuments/poklonnaya.jpg',
  },
];

export const getMonumentsByCity = (cityId) =>
  monuments.filter((m) => m.cityId === cityId);
