import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { cities } from '../data/cities';

// Кастомная иконка-звезда
const starIcon = L.divIcon({
  className: 'star-marker',
  html: '★',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function HeroMap() {
  return (
    <MapContainer
      center={[54, 35]} // Центр карты (примерно центр европейской части)
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <LayersControl position="topright">
        {/* Современная карта */}
        <LayersControl.BaseLayer checked name="Современная карта">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        {/* Исторический слой (пока используем тот же OSM, потом заменим на mapwarper) */}
        <LayersControl.BaseLayer name="Исторические границы (1941–1945)">
          <TileLayer
            attribution="Исторический слой — в разработке"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.6}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* Маркеры городов-героев */}
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={city.coordinates}
          icon={starIcon}
        >
          <Popup>
            <div className="map-popup">
              <strong>{city.name}</strong>
              {city.modernName && city.modernName !== city.name && (
                <em> — {city.modernName}</em>
              )}
              <p>{city.shortDescription}</p>
              <Link to={`/cities/${city.id}`} className="popup-link">
                Открыть раздел →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
