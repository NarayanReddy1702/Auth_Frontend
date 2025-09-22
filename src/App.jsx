
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectRouter from "./middleware/ProtectRouter";
import AllUserData from "./components/AllUserData";
import Update from "./components/Update";
import Profile from "./components/Profile";


const App = () => {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ProtectRouter><Home/></ProtectRouter>} />
          <Route path="/allUser" element={<ProtectRouter><AllUserData/></ProtectRouter> } />
          <Route path="/profile" element={<ProtectRouter><Profile/></ProtectRouter>} />
          <Route path="/update/:userId" element={<Update/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
