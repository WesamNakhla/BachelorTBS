import Router from "./router";
import { ToastContainer } from "react-toastify/unstyled";
import 'react-toastify/dist/ReactToastify.css';
const App = ()=>{
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}
export default App;