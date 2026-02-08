import React from 'react'
import { targetData } from './TargetData'
import TargetCard from './TargetCard'

export default function Recommend() {
  return (
    <section className="
    w-full
    bg-[url(/bg-field.jpg)]
    bg-cover
    bg-center
    bg-no-repeat
  ">
    <div className='bg-black/80 flex justify-center flex-col items-center gap-20 py-40'>
      <div className='text-4xl font-bold text-white'>이런 분들이 배우면 좋아요!</div>
      {/* 여기서 사진 카드 5개*/}
    <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {targetData.map((text, index) => (
            <TargetCard key={index} text={text} />
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}
