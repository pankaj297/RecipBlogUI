import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const FavouriteRecipe = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const { auth } = useContext(AuthContext); 
  const getFavourites = async () => {
    try {
      const { data } = await axios.get(
        `https://recipblognodejs.onrender.com/api/v1/favouriteRecipes/getFavourite/${auth?.user?._id}`
      ); 
      setFavouriteRecipes(data.favRecipes);
    } catch (error) { 
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  const removeFromFavourite = async (rId) => {
    try {  
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BURL
        }/api/v1/favouriteRecipes/removeFromFavourite/${auth?.user?._id}/${rId}`
      );
      toast("Removed from Favourites"); 
      getFavourites();
    } catch (error) { 
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="customPadding recipe">
        <h2>Favourite Recipes</h2>
        <div className="recipes">
          {favouriteRecipes.length <= 0 ? "Nothing added to favourates" : ""}
          {favouriteRecipes?.map((item, index) => (
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
                  {item?.recipeName?.length > 20
                    ? item.recipeName.split("", 20).concat("..")
                    : item.recipeName}
                </h3>
                <p>
                  {item.recipe.length > 30
                    ? item.recipe.split("", 137).concat("...")
                    : item.recipe}
                </p>
                <div className="btn">
                  <MdDelete onClick={() => removeFromFavourite(item._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteRecipe;
