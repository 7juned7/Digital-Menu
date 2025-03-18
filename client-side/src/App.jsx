import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { RestaurantContexts } from "./Contexts/RestaurantsContext";


import HomePage from "./pages/HomePage";
import Register from "./pages/Register";

function App() {
  const { restaurantId } = useContext(RestaurantContexts);

  return (



    <Routes>
      <Route path={`/${restaurantId}`} element={<HomePage />} />
      <Route path="/register" element={<Register />} />
    </Routes>


  );
}

export default App;
