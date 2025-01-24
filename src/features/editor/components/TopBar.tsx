import React from 'react'
import LabelButton from '@/components/ui/LabelButton';
import Image from 'next/image';

const TopBar = () => {
  return (
      <div className="flex items-center justify-between rounded-lg px-8 py-3 bg-[#1A1D24] border-t border-[#292C33]">
        <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="text-white text-base font-medium leading-normal">Player 1 (You)</div>
        <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <div className="w-10 h-10 py-2 rounded-md border border-[#232323] justify-center items-center inline-flex overflow-hidden" 
              key={num}
              >
              <p className="text-gray-500 text-base font-medium font-['Quicksand'] leading-normal">
                {num}
              </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LabelButton
            variant="outlined"
            customSize={{ width: '56px', height: '20px' }}
            className="text-sm whitespace-nowrap flex items-center gap-2"
          >
            <Image 
              src="/play.svg"
              alt="Run"
              width={20}
              height={20}
            />
            <span>Run</span>
          </ LabelButton>
          <LabelButton
            variant="filled"
            customSize={{ width: '56px', height: '20px' }}
            className="text-sm whitespace-nowrap flex items-center gap-2"
          >
            <Image
              src="/telegram-alt.svg"
              alt="Submit"
              width={20}
              height={20}
            />
            <span>Submit</span>
          </ LabelButton>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <div className="w-10 h-10 py-2 rounded-md border border-[#232323] justify-center items-center inline-flex overflow-hidden" 
              key={num}
              >
              <p className="text-gray-500 text-base font-medium font-['Quicksand'] leading-normal">
                {num}
              </p>
              </div>
            ))}
          </div>
          <div className="text-white text-base font-medium font-['Quicksand'] leading-normal">Player 2</div>
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        </div>
      </div>
  )
}

export default TopBar;
