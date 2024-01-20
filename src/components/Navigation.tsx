import { useState } from 'react'
import { Link } from "react-router-dom"
import Modal  from './Modal'

const Navigation = () => {
    const [open,setIsOpen] = useState(false)

    return (
      <>
        <div className="flex justify-around items-center w-full text-black p-4 shadow-md">
          <h1 className='text-2xl font-semibold'>Ticketing System</h1>
          <div className="">
            <button onClick={()=>setIsOpen(true)} className="text-black p-1.5 mx-3 border-2 border-black w-32 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200">Create Ticket</button>
            {/* <Link onClick={()=>navigate('/create-ticket',{replace:true})} className="text-black mx-auto p-1.5 border-2 border-black w-32 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200">Create Agent</Link> */}
            <Link to={'/'} className='text-black p-1.5 mx-3 border-2 border-black w-32 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200'>Create Agent</Link>
          </div>
        </div>
        <Modal open={open} setIsOpen={setIsOpen}/>
      </>
  )
}

export default Navigation