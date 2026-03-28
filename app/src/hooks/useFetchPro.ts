import { useState, useEffect, useRef } from "react";

type Options = {  
    retries?: number;
}

const useFetchPro = (url: string, options?: Options) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Cancelar petición previa si existe
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        let attempts = 0;

        const fetchData = async () => {
            try {
                setLoading(true); // 1. Empezamos a cargar
                setError(""); // Limpiamos errores previos

                const res = await fetch(url, {
                    signal: controller.signal
                });

                if (!res.ok) throw new Error("Error en la petición");

                const json = await res.json();
                setData(json);
                setLoading(false); // 2. Ya tenemos los datos

            } catch (err: any) {
                // Si el error fue porque nosotros cancelamos la petición, no hacemos nada
                if (err.name === 'AbortError') return;

                if (attempts < (options?.retries || 0)) {
                    attempts++;
                    fetchData(); // Reintento
                } else {
                    setError("Failed Request");
                    setLoading(false);
                }
            }
        };

        fetchData(); // 3. Llamamos a la función UNA SOLA VEZ aquí

        // Limpieza al desmontar el componente
        return () => controller.abort();

    }, [url]); // 4. Se ejecuta cada que la URL cambie

    return { data, loading, error };
}

export default useFetchPro;