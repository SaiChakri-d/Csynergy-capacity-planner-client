import React, { useState, useEffect } from "react";
import { createContext } from "react";

let UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [project, setProject] = useState([]);
  const [tasker, setTasker] = useState([]);
  const [passTaskTable, setPassTaskTable] = useState([]);
  const [particular, setParticular] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [stack, setStack] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      setAdmin(true);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
        userName,
        setUserName,
        signIn,
        setSignIn,
        employee,
        setEmployee,
        project,
        setProject,
        tasker,
        setTasker,
        passTaskTable,
        setPassTaskTable,
        particular,
        setParticular,
        projectId,
        setProjectId,
        refresh,
        setRefresh,
        stack,
        setStack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
