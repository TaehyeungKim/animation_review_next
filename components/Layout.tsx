import Header from './Header/Header'
import React, { useEffect } from 'react';

interface LayoutProps {
    children: React.ReactNode,
}

export default function Layout({ children }:LayoutProps) {

    return(
        <>
        <Header/>
        {children}
        </>
    )
}