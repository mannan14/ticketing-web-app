import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AgentCreation = () => {
    const navigate = useNavigate();
    const [agent, setAgent] = useState<{
        agent_name: string;
        email: string;
        phone: string;
        description: string;
    }>({
        agent_name: "",
        email: "",
        phone: "",
        description:""
    })
    // const [description,setDescription] = useState('') 
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAgent((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const OnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newAgent = {
            name:agent.agent_name,
            email:agent.email,
            phone:agent.phone,
            description:agent.description,
            // Other details added in the backend
            // active: false,
            // dateCreated: new Date(),
        }   

        axios.request({
            headers: {
                "content-type": "application/json"
            },
            method:'POST',
            url:`${import.meta.env.VITE_SERVER_URL}/support-agents`,
            // url:`https://localhost:3000/api/support-agents`,
            data: JSON.stringify(newAgent),
        }).then((res)=>{
            alert('Agent created successfully')
            console.log(res);
            setAgent({
                agent_name:"",
                email:"",
                phone:"",
                description:""
            })
            // setDescription('')
            navigate('/create-ticket',{replace:true})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='h-screen pt-20'>
            <form onClick={(e) => OnSubmit(e)} className='flex flex-col text-black max-w-xl p-6 mx-auto space-y-4 rounded-lg      shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
                <h1 className='text-black text-center text-2xl'>Create agent</h1>
                <input 
                    type="text" 
                    required 
                    className="p-1.5 rounded-md border-2 placeholder:text-black" 
                    placeholder='Name' 
                    name='agent_name' 
                    id="name" 
                    value={agent.agent_name} 
                    onChange={(e)=>onInputChange(e)} />
                <input 
                    type="email" 
                    required 
                    className="p-1.5 rounded-md border-2 placeholder:text-black" 
                    placeholder='Email' 
                    name='email' 
                    id="email" 
                    value={agent.email} 
                    onChange={(e)=>onInputChange(e)}
                />
                <input 
                    type="tel" 
                    className="p-1.5 rounded-md border-2 placeholder:text-black" 
                    id="phone" 
                    pattern="[0-9]{10}"
                    required
                    minLength={10}
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="Phone Number"
                    name="phone"
                    value={agent.phone} 
                    onChange={(e)=>onInputChange(e)}
                />
                <textarea
                    name="description" 
                    id="description" 
                    className='p-1.5 rounded-md border-2 placeholder:text-black'
                    placeholder='Description'
                    cols={30} 
                    rows={10} 
                    value={agent.description}
                    onChange={(e)=>onInputChange(e)}
                />
                {/* <div className="flex justify-around"> */}
                    <button type="submit" className='m-auto text-black p-2 border-2 border-black w-40 rounded-lg hover:bg-slate-900 hover:text-white ease-in-out duration-200'>Create Agent</button>
                    <hr/>
                    <Link to={'/create-ticket'} className='m-auto text-black p-2 border-2 border-slate-300 w-40 rounded-lg hover:border-black ease-in-out duration-200'>Create a new Ticket</Link>
                {/* </div> */}
            </form>
        </div>
    )
}

export default AgentCreation