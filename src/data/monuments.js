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

  // Смоленск
{
  id: 'smolensk-kurgan-slavy',
  name: 'Курган Бессмертия',
  cityId: 'smolensk',
  coordinates: [54.7818, 32.0401],
  description: 'Мемориальный комплекс в честь воинов, погибших в боях за Смоленск. Открыт в 1969 году. Высота кургана — 12 метров.',
  photoUrl: '/images/monuments/smolensk-kurgan.jpg'
},
{
  id: 'smolensk-wall-memory',
  name: 'Стена Памяти',
  cityId: 'smolensk',
  coordinates: [54.7825, 32.0415],
  description: 'Мемориал с именами смолян, погибших в Великой Отечественной войне. Расположен в сквере Памяти Героев.',
  photoUrl: '/images/monuments/smolensk-wall.jpg'
},
{
  id: 'smolensk-monument-liberators',
  name: 'Памятник освободителям Смоленска',
  cityId: 'smolensk',
  coordinates: [54.7810, 32.0390],
  description: 'Монумент в честь воинов 68-й армии, освободивших Смоленск 25 сентября 1943 года.',
  photoUrl: '/images/monuments/smolensk-liberators.jpg'
},
  {
  id: 'murmansk-alyosha',
  name: 'Мемориал «Защитникам Советского Заполярья в годы Великой Отечественной войны» (Алёша)',
  cityId: 'murmansk',
  coordinates: [68.9585, 33.0827],
  description: '42-метровая фигура солдата на сопке Зеленый Мыс. Открыт в 1974 году. Символ Мурманска.',
  photoUrl: '/images/monuments/murmansk-alyosha.jpg'
},
{
  id: 'murmansk-submarine',
  name: 'Памятник подводникам Северного флота',
  cityId: 'murmansk',
  coordinates: [68.9700, 33.0900],
  description: 'Мемориал в честь подводников, погибших в годы войны. Рубка подводной лодки С-56.',
  photoUrl: '/images/monuments/murmansk-sub.jpg'
},
  {
  id: 'tula-monument-defenders',
  name: 'Памятник защитникам Тулы',
  cityId: 'tula',
  coordinates: [54.1961, 37.6182],
  description: 'Мемориал в честь туляков, оборонявших город в 1941 году. Открыт в 1968 году.',
  photoUrl: '/images/monuments/tula-defenders.jpg'
},
  {
  id: 'kerch-adjimushkay',
  name: 'Мемориал «Аджимушкайские каменоломни»',
  cityId: 'kerch',
  coordinates: [45.3562, 36.4674],
  description: 'Мемориал в честь защитников Аджимушкайских каменоломен, державших оборону с мая по октябрь 1942 года.',
  photoUrl: '/images/monuments/kerch-adjimushkay.jpg'
},
];

export const getMonumentsByCity = (cityId) =>
  monuments.filter((m) => m.cityId === cityId);
