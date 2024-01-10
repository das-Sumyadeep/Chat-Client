import "./App.css";
import { Suspense, lazy } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const Chat = lazy(() => import("./Pages/Chat"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const SetAvatar = lazy(() => import("./Pages/SetAvatar"));

function App() {
  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/" element={<Chat/>}/>
      </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App;
