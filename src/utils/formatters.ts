
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters.toFixed(0)}m`;
  } else {
    return `${(meters / 1000).toFixed(1)}km`;
  }
};

export const formatCO2 = (kg: number): string => {
  if (kg < 1) {
    return `${(kg * 1000).toFixed(0)}g CO₂`;
  } else {
    return `${kg.toFixed(1)}kg CO₂`;
  }
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short',
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatDuration = (startTime: string, endTime?: string): string => {
  if (!endTime) return '';
  
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const durationMs = end - start;
  
  const minutes = Math.floor(durationMs / 60000);
  
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
};

export const getTransportIcon = (mode: string): string => {
  switch(mode) {
    case 'walking':
      return 'footprints';
    case 'biking':
      return 'bike';
    case 'car':
      return 'car';
    case 'public':
      return 'bus';
    default:
      return 'circle';
  }
};
