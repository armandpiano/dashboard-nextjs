import { abort } from "node:process";
import { useState,useEffect,useRef } from "react";

type Options={  
    retries?:number;
}

const useFetchPro=(url:string,options?:Options)=>{
    //no sabemos que va a traer así que lo definimos como null
    const [data,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const [error, setError]=useState("");

    const abortRef = useRef<AbortController | null>(null);

    useEffect(()=>{
        //hay algún proceso ?
        abortRef.current?.abort();
        const controller= new AbortController();
        abortRef.current=controller;
        //forma mas comun
        let attemps=0;
        //Nos debe de devolver algo
        const fetchData=async ()=>{
            try{
                setLoading(false);
                const res = await fetch(url, {
                    signal:controller.signal
                })
                if(!res.ok) throw new Error("error");

                const json= await res.json();
                setData(json);

            }catch(error){
                if(attemps <(options?.retries || 0) ){
                    attemps++;
                    fetchData();
                }else{
                    setError("Failed Request");
                }

            }finally{

            }
        }
    },[null])
}
export default useFetchPro;


//