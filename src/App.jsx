import "./App.css";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Recipes from "./components/Recipes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import FavouriteRecipe from "./pages/FavouriteRecipe";
import UserRoute from "./Routes/UserRoute";
import SingleRecipe from "./components/SingleRecipe";
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/MyProfile";
import MyRecipies from "./pages/MyRecipies";
import UpdateRecipe from "./pages/UpdateRecipe";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/recipes"} element={<Recipes />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />

          <Route element={<UserRoute />}>
            <Route path={"/addRecipe"} element={<AddRecipe />} exact />
            <Route path={"/myProfile"} element={<MyProfile />} exact />
            <Route path={"/myRecipes"} element={<MyRecipies />} exact />
            <Route
              path={"/updateRecipe/:rId"}
              element={<UpdateRecipe />}
              exact
            />
            <Route path={"/favouriteRecipe"} element={<FavouriteRecipe />} />
          </Route>

          {/* recipes */}
          <Route path={"/recipe/:_rId"} element={<SingleRecipe />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        
      <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
