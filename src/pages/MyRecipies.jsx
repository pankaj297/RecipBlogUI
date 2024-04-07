import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const MyRecipies = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const getMyRecipes = async () => {
    try {
      const { data } = await axios.get(
        `https://recipblognodejs.onrender.com/api/v1/recipes/myRecipes/${auth?.user?._id}`
      );
      setMyRecipes(data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getMyRecipes();
  }, []);

  const updateRecipe = (recipeId) => {
    navigate(`/updateRecipe/${recipeId}`);
  };

  const deleteRecipe = async (recipeId) => {
    if (!auth.token) {
      return toast.error("Please Login !");
    }

    try {
      if (confirm("Are you shure you want to delete") === true) {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BURL}/api/v1/recipes/deleteRecipe/${recipeId}`
        );
        toast.success("Recipe Deleted");
        getMyRecipes();
      }
    } catch (error) {
      toast.error("Unable to Delete Recipe");
    }
  };

  return (
    <div>
      <div className="customPadding recipe">
        <h2>My Recipes</h2>
        <div className="recipes">
          {myRecipes.length <= 0 ? "No Recipe added by You" : ""}

          {myRecipes?.map((item, index) => (
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
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div className="btn">
                    <MdDelete onClick={() => deleteRecipe(item._id)} />
                  </div>

                  <div className="btn" style={{ color: "black" }}>
                    <CiEdit
                      onClick={() => updateRecipe(item._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRecipies;
