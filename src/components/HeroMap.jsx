import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { cities } from '../data/cities.js';

// Золотая звезда — маркер города-героя
const starIcon = L.divIcon({
  className: 'star-marker',
  html: '<span class="star">★</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -12],
});

export default function HeroMap() {
  return (
    <MapContainer
      center={[52.5, 33.0]}
      zoom={5}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Современная карта">
          <TileLayer
            attribution='&copy; участники OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        {/* Исторический слой: границы СССР 1941–1945.
            TODO: заменить URL на собственные тайлы, подготовленные через mapwarper.net */}
        <LayersControl.BaseLayer name="Исторические границы (1941–1945)">
          <TileLayer
            attribution="Исторический слой — в разработке (mapwarper.net)"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.6}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {cities.map((city) => (
        <Marker key={city.id} position={city.coordinates} icon={starIcon}>
          <Popup>
            <div className="map-popup">
              <strong>{city.name}</strong>
              {city.modernName !== city.name && (
                <em> — {city.modernName}</em>
              )}
              <p>{city.shortDescription}</p>
              <Link to={`/cities/${city.id}`}>Открыть раздел →</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
