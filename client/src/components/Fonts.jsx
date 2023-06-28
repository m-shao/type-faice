import { useState } from 'react'

function Fonts({ fonts }) {

    const [sampleText, setSampleText] = useState('Sample Text')
    const [bold, setBold] = useState(false)

    const handleInput = (text) => {
        setSampleText(text)
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 py-16 px-20 text-4xl'>
            <h1 className=''>Test Text:</h1>
            <div className='flex gap-2'>
                <textarea rows="1" placeholder='Enter Sample Text..' style={{ resize: 'none' }} onChange={(e) => handleInput(e.target.value)} value={sampleText}
                className=' w-full rounded-2xl border-[#E3E3E3] border-4 p-4 text-xl bg-[#fcfcf9]'></textarea>
                <button onClick={() => {setBold((prevState) => !prevState)}} className='bg-zinc-300 px-4 rounded-xl border-4 border-zinc-400 font-serif font-bold my-[3px] text-md'>B</button>
            </div>
            
            <div className='flex flex-col gap-2 overflow-scroll'>
                {
                fonts.map((font, index) => (
                    <div key={index} className={"w-full pb-8 bg-[#fcfcf9] py-2 px-3 bg-clip-padding backdrop-filter backdrop-blur-sm drop-shadow-xl border-4 border-[#E3E3E3] " 
                    + (bold && "font-bold")}style={{fontFamily:font.name}}>
                        <h1 className='text-xl'>{font.name}</h1>
                        <h2 className='text-sm text-zinc-400 mb-1'>{font.variants} Styles</h2>
                        <p className='text-2xl text-zinc-600 break-all max-w-full'>{sampleText}</p>
                    </div>
                ))
                }
            </div>
            
        </div>
    )
}

export default Fonts