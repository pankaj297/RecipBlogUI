import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { auth } = useContext(AuthContext);
  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/api/v1/recipes/allRecipes`
      );
      setRecipes(data.result);
    } catch (error) { 
      
    }
  };

  const addToFavourite = async (recipeId) => {
    if (!auth?.token) {
      return toast.error("Please Login !");
    } 
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}/api/v1/favouriteRecipes/addToFavourite/${
          auth?.user?._id
        }/${recipeId}`
      ); 
      toast("Recipe added to Favourites");
    } catch (error) { 
      toast.error(error.response.data.message);
    } 
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="customPadding recipe">
      <div className="recipes">
        {recipes?.map((item, index) => (
          <div key={item._id} className="recipeCard">
            <Link to={`/recipe/${item._id}`} className="img">
              <img
                src={`${
                  import.meta.env.VITE_BURL
                }/api/v1/recipes/singleRecipeImg/${item._id}?${Date.now()}`}
                alt={item.recipeName}
              />
            </Link>
            <div className="data">
              <h3>
                {item.recipeName.length > 20
                  ? item.recipeName.split("", 20).concat("..")
                  : item.recipeName}
              </h3>
              <p>
                {item.recipe.length > 30
                  ? item.recipe.split("", 137).concat("...")
                  : item.recipe}
              </p>
              <div className="btn">
                <FaRegHeart onClick={() => addToFavourite(item._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
