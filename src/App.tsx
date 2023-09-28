import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import routesConfig from "./routes/routesConfig";

interface routeProps {
    path: string,
    element: React.ReactNode
}

function App() {
  return (
    <div className="app">
        <Routes>
            {routesConfig.map((route:routeProps, index:number) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    </div>
  );
}

export default App;
