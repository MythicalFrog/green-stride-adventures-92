
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// In a real app, we would integrate with a mapping API like Google Maps, Mapbox, or Leaflet
// For this demo, we'll create a simple placeholder
const MapView = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Eco Map</h1>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Journey Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-medium text-muted-foreground">Interactive Map</div>
              <div className="text-sm text-muted-foreground mt-2">
                In a real app, this would show your journeys on an interactive map
              </div>
            </div>
            <div className="absolute inset-0 bg-eco-green-light opacity-20"></div>
            
            {/* Simplified map with paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="30" cy="40" r="2" fill="#2A9D42" />
              <circle cx="70" cy="60" r="2" fill="#2A9D42" />
              <path d="M 30 40 Q 50 30, 70 60" stroke="#2A9D42" strokeWidth="0.5" fill="none" />
              
              <circle cx="20" cy="70" r="2" fill="#0EA5E9" />
              <circle cx="60" cy="30" r="2" fill="#0EA5E9" />
              <path d="M 20 70 Q 40 50, 60 30" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
              
              <circle cx="10" cy="30" r="2" fill="#72C267" />
              <circle cx="90" cy="50" r="2" fill="#72C267" />
              <path d="M 10 30 Q 50 70, 90 50" stroke="#72C267" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Nearby Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center p-3 border rounded-md">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-700">🍔</span>
                </div>
                <div>
                  <div className="font-medium">McDonald's</div>
                  <div className="text-sm text-muted-foreground">0.8km away • Walk to earn 50pts</div>
                </div>
              </li>
              <li className="flex items-center p-3 border rounded-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-700">🌳</span>
                </div>
                <div>
                  <div className="font-medium">Local Park</div>
                  <div className="text-sm text-muted-foreground">1.2km away • Bike to earn 75pts</div>
                </div>
              </li>
              <li className="flex items-center p-3 border rounded-md">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-purple-700">🛒</span>
                </div>
                <div>
                  <div className="font-medium">Grocery Store</div>
                  <div className="text-sm text-muted-foreground">0.6km away • Walk to earn 40pts</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Carbon Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="font-medium text-green-800">Walking & Biking</div>
                <div className="text-sm text-green-700 mt-1">
                  Each 1km walked saves about 120g CO₂ compared to driving
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="font-medium text-blue-800">Public Transport</div>
                <div className="text-sm text-blue-700 mt-1">
                  Each 1km on public transit saves about 72g CO₂ compared to driving
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="font-medium text-amber-800">Your Impact</div>
                <div className="text-sm text-amber-700 mt-1">
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
