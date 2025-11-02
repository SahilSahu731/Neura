"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'

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

    const {user} = useUser();

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
        
        {!user ? <SignInButton mode='modal'>
            <Button>Get Started</Button>
        </SignInButton> :
        <Link href={'/create-trip'}>
            <Button>Create New Trip</Button>    
        </Link>
    }
    </div>
  )
}

export default Header
