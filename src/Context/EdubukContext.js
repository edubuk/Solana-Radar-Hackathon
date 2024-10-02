import React,{createContext, useState} from 'react'

export const EdubukContexts = createContext();
export const EdubukProvider = ({children}) => {
    const [studentName, setStudentName] = useState("");
    const [openSidebar, setOpenSidebar] = useState(false);
  
  return (
    <EdubukContexts.Provider
    value = {{
    studentName,
    setStudentName,
    openSidebar,
    setOpenSidebar}}
    >
        {children}
    </EdubukContexts.Provider>
  )
}

