import { createContext } from "react";

const TasksContext = createContext({
    tasks:[],
    disabled:'disabled',
    disabledAdd:null,
    id:null,
    addTask: ()=>{},
    // editTask: ()=>{},
    clickedAdd: ()=>{},
    clickTaskHandler: ()=>{},
    onclick: ()=>{}
})

export default TasksContext