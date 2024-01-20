// import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { Navigation, TicketCard } from '../components'
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useTicketContext } from '../components/TicketContext'

const TicketEntry = () => {
  const {tickets, NextPage, PrevPage} = useTicketContext()
  // const [tickets,setTickets] = useState<{
  //   topic: string,
  //   description: string,
  //   dateCreated: Date,
  //   severity: string,
  //   type: string,
  //   assignedTo: string, // Support Agent ID
  //   status: "New"|"Assigned"|"Resolved",
  //   resolvedOn: Date|string
  // }[]>([])
  const convertDate = (toDate:Date|string|undefined) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(toDate){
        const date = new Date(toDate).getDate();
        const month = new Date(toDate).getMonth();
        const year = new Date(toDate).getFullYear();
        return `${date} ${monthNames[month]} ${year}`
    }
    else{
        return "-"
    }
  }

  useEffect(()=>{
    // Get all the tickets
    // axios.get(`${import.meta.env.VITE_SERVER_URL}/support-tickets?page=${page}&sort=${sort}`)
    // .then((res)=>{
    //     console.log(res)
    //     // setTickets(res.data)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
    console.log(tickets)
  },[])

  return (
    <div className='flex flex-col h-screen max-h-screen'>
      <Navigation/>
      <div className="flex flex-grow owerflow-y-auto p-4">
        <div className="w-full lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
          {
            (tickets.length > 0) 
            ? 
              (
                tickets.map((ticket,index) => 
                (
                  <TicketCard ticket={ticket} key={index}/>
                ))
                ) 
                : 
                (    
                <div className="flex flex-col justify-center items-center w-full h-full">No Tickets Yet</div>
                )
              }
          </div>
        </div>
      <div className="flex flex-row p-4">
        <button onClick={PrevPage} className="text-black p-1.5 mx-auto border-2 border-black w-24 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200">Prev</button>
        <button onClick={NextPage} className="text-black p-1.5 mx-auto border-2 border-black w-24 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200">Next</button>
      </div>
    </div>
  )
}

export default TicketEntry