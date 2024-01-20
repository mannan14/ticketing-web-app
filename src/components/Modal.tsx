import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useTicketContext } from './TicketContext'

type ModalProps = {
    open: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({
    open, 
    setIsOpen
}:ModalProps) => {  
    const {getTickets} = useTicketContext()
    let [ticket, setTicket] = useState<{
        topic: string,
        description: string,
        severity: string,
        type: string,
        status: "New"|"Assigned"|"Resolved",
        resolvedOn: Date|string
        // assinged in the backend 
        // assignedTo: string, 
        // dateCreated: Date,
       }>({
        topic: "",
        description: "",
        severity: "",
        type: "",
        // set to New
        status: "New",
        resolvedOn: "",
        // Support Agent ID
        // assignedTo: "", 
        // dateCreated: new Date(),
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTicket((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    function closeModal() {
        setIsOpen(false)
    }

    function CreateTicket(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(ticket)
        // if(ticket.topic === "" || ticket.description === "" || ticket.severity === "" || ticket.type === ""){
        //     alert("Please fill all the fields")
        //     return
        // }
        axios.request({
            headers: {
                "content-type": "application/json"
            },
            method:'POST',
            url:`${import.meta.env.VITE_SERVER_URL}/support-tickets`,
            data: JSON.stringify(ticket),
        }).then((res)=>{
            console.log(res);
            setTicket({
                topic: "",
                description: "",
                severity: "",
                type: "",
                status: "New",
                resolvedOn: ""
            })
            setIsOpen(false)
            alert('Ticket created successfully')
            getTickets()
        })
        .catch((err:any)=>{
            console.log(err);
        })
    }

    return (
        <>
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Create New Ticket
                            </Dialog.Title>
                            <form action="" onSubmit={CreateTicket} className='flex flex-col space-y-4 mt-2 w-full'>
                                <input 
                                    type="text" 
                                    required={true}
                                    className="p-1.5 rounded-md border-2 placeholder:text-black" 
                                    placeholder='Topic' 
                                    name='topic' 
                                    id="topic" 
                                    value={ticket.topic} 
                                    onChange={(e)=>onInputChange(e)}
                                />
                                <select 
                                    required={true}
                                    className='p-1.5 rounded-md border-2 placeholder:text-black' 
                                    name="severity" 
                                    id="severity" 
                                    onChange={(e)=>onInputChange(e)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <input 
                                    type="text" 
                                    required={true}
                                    className="p-1.5 rounded-md border-2 placeholder:text-black" 
                                    placeholder='Type' 
                                    name='type' 
                                    id="type" 
                                    value={ticket.type} 
                                    onChange={(e)=>onInputChange(e)}
                                />
                                <textarea
                                    name="description" 
                                    id="description" 
                                    required={true}
                                    className='p-1.5 rounded-md border-2 placeholder:text-black'
                                    placeholder='Description'
                                    cols={30} 
                                    rows={10} 
                                    value={ticket.description}
                                    onChange={(e)=>onInputChange(e)}
                                />

                                <div className="mt-4">
                                    <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    // onClick={CreateTicket}
                                    >
                                    Create Ticket
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}

export default Modal