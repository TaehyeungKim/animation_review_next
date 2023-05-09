import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import { AppProps } from "next/app";
import Layout from '@/components/Layout';
import "./style_initialize.css"
import "./fonts/Font-Face.module.css";


const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {



     return (
        <QueryClientProvider client={queryClient}>
        <Layout>
            <Component {...pageProps}/>
        </Layout>
        </QueryClientProvider>
     )
}