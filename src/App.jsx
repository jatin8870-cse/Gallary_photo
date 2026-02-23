import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  
  const [UserData, setUserData] = useState([])

   const [index, setindex] = useState(1)



  const   getdata = async () => {
    const responce =  await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=100`)
    // console.log(responce.data);
    setUserData(responce.data)
  }



  useEffect(function (){
   getdata()
},[index])

  let printUserData = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-x-1/2  '>Loading....</h3>
  if(UserData.length>0){
    printUserData = UserData.map((user, idx) => (
     <div key={idx}>
      <a href={user.url} target='_blank'>
       <div className='h-40 w-44  rounded-xl overflow-hidden'>
        <img className='h-full w-full object-cover' src={user.download_url} alt={user.author} />
      </div>
      <h1 className='font-bold text-lg'>{user.author}</h1>
      </a>
     </div>
    ))
  }

  return (
    <div className="overflow-auto bg-black p-5 text-white h-screen">
    <h1>{index}</h1>
    <div className='flex  flex-wrap gap-4 mt-5  py-2'>
       {printUserData}

    </div>

    <div  className='flex justify-center p-4 gap-5 mt-10 '>
       
       <button style={{opacity: index <= 1 ? 0.5 : 1}}
       className='bg-amber-400 text-black  cursor-pointer active:scale-95  rounded  py-2 px-4 font-semi-bold'
       onClick={() =>{
        if(index > 1){
          setindex(index - 1)
          setUserData([])
        } 
       }} >
        Prev
        </button>

       <button
  className={`text-lg font-bold text-white px-4 py-2 cursor-pointer ${
    index <= 1 ? 'opacity-50 pointer-events-none' : ''
  }`}
  onClick={() => {
    const newPage = parseInt(prompt("Go to page number:"), 10);
    if (!isNaN(newPage) && newPage > 0) {
      setindex(newPage);
      setUserData([]);
    }
  }}
>
  Page {index}
</button>


       
       <button 
       className='bg-amber-400  text-black cursor-pointer active:scale-95 rounded py-2 px-4 font-semi-bold ' 
       onClick={() =>{

        setindex(index + 1)
        setUserData([])
       }} >
        Next
        </button>
    </div>

   </div>
  
  )
}

export default App

