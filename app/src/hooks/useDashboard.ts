import useCryptoPrices from "./useCrypto";
import useFetchPro from "./useFetchPro";

const useDashboard=()=>{
    const crypto= useCryptoPrices();
    const users = useFetchPro("https://jsonplaceholder.typicode.com/users");

    return{
        loading: crypto.loading || users.loading,
        data:{
            crypto: crypto.data,
            users: users.data
        }
    }
}