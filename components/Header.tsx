import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const menuOptions = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'About',
        path: '/about',
    },
    {
        name: 'Contact',
        path: '/contact',   
    },
]

const Header = () => {
  return (
    <div className='flex justify-between items-center p-6'>
        {/* Logo */}
        <div className='flex items-center gap-2' >
            <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
            <h2 className='font-bold text-2xl'>Neura</h2>
        </div>

        {/* Menu */}
        <div className='flex items-center gap-8' >
            {menuOptions.map((item) => (
                <Link key={item.name} href={item.path} className='text-sm font-medium text-gray-500 hover:text-gray-700'>
                    <h2 className='text-lg hover:text-primary font-bold hover:scale-105 transition-all duration-300'>{item.name}</h2>
                </Link>
            ))}
        </div>

        <Button>Get Started</Button>
    </div>
  )
}

export default Header
