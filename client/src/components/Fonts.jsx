import { useState } from 'react'

function Fonts({ fonts }) {

    const [sampleText, setSampleText] = useState('Sample Text')

    const handleInput = (text) => {
        setSampleText(text)
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 py-16 px-20 text-4xl'>
            <h1 className=''>Test Text:</h1>
            <textarea rows="2" placeholder='Enter Sample Text..' style={{ resize: 'none' }} onChange={(e) => handleInput(e.target.value)} value={sampleText}
                className=' w-full rounded-2xl border-[#E3E3E3] border-4 p-4 text-xl bg-[#fcfcf9]'></textarea>
            <div className='flex flex-col gap-2 overflow-scroll'>
                {
                fonts.map((font, index) => (
                    <div key={index} className="w-full pb-8 bg-[#fcfcf9] py-2 px-3 bg-clip-padding backdrop-filter backdrop-blur-sm drop-shadow-xl border-4 border-[#E3E3E3]">
                        <h1 className='text-xl'>{font.name}</h1>
                        <h2 className='text-sm text-zinc-400 mb-1'>{font.author}</h2>
                        <p className='text-2xl text-zinc-600 break-all max-w-full'>{sampleText}</p>
                    </div>
                ))
                }
            </div>
            
        </div>
    )
}

export default Fonts