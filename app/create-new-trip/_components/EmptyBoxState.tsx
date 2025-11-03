import { suggestions } from '@/components/Hero'
import React from 'react'

const EmptyBoxState = ({ onSelectOption } : any) => {
  return (
    <div className='mt-7'>
        <h2 className='text-2xl font-bold text-center' >Start Planning Your new <strong className='text-primary'>Trip</strong> using our AI</h2>
        <p className='text-center text-gray-500 mt-2'>Enter your travel plans and let our AI do the rest.</p> 

        <div className="flex flex-col justify-center gap-4 mt-10">
                  {suggestions.map((item) => (
                    <div
                      key={item.title}
                      onClick={() => onSelectOption(item.title)}
                      className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:bg-blue-300 hover:text-white transition-all duration-300"
                    >
                      {item.icon}
                      <p className="text-lg font-medium text-gray-500">{item.title}</p>
                    </div>
                  ))}
                </div>
        
    </div>
  )
}

export default EmptyBoxState
