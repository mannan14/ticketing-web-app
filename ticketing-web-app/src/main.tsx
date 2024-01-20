import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import { 
  AgentCreation,
  TicketEntry
} from './pages';
import { TicketProvider } from './components/TicketContext';

// const router = createBrowserRouter(
// //   [
// //   {
// //     path: "/",
// //     element: <AgentCreation/>,
// //   },
// //   {
// //     path: "/create-ticket",
// //     element: <TicketEntry/>,
// //   }
// // ]
// );


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <Router>
        <TicketProvider>
          <Routes>
            <Route path='/' element={<AgentCreation/>}/>
            <Route path='/create-ticket' element={<TicketEntry/>}/>
          </Routes>
        </TicketProvider>
      </Router>
  </React.StrictMode>,
)
