import React from "react"
import {FaHome , FaTable} from "react-icons/fa"


export const SidebarData = [
{
    title: 'Data Gallery',
    path : '/',
    icon : <FaTable size={20}/>,
},
{
    title:'Run Model',
    path:'/run_model',
    icon : <FaHome size={20}/>,
}


]