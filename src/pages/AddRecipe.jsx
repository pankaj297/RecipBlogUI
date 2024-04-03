import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const AddRecipe = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    recipeName: "",
    instructions: "",
    cookingTime: "",
    recipe: "",
    ingredients: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const userData = new FormData();
    userData.append("recipeName", formData.recipeName);
    userData.append("instructions", formData.instructions);
    userData.append("cookingTime", formData.cookingTime);
    userData.append("recipe", formData.recipe);
    userData.append("ingredients", formData.ingredients);
    userData.append("img", formData.img[0]);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BURL}/api/v1/recipes/addRecipe`,
        userData
      ); 
      if (result) {
        toast.success("Recipe Added");
        navigate("/recipes");
      }
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  };

  return (
    <div>
      <div className="customPadding">
        <div className="authForm">
          <h2>Add Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="formInputs">
              <input
                type="text"
                name="recipeName"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Recipe Name - Chilli Garlic Paneer Recipe"
                required
              />
              <textarea
                type="text"
                name="instructions"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Special Instructions - \n\nYou can add or reduces the spices as per your taste. \n\nServe the Chilli Garlic Paneer with some onion rings and mint chutney on the side for best taste.
                `}
                required
              />
              <textarea
                type="text"
                name="ingredients"
                className="bigText"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Ingredients - \n200 gm paneer,\n2 green chilli,\n2 teaspoon chilli garlic paste,\n1 teaspoon coriander powder,\n1 teaspoon kasoori methi powder,\n2 tablespoon lemon juice,\n2 tablespoon virgin olive oil,\n8 cloves garlic,\n1/4 cup yoghurt (curd),\n1/2 teaspoon garam masala powder,\n1 teaspoon dry mango powder,\n1 teaspoon red chilli powder,\nsalt as required\n
                `}
                required
              />

              <textarea
                className="bigText"
                type="text"
                name="recipe"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder={`Recipe -\n\nPrepare the marinade Take a bowl\n\nAdd curd, lemon juice, chilli garlic paste, garam masala, coriander powder, dry mango powder, kasoori methi, red chilli powder and salt as per taste\n\nGive a good mix to prepare a thick marinade\n\nMarinate the paneer Chop the paneer into small cubes and add them to the prepared marinade Mix well to coat all the cubes properly\n\nLet them sit aside for 10 minutes\n\nSaute the paneer pieces Now take a non-stick tawa or pan\n\nAdd olive oil to it and let it heat up\n\nAdd finely chopped garlic and green chillies\n\nCover the pan with a lid and keep the flame low to let the oil absorb the garlic-chilli flavours and aroma\n\nAfter a few minutes add all the paneer cubes one by one to the pan\n\nCover with a lid and let them cook on low medium heat\n\nMake sure you cook on low heat to give them the perfect texture\n\nToss and turn the paneer to cook it from all the sides\n\nReady to be served Once golden brown in colour, your Chilli Garlic Paneer is ready to be served\n\nServe with a dip of your choice\n`}
                required
              />
              <input
                type="text"
                name="cookingTime"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                placeholder="Cook Time - 10 min"
                required
              />
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.files })
                }
                placeholder="Img"
                accept=".png,.jpg,.jpeg,.webp"
                required
              />
            </div>
            <button type="submit" style={{marginBottom:"2rem"}}>Add Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
