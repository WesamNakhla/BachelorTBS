import Router from "./router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = ()=>{
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router />
    </>
  );
}
export default App;