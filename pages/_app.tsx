import React, {useState, useEffect, Suspense} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import { AppProps } from "next/app";
import Layout from '@/components/Layout';
import "./style_initialize.css"
import "./fonts/Font-Face.module.css";
import '@/components/Loading/Loading'
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/router';
import { sleep } from '@/utils/utilfuncs';


const queryClient = new QueryClient();


export default function App({Component, pageProps}: AppProps) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const updateLoading = (loading:boolean) => {
        setIsLoading(loading);
    }


    useEffect(()=>{
        router.isReady && (async()=>{
            await sleep(1000)
            updateLoading(false)})()
    },[router.isReady])

     return (
        <QueryClientProvider client={queryClient}>
        <Layout>
            {isLoading ? <Loading/> : <Component {...pageProps}/>}
        </Layout>
        </QueryClientProvider>
     )
}