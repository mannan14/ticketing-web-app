import { Navigation, TicketCard } from '../components'
import { useTicketContext } from '../components/TicketContext'

const TicketEntry = () => {
  const {tickets, NextPage, PrevPage} = useTicketContext()

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