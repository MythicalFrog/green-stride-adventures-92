
import { Journey, Challenge, TransportMode } from '../types';

// Function to generate fake journeys
export const generateMockJourneys = (): Journey[] => {
  const modes: TransportMode[] = ['walking', 'biking', 'car', 'public'];
  const journeys: Journey[] = [];
  
  // Create some past journeys over the last week
  for (let i = 0; i < 10; i++) {
    const daysAgo = Math.floor(Math.random() * 7); // 0 to 6 days ago
    const mode = modes[Math.floor(Math.random() * 3)];
    const distance = Math.floor(Math.random() * 5000) + 500; // 500m to 5.5km
    
    const startTime = new Date();
    startTime.setDate(startTime.getDate() - daysAgo);
    startTime.setHours(
      Math.floor(Math.random() * 10) + 8, // Between 8am and 6pm
      Math.floor(Math.random() * 60)
    );
    
    const endTime = new Date(startTime);
    // Journey duration based on mode and distance
    const durationMinutes = mode === 'walking' ? distance / 80 : // ~5km/h
                           mode === 'biking' ? distance / 220 : // ~13km/h
                           distance / 500; // ~30km/h for car
    endTime.setMinutes(endTime.getMinutes() + Math.max(5, Math.ceil(durationMinutes)));
    
    // Carbon calculation
    const carbonSaved = mode !== 'car' ? (distance / 1000) * 0.12 : 0;
    
    // Points calculation
    const points = mode === 'walking' ? Math.floor(distance / 100) :
                  mode === 'biking' ? Math.floor(distance / 200) :
                  mode === 'public' ? Math.floor(distance / 300) : 0;
    
    journeys.push({
      id: `journey-mock-${i}`,
      mode,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      distance,
      carbonSaved,
      points,
      completed: true,
      startLocation: {
        lat: 40.7128 + (Math.random() * 0.02 - 0.01),
        lng: -74.0060 + (Math.random() * 0.02 - 0.01),
      },
      endLocation: {
        lat: 40.7128 + (Math.random() * 0.02 - 0.01),
        lng: -74.0060 + (Math.random() * 0.02 - 0.01),
      }
    });
  }
  
  return journeys.sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
};

// Function to generate challenges
export const generateMockChallenges = (): Challenge[] => {
  const places = [
    { name: "McDonald's", lat: 40.7143, lng: -74.0070 },
    { name: "Local Park", lat: 40.7193, lng: -74.0020 },
    { name: "Grocery Store", lat: 40.7120, lng: -74.0050 },
    { name: "Library", lat: 40.7140, lng: -74.0100 },
    { name: "Farmer's Market", lat: 40.7160, lng: -73.9990 },
  ];
  
  const challenges: Challenge[] = [];
  
  places.forEach((place, index) => {
    // Walking challenges
    challenges.push({
      id: `challenge-walk-${index}`,
      title: `Walk to ${place.name}`,
      description: `Take a refreshing walk to ${place.name} and enjoy the fresh air.`,
      mode: 'walking',
      distance: 800 + (Math.random() * 400),
      points: 50,
      completed: false,
      location: place,
    });
    
    // Biking challenges
    if (index % 2 === 0) {
      challenges.push({
        id: `challenge-bike-${index}`,
        title: `Bike to ${place.name}`,
        description: `Cycle to ${place.name} and reduce your carbon footprint.`,
        mode: 'biking',
        distance: 1200 + (Math.random() * 800),
        points: 75,
        completed: false,
        location: place,
      });
    }
    
    // Public transport challenges
    if (index % 3 === 0) {
      challenges.push({
        id: `challenge-public-${index}`,
        title: `Use public transport to ${place.name}`,
        description: `Take a bus or train to ${place.name} instead of driving.`,
        mode: 'public',
        distance: 2000 + (Math.random() * 1000),
        points: 40,
        completed: false,
        location: place,
      });
    }
  });
  
  return challenges;
};
