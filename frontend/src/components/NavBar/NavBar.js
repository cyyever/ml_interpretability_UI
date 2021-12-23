import React from 'react'
import { SidebarData } from './SideBarData'
import {NavLink }  from 'react-router-dom'
function NavBar(){
   return(
       <div className= "sideBar col ">
           <ul className="sidebarList nav-offset">

            {SidebarData.map((val , key) => {
               return (
                    <li key = {key} className = "listRow">
                    <NavLink to={val.path} activeclassname="active">
                    <span className = 'icon'>{val.icon}</span>
                    <span className = 'title'>{val.title}</span>
                    </NavLink>
                
                   </li>                  
               )
           })}
        </ul>
        </div>
   )
}

export default NavBar


