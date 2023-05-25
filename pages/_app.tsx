import React, {useState, useEffect} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import { AppProps } from "next/app";
import Layout from '@/components/Layout';
import "./style_initialize.css"
import "./fonts/Font-Face.module.css";
import '@/components/Loading/Loading'
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/router';
import { UserContext } from '@/utils/context';


const queryClient = new QueryClient();


export default function App({Component, pageProps}: AppProps) {

    const defaultUser = {
        id: "taehyeungkim98",
        profileImage: '/default.png',
        badge: [{id: 1, name: "Wow!"}, {id: 2, name: "Ay!"}, {id: 3, name: "Great!"}]
    }

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateLoading = (loading:boolean) => {
        setIsLoading(loading);
    }


    useEffect(()=>{
        const loadingOn = () => {
            updateLoading(true);
        }
        const loadingOff = () =>{
            updateLoading(false);
        }
        router.events.on('routeChangeStart', loadingOn);
        router.events.on('routeChangeComplete', loadingOff);
        return(()=>{
            router.events.off('routeChangeStart', loadingOn);
            router.events.off('routeChangeComplete', loadingOff)
        })
        // router.isReady && (async()=>{
        //     updateLoading(false)})()
    },[router])

     return (
        <UserContext.Provider value={defaultUser}>
        <QueryClientProvider client={queryClient}>
        <Layout>
            {isLoading ? <Loading/> : <Component {...pageProps}/>}
        </Layout>
        </QueryClientProvider>
        </UserContext.Provider>
     )
}