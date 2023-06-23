import { useState } from 'react'

function PromptEntry({ setPageNum }) {

    const [textFieldValue, setTextFieldValue] = useState('')
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setTextFieldValue(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        // Use the textFieldValue as needed
        console.log(textFieldValue)
        
        try {
            const prompt = "give me 5 google font recommendations for the following prompt: " + textFieldValue + ". do not give any other information, only the 5 font recommendations in an ordered list";

            const response = await fetch(`http://localhost:3000/api/chat?input=${encodeURIComponent(prompt)}`);
            const data = await response.text();

            // Set the received message in state
            setMessage(data);
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        }
        // setPageNum(3)
    }

    return (
        <form className='flex flex-col w-full h-full py-16 px-20' onSubmit={handleSubmit}>
            <h1 className='text-4xl mb-4'>Tell Us About Your Idea:</h1>
            <textarea value={textFieldValue} onChange={handleInputChange} cols="30" rows="10" placeholder='Website that sells...'
            className='flex-1 w-ful rounded-2xl border-[#E3E3E3] border-4 p-4 text-xl bg-[#F2F2F2] bg-opacity-60'></textarea>
            <div className='w-full'>
                <button type='submit' className='mt-4 bg-gradient-to-br from-rose-400 to-orange-200 text-white px-6 py-3 rounded-lg text-lg flex'>Generate Fonts&nbsp; <span>&#8594;</span></button>
            </div>
            <h1>{message}</h1>
            
        </form>
    )
}

export default PromptEntry