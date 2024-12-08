import React from 'react'
import { useNavigate } from 'react-router-dom'
import { arr } from './data/arr'

const Home = () => {

    const navigate=useNavigate()

    const handleSubmit=(index)=>{
        console.log("kk")

        navigate(`/${index}`)
    }

  return (
    <div>
        {arr.map((value, index)=>(
            <div key={index}>
                <h1>{`${index} : ${value}`}</h1>
                <button type='button' onClick={()=>handleSubmit(index)} >Solve</button>
            </div>
        ))}
    </div>
  )
}

export default Home