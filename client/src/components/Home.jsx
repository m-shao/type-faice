
function Home({ setPageNum }) {
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
            <h1 className='text-5xl font-medium text-center'>Welcome to TYPE FAICE</h1>
            <p className='text-gray-600 text-xl max-w-lg text-center'>We know choosing that perfect typeface for your next project is hard and painful</p>
            <p className='text-gray-600 text-xl max-w-xl text-center'>Why don’t we ask our good friend <br />✨<u>Artificial Intelligence</u>✨</p>
            <button onClick={() => {setPageNum(2)}} className='mt-4 bg-gradient-to-br from-rose-400 to-orange-200 text-white px-6 py-3 rounded-lg text-lg flex'>Get Started &nbsp;  <span>&#8594;</span></button>
        </div>
    )
}

export default Home