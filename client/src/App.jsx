import background from './images/bgnd.png'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import PromptEntry from './components/PromptEntry'
import Fonts from './components/Fonts'
import Generating from './components/Generating'

function App() {

    const [pageNum, setPageNum] = useState(1)
    const [fonts, setFonts] = useState([])
    const [message, setMessage] = useState([]);

    function parseString(inputString) {
        return inputString.split(/\d+\.\s/);
    }

    useEffect(() => {
        if (message.length > 0) {
            message.forEach(async (font) => {
                try {
                    const fontData = await fetch(`http://localhost:3000/api/fonts?input=${font}`);
                    let data = await fontData.text();
                    data = JSON.parse(data);
                    console.log(data)
                    setFonts(fonts => [...fonts, {name: font, variants: data.items[0].variants.length}]);
                    var link = document.createElement('link');
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('href', `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@400;700&display=swap`);
                    document.head.appendChild(link);
                } catch (error) {
                    console.log(font + " can't be found")
                }
            })
            setPageNum(4);
        }
        
    }, [message])

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <h1 className='fixed top-6 left-6 text-4xl'>TYPE <br /> F<span className='bg-gradient-to-br from-pink-500 to-orange-200 bg-clip-text text-transparent'>AI</span>CE</h1>
            < div className=" h-[75vh] w-[65vw] bg-[#FFF4EA] rounded-[3rem] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 drop-shadow-xl border-4 border-[#E3E3E3] relative">
                {pageNum === 1 && <Home setPageNum={setPageNum}/>}
                {(pageNum === 2 || pageNum == 3) && <PromptEntry setPageNum={setPageNum} pageNum={pageNum} setMessage={setMessage}/>}
                {pageNum === 3 && <Generating/>}
                {pageNum === 4 && <Fonts fonts={fonts}/>}
            </div>
        </div>
    )
}

export default App