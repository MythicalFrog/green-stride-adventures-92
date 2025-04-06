
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Add type definition for Leaflet to fix TypeScript errors
declare global {
  interface Window {
    L: any;
  }
}

const MapView = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const pointsRef = useRef([]);
  const resultBoxRef = useRef(null);
  const travelModeSelectRef = useRef(null);

  useEffect(() => {
    // Make sure Leaflet is available
    if (typeof window !== 'undefined' && !window.L) {
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
      document.head.appendChild(leafletCSS);

      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
      leafletScript.onload = initializeMap;
      document.body.appendChild(leafletScript);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapContainerRef.current || mapRef.current) return;

      // Initialize map
      const L = window.L;
      if (!L) return; // Exit if Leaflet is not loaded yet
      
      const map = L.map(mapContainerRef.current).setView([40, -100], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);
      mapRef.current = map;

      const resultBox = resultBoxRef.current;
      const travelModeSelect = travelModeSelectRef.current;
      pointsRef.current = [];

      function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
      }

      function calculateCarbon(distanceKm) {
        return {
          car: distanceKm * 0.21,
          bike: distanceKm * 0.005,
          walk: 0,
          bus: distanceKm * 0.089
        };
      }

      function addCircleMarker(lat, lng) {
        L.circleMarker([lat, lng], {
          radius: 6,
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 1
        }).addTo(map);
      }

      function resetMap() {
        pointsRef.current = [];
        if (resultBox) resultBox.innerHTML = "Waiting for input...";
        map.eachLayer((layer) => {
          if (layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
          }
        });
      }

      if (travelModeSelect) {
        travelModeSelect.addEventListener('change', resetMap);
      }

      map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        addCircleMarker(lat, lng);
        pointsRef.current.push([lat, lng]);

        if (pointsRef.current.length >= 2 && resultBox) {
          const len = pointsRef.current.length;
          const p1 = pointsRef.current[len - 2];
          const p2 = pointsRef.current[len - 1];
          const dist = haversineDistance(p1[0], p1[1], p2[0], p2[1]);
          const carbon = calculateCarbon(dist);

          L.polyline([p1, p2], { color: 'blue' }).addTo(map);

          const mode = travelModeSelect ? travelModeSelect.value : 'car';
          const userCO2 = carbon[mode];
          const carCO2 = carbon.car;

          const status = userCO2 < carCO2
            ? `<span class='text-green-600 font-semibold'>You saved ${(carCO2 - userCO2).toFixed(2)} kg CO₂!</span>`
            : `<span class='text-red-600 font-semibold'>You added ${(userCO2 - carCO2).toFixed(2)} kg CO₂ compared to a car ride.</span>`;

          const html = `
            <div class="mb-2">📏 <strong>Distance:</strong> ${dist.toFixed(2)} km</div>
            <div class="mb-2">🧮 <strong>Carbon Footprint (per segment):</strong><br/>
              🚗 Car: ${carbon.car.toFixed(2)} kg CO₂<br/>
              🚴‍♀️ Bike: ${carbon.bike.toFixed(2)} kg CO₂<br/>
              🚶 Walk: ${carbon.walk.toFixed(2)} kg CO₂<br/>
              🚌 Bus: ${carbon.bus.toFixed(2)} kg CO₂
            </div>
            <div class="mt-2">👣 <strong>Your Mode (${mode}):</strong> ${userCO2.toFixed(2)} kg CO₂</div>
            <div class="mt-2">${status}</div>
          `;

          resultBox.innerHTML = html;
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Eco Map</h1>
      
      <Card className="mb-6 bg-transparent backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle>Carbon Footprint Estimator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4 space-y-4">
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground mb-4">Click points on the map to calculate distance and carbon footprint.</p>
                
                <label className="block mb-2 text-sm font-medium">Your travel method:</label>
                <select 
                  ref={travelModeSelectRef}
                  className="w-full mb-4 p-2 border rounded bg-background"
                  defaultValue="car"
                >
                  <option value="car">🚗 Car</option>
                  <option value="bike">🚴‍♀️ Bike</option>
                  <option value="walk">🚶 Walk</option>
                  <option value="bus">🚌 Bus</option>
                </select>
                
                <div ref={resultBoxRef} className="text-sm">Waiting for input...</div>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div 
                ref={mapContainerRef} 
                className="w-full h-[400px] rounded-lg overflow-hidden border"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle>Nearby Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center p-3 border rounded-md bg-transparent backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <span className="text-green-700 dark:text-green-300">🍔</span>
                </div>
                <div>
                  <div className="font-medium">McDonald's</div>
                  <div className="text-sm text-muted-foreground">0.8km away • Walk to earn 50pts</div>
                </div>
              </li>
              <li className="flex items-center p-3 border rounded-md bg-transparent backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-blue-700 dark:text-blue-300">🌳</span>
                </div>
                <div>
                  <div className="font-medium">Local Park</div>
                  <div className="text-sm text-muted-foreground">1.2km away • Bike to earn 75pts</div>
                </div>
              </li>
              <li className="flex items-center p-3 border rounded-md bg-transparent backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-purple-700 dark:text-purple-300">🛒</span>
                </div>
                <div>
                  <div className="font-medium">Grocery Store</div>
                  <div className="text-sm text-muted-foreground">0.6km away • Walk to earn 40pts</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle>Carbon Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <div className="font-medium text-green-800 dark:text-green-300">Walking & Biking</div>
                <div className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Each 1km walked saves about 120g CO₂ compared to driving
                </div>
              </div>
              
              <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="font-medium text-blue-800 dark:text-blue-300">Public Transport</div>
                <div className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Each 1km on public transit saves about 72g CO₂ compared to driving
                </div>
              </div>
              
              <div className="p-4 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                <div className="font-medium text-amber-800 dark:text-amber-300">Your Impact</div>
                <div className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  Your eco-friendly choices have already helped reduce pollution!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;
