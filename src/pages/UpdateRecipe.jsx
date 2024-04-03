import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const UpdateRecipe = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { auth, setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    recipeName: "",
    instructions: "",
    cookingTime: "",
    recipe: "",
    ingredients: "",
    img: "",
  });
  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/api/v1/recipes/singleRecipe/${params.rId}`
      );

      
        setFormData({
          recipeName: data?.result?.recipeName,
          instructions: data?.result?.instructions,
          cookingTime: data?.result?.cookingTime,
          recipe: data?.result?.recipe,
          ingredients: data?.result?.ingredients,
        });
      
    } catch (error) {
      toast.error("Unable to fetch Recipe");
      setLoader(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userData = new FormData();
    userData.append("recipeName", formData.recipeName);
    userData.append("instructions", formData.instructions);
    userData.append("cookingTime", formData.cookingTime);
    userData.append("recipe", formData.recipe);
    userData.append("ingredients", formData.ingredients);
    // userData.append("img", formData.img[0] || "");
    formData.img && userData.append("img", formData.img);

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BURL}/api/v1/recipes/updateRecipe/${
          params.rId
        }`,
        userData
      ); 
      if (result) {
        toast.success("Recipe Updated");
        navigate("/myRecipes");
      }
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <div>
      <div className="customPadding">
        <div className="authForm">
          <h2>Update Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="formInputs">
              <input
                type="text"
                value={formData.recipeName}
                name="recipeName"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Recipe Name - Chilli Garlic Paneer Recipe"
                required
              />
              <textarea
                type="text"
                value={formData?.instructions}
                name="instructions"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Special Instructions - You can add or reduces the spices as per your taste.
                Serve the Chilli Garlic Paneer with some onion rings and mint chutney on the side for best taste.`}
                required
              />
              <textarea
                type="text"
                value={formData.ingredients}
                name="ingredients"
                className="bigText"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Ingredients - 200 gm paneer,
                2 green chilli,
                2 teaspoon chilli garlic paste,
                1 teaspoon coriander powder,
                1 teaspoon kasoori methi powder,
                2 tablespoon lemon juice,
                2 tablespoon virgin olive oil,
                8 cloves garlic,
                1/4 cup yoghurt (curd),
                1/2 teaspoon garam masala powder,
                1 teaspoon dry mango powder,
                1 teaspoon red chilli powder,
                salt as required`}
                required
              />

              <textarea
                className="bigText"
                value={formData.recipe}
                type="text"
                name="recipe"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Recipe -
                Step 1 Prepare the marinade
                Take a bowl. Add curd, lemon juice, chilli garlic paste, garam masala, coriander powder, dry mango powder, kasoori methi,
                red chilli powder and salt as per taste. Give a good mix to prepare a thick marinade.
                                
                Step 2 Marinate the paneer
                Chop the paneer into small cubes and add them to the prepared marinade. Mix well to coat all the cubes properly.
                Let them sit aside for 10 minutes.
                
                Step 3 Saute the paneer pieces
                Now take a non-stick tawa or pan. Add olive oil to it and let it heat up. Add finely chopped garlic and green chillies.
                Cover the pan with a lid and keep the flame low to let the oil absorb the garlic-chilli flavours and aroma.
                After a few minutes add all the paneer cubes one by one to the pan. Cover with a lid and let them cook on 
                low medium heat. Make sure you cook on low heat to give them the perfect texture. Toss and turn the paneer 
                to cook it from all the sides.
                
                Step 4 Ready to be served
                Once golden brown in colour, your Chilli Garlic Paneer is ready to be served. Serve with a dip of your choice.`}
                required
              />
              <input
                type="text"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Cook Time - 10 min"
                required
              />
              <div className="img" style={{ width: "100%" }}>
                <img
                  style={{ width: "10rem", textAlign: "left" }}
                  src={`${
                    import.meta.env.VITE_BURL
                  }/api/v1/recipes/singleRecipeImg/${params.rId}?${Date.now()}`}
                  alt={params.rId}
                />
              </div>
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
                  })
                }
                placeholder="Img"
                accept=".png,.jpg,.jpeg,.webp" 
              />
            </div>
            <button type="submit">Update Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
