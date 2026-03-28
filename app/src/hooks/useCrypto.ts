import {useFetchPro} from "./useFetchPro"

//useFetch (extraer recursos de una API)
const useCryptoPrices = () => {

    // Extraemos data y loading de su hook base
    const { data, loading } = useFetchPro("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");

    // Para devolver ambos valores, debemos envolverlos en llaves { }
    return {
        loading,
        // Usamos el encadenamiento opcional ?. porque al inicio data es null
        data: data?.map((crypto: any) => ({
            name: crypto.name,
            price: crypto.current_price,
            change: crypto.price_change_percentage_24h
        }))
    }; // Cerramos el objeto del return
}; // Cerramos la función del hook

export default useCryptoPrices;