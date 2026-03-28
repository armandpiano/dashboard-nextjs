import { createContext, useState, ReactNode } from "react";

// Definimos qué información va a manejar nuestro estado global
interface CryptoContextType {
    currency: string;
    setCurrency: (currency: string) => void; // Aquí estaba el error si faltaba esta línea
    selectedId: string | null;
    setId: (id: string | null) => void; // El error del "oid" suele ser por nombre o falta de definición
}

export const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState("usd");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <CryptoContext.Provider value={{ 
            currency, 
            setCurrency, 
            selectedId, 
            setId: setSelectedId // Vinculamos la función al nombre que definimos
        }}>
            {children}
        </CryptoContext.Provider>
    );
};