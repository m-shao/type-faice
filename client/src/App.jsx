import background from './images/bgnd.png'
import { useState } from 'react'
import Home from './components/Home'
import PromptEntry from './components/PromptEntry'

function App() {

    const [pageNum, setPageNum] = useState(1)


    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <h1 className='fixed top-6 left-6 text-4xl'>TYPE <br /> F<span className='bg-gradient-to-br from-pink-500 to-orange-200 bg-clip-text text-transparent'>AI</span>CE</h1>
            < div className=" h-[75vh] w-[65vw] bg-[#FFF4EA] rounded-[3rem] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 drop-shadow-xl border-4 border-[#E3E3E3]">
                {pageNum === 1 && <Home setPageNum={setPageNum}/>}
                {pageNum === 2 && <PromptEntry setPageNum={setPageNum}/>}
            </div>
        </div>
    )
}

export default App