import logo from './logo.svg';
import Home from './Home';
import Game from './Game';
import Navbar from './Navbar';
import PageNotFound from './PageNotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return ( 
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>  
          <Route path="/play" element={<Game />}></Route>
          {/* <Route path="/tournaments" element={<Tournaments />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/customise" element={<Customise />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>*/}
          <Route path="*" element={<PageNotFound />}></Route> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
