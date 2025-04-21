import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import ScrumMasterView from './components/ScrumMasterView';
import EngineerView from './components/Engineer';


function App() {
  return (

      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/scrum-master" Component={ScrumMasterView}></Route>
          <Route path="/engineer" Component={EngineerView}></Route>
        </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;