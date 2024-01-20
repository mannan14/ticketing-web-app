type TicketCardProps = {
    ticket:{
        topic: string,
        description: string,
        dateCreated: Date,
        severity: string,
        type: string,
        assignedTo: string, // Support Agent ID
        status: "New"|"Assigned"|"Resolved",
        resolvedOn: Date|string
    };
}

const TicketCard = ({
    ticket
}:TicketCardProps) => {

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

    return (
        <div className='flex border-2 h-1/3 w-full border-black bg-neutral-700 hover:bg-neutral-600 rounded-xl p-2 text-white'> 
            <div className="flex flex-col justify-around w-1/2">
                <h2>
                    Topic:
                    <span className='mx-2'>{ticket.topic}</span>
                </h2>
                <p>
                    Date Created:
                    <span className='mx-2'>{convertDate(ticket.dateCreated)}</span>
                </p>
                <p>
                    Severity:
                    <span className='mx-2'>{ticket.severity}</span>
                </p>
                <p>
                    Description:
                    <span className='mx-2 whitespace-pre-wrap'>{ticket.description}</span>
                </p>
            </div>
            <div className="flex flex-col justify-around w-1/2">
                <p>
                    Type:
                    <span className='mx-2'>{ticket.type}</span>
                </p>
                <p>
                    Assigned To:
                    <span className='mx-2'>{ticket.assignedTo}</span>
                </p>
                <p>
                    Status:
                    <span className='mx-2'>{ticket.status}</span>
                </p>
                {/* Show only when status = Resolved */}
                {
                    (ticket.status === "Resolved")
                    ?
                    (
                    <p>
                        Resolved On:
                        <span className='mx-2'>{convertDate(ticket.resolvedOn)}</span>
                    </p>
                    ):
                    (
                    // <button>Resolved</button>
                    null
                    )
                }
            </div>
        </div>
    )
}

export default TicketCard