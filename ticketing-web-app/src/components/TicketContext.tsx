import {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';


interface TicketContextProp {
    tickets: {
        topic: string,
        description: string,
        dateCreated: Date,
        severity: string,
        type: string,
        assignedTo: string, // Support Agent ID
        status: "New"|"Assigned"|"Resolved",
        resolvedOn: Date|string
    }[];
    setTickets: React.Dispatch<React.SetStateAction<never[]>>;
    getTickets: (page?:number, sort?:string) => void;
    NextPage: () => void;
    PrevPage: () => void
}

const TicketContext = createContext({} as TicketContextProp)

const TicketProvider= ({children}:any) => {
    const [tickets,setTickets] = useState([])
    const [page,setPage] = useState(0)
    const [sort, setSort] = useState<string>("dateCreated")
    const [params] = useSearchParams();
    const get_page = params.get("page")
    const get_sort = params.get("sort");
    
    useEffect(()=>{
        if(get_page===null){
            setPage(0)
        }
        else{
            setPage(parseInt(get_page))
        }
        if(get_sort===null){
            setSort("dateCreated")
        }
        else{
            setSort(get_sort)
        }
        console.log(page, sort)
    },[page, sort])

    useEffect(()=>{
        // Get all the tickets
        // console.log(page, sort)
        getTickets(0,"dateCreated")
    },[page,sort])

    async function getTickets(page?:number, sort?:string) {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/support-tickets?page=${page}&sort=${sort}`
        // {
        //     params:{
        //       page:page,
        //       sort:sort
        //     },
        // }
        )
        .then((res)=>{
            console.log(res.data)
            setTickets(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const navigate = useNavigate();
    const NextPage = () => {
        if(tickets.length === 0){
        alert("No tickets to fetch")
        }
        else{
        setPage(page+1) 
        navigate(`/tickets?page=${page+1}&sort=${sort}`)
        console.log(page)
        }
    }

    const PrevPage = () => {
        if(page >= 1){
        setPage(page-1)
        navigate(`/tickets?page=${page-1}&sort=${sort}`)
        }
        if(page === 0){
        alert("No previous page")
        }
    }

    return (
        <TicketContext.Provider value={{
            tickets,
            getTickets,
            setTickets,
            NextPage,
            PrevPage,
        }}>
            {children}
        </TicketContext.Provider>
    )
}

const useTicketContext = () => {
    const context = useContext(TicketContext);
    if (!context) {
      throw new Error('useTicketContext must be used within the AccountProvider');
    }
    return context;
  };

export {TicketProvider, useTicketContext, TicketContext}