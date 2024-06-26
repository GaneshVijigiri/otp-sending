import { ToastContainer } from 'react-toastify';
import './App.css';
import Sender from './Components/OtpSending/Sender';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Sender />
      <ToastContainer />
    </div>
  );
}

export default App;
