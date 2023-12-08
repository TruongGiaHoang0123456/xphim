import './css/Global.scss'
import './css/Grid.scss'
import { Route, Routes } from "react-router-dom";

import routes from './routes';


function App() {
  return (
    <div>
      <Routes>
        {
          routes.map((route, index) => (
            <Route key={index} exact path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </div>
  );
}

export default App;
