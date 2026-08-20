'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Office locations with coordinates
const officeLocations = [
  {
    country: 'Lebanon',
    cities: 'Beirut, Tripoli',
    lat: 33.89,
    lng: 35.50,
  },
  {
    country: 'Iraq',
    cities: 'Baghdad, Erbil, Basra',
    lat: 33.31,
    lng: 44.37,
  },
  {
    country: 'Cyprus',
    cities: 'Limassol, Nicosia',
    lat: 35.00,
    lng: 33.00,
  },
  {
    country: 'Turkey',
    cities: 'Istanbul, Izmir, Mersin',
    lat: 39.93,
    lng: 32.85,
  },
  {
    country: 'KSA',
    cities: 'Jeddah',
    lat: 21.54,
    lng: 39.17,
  },
  {
    country: 'Georgia',
    cities: 'Poti',
    lat: 42.15,
    lng: 41.67,
  },
  {
    country: 'Jordan',
    cities: 'Amman, Aqaba',
    lat: 31.95,
    lng: 35.93,
  },
  {
    country: 'UAE',
    cities: 'Dubai',
    lat: 25.20,
    lng: 55.27,
  },
]

// Custom marker icon — red, same arrow shape as the static map's location-marker.svg
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 10.5381C9.75 8.75424 8.29434 7.30711 6.5 7.30711C4.70566 7.30711 3.25 8.75424 3.25 10.5381C3.25 12.3219 4.70566 13.769 6.5 13.769C8.29434 13.769 9.75 12.3219 9.75 10.5381ZM8.12569 10.5381C8.12569 9.64616 7.39717 8.92328 6.5 8.92328C5.60283 8.92328 4.87569 9.64616 4.87569 10.5381C4.87569 11.43 5.60283 12.1542 6.5 12.1542C7.39717 12.1542 8.12569 11.43 8.12569 10.5381ZM13 11.0768C13 7.49264 9.50532 2.79531 7.64047 0.54422C7.04051 -0.181407 5.95948 -0.181407 5.35953 0.54422C3.49468 2.79531 0 7.49264 0 11.0768C0 14.3476 2.90993 17 6.5 17C10.0901 17 13 14.3476 13 11.0768ZM11.3743 11.0768C11.3743 9.72862 10.6873 7.96815 9.61314 6.11973C8.61091 4.39636 7.39579 2.79943 6.5 1.70825C5.60559 2.79943 4.38909 4.39636 3.38686 6.11973C2.31274 7.96815 1.62569 9.72862 1.62569 11.0768C1.62569 13.3265 3.67163 15.3838 6.5 15.3838C9.32837 15.3838 11.3743 13.3265 11.3743 11.0768Z" fill="#D8232A"/>
      </svg>
    `,
    iconSize: [13, 17],
    iconAnchor: [6.5, 17],
    popupAnchor: [0, -17],
  })
}

export default function OfficesMap() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Show placeholder while loading - matches Figma dimensions
    return (
      <div className="w-full aspect-[1146/665] bg-[#f0f0f0] flex items-center justify-center">
        <p className="text-gezairi-gray">Loading map...</p>
      </div>
    )
  }

  const customIcon = createCustomIcon()

  return (
    <div className="w-full aspect-[1146/665] overflow-hidden">
      <style jsx global>{`
        .leaflet-container {
          background: #ffffff;
        }
        .leaflet-tile {
          filter: contrast(0.6) brightness(1.3);
        }
        .leaflet-control-attribution {
          display: none;
        }
        .leaflet-control-zoom {
          display: none;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
      <MapContainer
        center={[25, 50]}
        zoom={2.5}
        minZoom={2.5}
        maxZoom={2.5}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          noWrap={true}
        />
        {officeLocations.map((office, index) => (
          <Marker
            key={index}
            position={[office.lat, office.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-gezairi-blue text-[14px] m-0">{office.country}</p>
                <p className="text-[12px] text-gezairi-dark m-0">{office.cities}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
