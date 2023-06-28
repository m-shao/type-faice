import { useState, useEffect } from 'react'

function PromptEntry({ setPageNum, pageNum, setMessage }) {

    const [textFieldValue, setTextFieldValue] = useState('')
    const [rep, setRep] = useState('');
    const [font , setFont] = useState({});

    const handleInputChange = (event) => {
        setTextFieldValue(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        // Use the textFieldValue as needed
        setPageNum(3);
        setTimeout( async () => {
            try {
                const prompt = "give me 10 google font recommendations for the following prompt: " + textFieldValue + ". do not give any other information, no response text, only the 10 font recommendations in an ordered list";

                const response = await fetch(`http://localhost:3000/api/suggestions?input=${encodeURIComponent(prompt)}`);
                const data = await response.text();

                // const fontData = await fetch(`http://localhost:3000/api/fonts?input=${"Montserrat"}`);
                // console.log(fontData.text());
                console.log(data)
                // Set the received message in state
                setRep(data);
            } catch (error) {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            }
        }, 100);
    }

    function parseString(inputString) {
        return inputString.split(/\d+\.\s/);
    }

    useEffect(() => {
        setMessage(parseString(rep).slice(1));
    }, [rep]) 

    return (
        <form className={'flex flex-col w-full h-full py-16 px-20 ' + (pageNum == 3 && "opacity-0")} onSubmit={handleSubmit} >
            <h1 className='text-4xl mb-4'>Tell Us About Your Idea:</h1>
            <textarea value={textFieldValue} onChange={handleInputChange} cols="30" rows="10" placeholder='Website that sells...' style={{ resize: 'none' }}
            className='flex-1 w-ful rounded-2xl border-[#E3E3E3] border-4 p-4 text-xl bg-[#F2F2F2] bg-opacity-60'></textarea>
            <div className='w-full'>
                <button type='submit' className='mt-4 bg-gradient-to-br from-rose-400 to-orange-200 text-white px-6 py-3 rounded-lg text-lg flex'>Generate Fonts&nbsp; <span>&#8594;</span></button>
            </div>
            <h1>{rep}</h1>
        </form>
    )
}

export default PromptEntry