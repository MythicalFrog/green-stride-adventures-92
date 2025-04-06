
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DeviceType = 'laptop' | 'phone';

interface DeviceContextType {
  deviceType: DeviceType;
  toggleDeviceType: () => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('laptop');

  const toggleDeviceType = () => {
    setDeviceType((prevType) => (prevType === 'laptop' ? 'phone' : 'laptop'));
  };

  return (
    <DeviceContext.Provider value={{ deviceType, toggleDeviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};
