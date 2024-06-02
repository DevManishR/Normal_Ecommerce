import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";

function App() {
 
  
  return (
    <> 
   <Routing/>
   <ToastContainer />
   </>
  );
}

export default App;
