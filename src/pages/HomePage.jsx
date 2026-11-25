import HeroMap from '../components/HeroMap.jsx';
import CityCard from '../components/CityCard.jsx';
import { cities } from '../data/cities.js';

export default function HomePage() {
  return (
    <div className="home">
      <section className="intro">
        <h1>Города-герои</h1>
        <p>
          Звание «Город-герой» было учреждено 8 мая 1965 года к 20-летию Победы.
          Его удостоены 13 городов и Брестская крепость — за массовый героизм
          защитников в Великой Отечественной войне 1941–1945 годов. Высшей
          наградой города становилась медаль «Золотая Звезда» и орден Ленина,
          вручаемые городу как символу стойкости его жителей и гарнизона.
        </p>
      </section>

      <section className="map-section">
        <h2>Карта городов-героев</h2>
        <div className="map-wrap">
          <HeroMap />
        </div>
        <p className="map-hint">
          Нажмите на ★ на карте — откроется краткая справка и ссылка на раздел
          города. Переключатель слоёв (справа вверху): современная карта и
          исторический слой границ 1941–1945.
        </p>
      </section>

      <section className="cities-grid-section">
        <h2>Все города</h2>
        <div className="cities-grid">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </div>
  );
}
