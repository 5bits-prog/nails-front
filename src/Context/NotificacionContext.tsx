// NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextType {
  mensaje: string;
  mostrarMensaje: (msg: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children,}) => {

  const [mensaje, setMensaje] = useState<string>("");

  const mostrarMensaje = (msg: string) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 3000); 
  };

  return (
    <NotificationContext.Provider value={{ mensaje, mostrarMensaje }}>
      {children}
      {mensaje && <div className="notificacion">{mensaje}</div>} 
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe usarse dentro de un NotificationProvider"
    );
  }
  return context;
};