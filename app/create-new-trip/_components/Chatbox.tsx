"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Send } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const Chatbox = () => {

    const { user } = useUser();

  const onSend = () => {
    if (!user) {
      redirect("/sign-in");
      return;
    }
    redirect("/create-new-trip");
  }

  return (
    <div className='h-[83vh] flex flex-col'>
        {/* message */}
        <section className='flex-1 overflow-y-auto p-4'>
            <div className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                    User message
                </div>
            </div>
            <div className='flex justify-start mt-2'>
                <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                    Agent message
                </div>
            </div>
        </section>

        {/*  input */}
        <section>
            <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              placeholder="Enter your travel plans..."
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button size={"icon"} className="absolute bottom-3 right-5" onClick={() => onSend()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </section>
    </div>
  )
}

export default Chatbox
