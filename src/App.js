import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import PrivateRoute from "./Route/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import VideoUpload from "./components/videoUpload";
import './App.css';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }/>
  <Route path="/upload" element={
 <PrivateRoute adminOnly={true} >
  <VideoUpload/>
 </PrivateRoute>
  }/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
