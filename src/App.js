import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./components/dashboardItems/Main";
import CreateUser from "./components/users/CreateUser";
import UserList from "./components/users/UserList";
import ViewProject from "./components/project/ViewProject";
import CreateProject from "./components/project/CreateProject";
import ProjectTable from "./components/project/ProjectTable";
import TaskTable from "./components/Task/TaskTable";
import Report from "./components/Report/Report";
import Login from "./pages/Login&signup/Login";
import EditUser from "./components/users/EditUser";
import EditProject from "./components/project/EditProject";
import { UserProvider } from "./UserContext";
import EditTask from "./components/Task/EditTask";
import EditActivity from "./components/Activity/EditActivity";
import GanttChart from "./components/GoogleChart/GanttChart";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/portal" element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path="userList" element={<UserList />} />
            <Route path="createUser" element={<CreateUser />} />
            <Route path="viewProject/:id" element={<ViewProject />} />
            <Route path="createProject" element={<CreateProject />} />
            <Route path="projectList" element={<ProjectTable />} />
            <Route path="task" element={<TaskTable />} />
            <Route path="report" element={<Report />} />
            <Route path="editProject/:id" element={<EditProject />} />
            <Route path="editUser/:id" element={<EditUser />} />
            <Route path="editTask/:id" element={<EditTask />} />
            <Route path="editActivity/:id" element={<EditActivity />} />
          </Route>
          {/* <Route path="/chart" element={<GanttChart />} /> */}
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
