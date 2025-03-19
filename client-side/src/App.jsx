import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { RestaurantContexts } from "./Contexts/RestaurantsContext";


import HomePage from "./pages/HomePage";
import Register from "./Pages/Accounts/Register";
import ForgetPassword from "./Pages/Accounts/ForgetPassword";

function App() {
  const { restaurantId } = useContext(RestaurantContexts);

  return (



    <Routes>
      <Route path={`/${restaurantId}`} element={<HomePage />} />
      <Route path="/" element={<Register />} />
      <Route path="/accounts/forgetPassword" element={<ForgetPassword />} />
    </Routes>


  );
}

export default App;
