import Header from '@/components/Header';
import React from 'react'

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <Header />
       {children}
    </div>
  )
}

export default Provider
