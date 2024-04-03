import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import Comments from "./Comments";
const SingleRecipe = () => {
  const { auth } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({});
  const [recipeComments, setRecipeComments] = useState({});
  const [loader, setLoader] = useState(true);
  const [recipeUserData, setRecipeUserData] = useState({});
  const [recipedata, setRecipeData] = useState("");
  const params = useParams();
  const recipeId = params._rId;
  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/api/v1/recipes/singleRecipe/${recipeId}`
      );

      if (data) {
        setRecipe(data.result);
        fetchUser(data.result.user);
        setRecipeData(new Date(data.result.updatedAt).toLocaleString());
      }
    } catch (error) {
      toast.error("Unable to fetch Recipe");
      setLoader(false);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/api/v1/users/singleUser/${userId}`
      );
      if (data) {
        setRecipeUserData(data.result);
        fetchRecipeComments();
        setLoader(false);
      }
    } catch (error) {
      toast.error("Unable to fetch Recipe");
      setLoader(false);
    }
  };

  const fetchRecipeComments = async (userId) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BURL
        }/api/v1/comments/getAllCommentOfRecipe/${recipeId}`
      );

      if (data) {
        setRecipeComments(data.result);
      }
    } catch (error) {
      toast.error("Unable to fetch Comments");
    }
  };

  useEffect(() => {
    if (recipeId !== "" && recipeId !== null) {
      fetchRecipe();
    }
  }, [recipeId]);

  const getRecipeUser = async (id) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/api/v1/users/singleUser/${id}`
      );

      if (data) {
        return data;
      }
    } catch (error) {
      toast.error("Unable to fetch User");
    }
  };
  // chat

  const [commentsWithUsers, setCommentsWithUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!recipeComments.length <= 0) {
        const commentsWithUserDetails = await Promise.all(
          recipeComments?.map(async (item) => {
            const user = await getRecipeUser(item.user);
            return { comment: item, user };
          })
        );

        setCommentsWithUsers(commentsWithUserDetails);
      }
    };

    fetchData();
  }, [recipeComments]);

  return (
    <>
      {loader ? (
        "Loading..."
      ) : (
        <div className="customPadding singleRecipe">
          <h1>{recipe.recipeName}</h1>
          <h3>
            By - {recipeUserData.name} | Updated : {`${recipedata}`}
          </h3>
          <div className="flex singleRes">
            <div className="imgContent">
              <div className="spImg">
                {recipe._id && (
                  <img
                    className="recipeSpImg"
                    src={`${
                      import.meta.env.VITE_BURL
                    }/api/v1/recipes/singleRecipeImg/${recipe._id}`}
                    alt={recipe.recipeName}
                  />
                )}
              </div>
            </div>

            <div className="ingredients">
              <h2>Ingredients of {recipe.recipeName}</h2>
              {recipe.ingredients && typeof recipe.ingredients === "string"
                ? recipe.ingredients.split("\r\n").map((item, index) => (
                    <li className="paraSizing " key={index}>
                      {item}
                    </li>
                  ))
                : ""}
            </div>
          </div>
          <h2>How to make {recipe.recipeName}</h2>

          {recipe.recipe ? (
            <ol className="recipeUl ">
              {recipe.recipe
                .split(".")
                .filter((item) => item.trim() !== "")
                .map((item, index) => (
                  <li className="paraSizing" key={index}>
                    {item}
                  </li>
                ))}
            </ol>
          ) : (
            "No Recipe Available"
          )}
          <h2>Some Instructions</h2>
          {/* <p className="paraSizing">{recipe.instructions}</p> */}
          <ol>
            {recipe?.instructions
              ?.split(".")
              .filter((item) => item.trim() !== "")
              .map((item, index) => (
                <li key={index} className="paraSizing">
                  {item}
                </li>
              ))}
          </ol>
          <h2>Cooking Time - {recipe.cookingTime}</h2>

          <Comments
            recipeComments={recipeComments}
            commentsWithUsers={commentsWithUsers}
            fetchRecipeComments={fetchRecipeComments}
            recipeId={recipeId}
          />
        </div>
      )}
    </>
  );
};

export default SingleRecipe;
