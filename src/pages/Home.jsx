import React, { useEffect, useState } from "react";
import pizza from "/imgs/pizza.jpg";
import cake from "/imgs/cake.jpg";
import drinks from "/imgs/drinks.jpg";
import burger from "/imgs/burger.jpg";
import mainCourse1 from "/imgs/maincourse1.jpg";
import mainCourse2 from "/imgs/maincourse2.jpg";
import mainCourse3 from "/imgs/maincourse3.jpg";
import axios from "axios";
import { Link } from "react-router-dom"; 
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(
        `https://recipblognodejs.onrender.com/api/v1/recipes/allRecipes`
      );
      setRecipes(data.result.slice(1, 5));
    } catch (error) { 
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="">
      <div className="mainContainer">
        <div className="customPadding">
          <div className="heroDetails fItem">
            <h1>It is even better than an expensive cookery book</h1>
            <p>Learn how to make your favorite restaurant’s dishes</p>
            <button>Explore</button>
          </div>
          <div className="fItem"></div>
        </div>
      </div>
      <div className="recepesByCategories customPadding">
        <div className="hdata">
          <h1>Recipes By Category</h1>
          <p>
            Excepteur sint occaecat cupidatat non qui proident,
            <br /> sunt culpa qui officia deserunmollit anim id est laborum.
          </p>
        </div>
        <div className="recipeCategoryList recipesFlex">
          <div className="categoryCard">
            <img src={pizza} alt="" />
            <h1>Pizzas</h1>
          </div>
          <div className="categoryCard">
            <img src={cake} alt="" />
            <h1>Cake</h1>
          </div>
          <div className="categoryCard">
            <img src={drinks} alt="" />
            <h1>Drinks</h1>
          </div>
          <div className="categoryCard">
            <img src={burger} alt="" />
            <h1>Burger</h1>
          </div>
        </div>
      </div>
      <div className="newsLetter">
        <div className="customPadding">
          <div className="heroDetails fItem spH">
            <h1>
              Subscribe to our <span> Newsletter</span>
            </h1>
            <p>
              Fusce id velit placerat, efficitur libero placerat, sodales ante.
              Curabitur sed erosat orci congue vestibulum.
            </p>
            <button>Subscribe</button>
          </div>
          <div className="fItem"></div>
        </div>
      </div>
      <div className="popularRecipes customPadding">
        <div className="hdata">
          <h1 className="textCenter">Most Popular Recipes </h1>
          <p className="textCenter">
            Excepteur sint occaecat cupidatat non qui proident, sunt culpa qui
            officia <br /> deserunmollit anim id est laborum.
          </p>
        </div>
        <div className="recipesFlex">
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mainCourse customPadding pb-4">
        <div className="hdata">
          <h1 className="textCenter">Main Course</h1>
          <p className="textCenter">
            Excepteur sint occaecat cupidatat non qui proident, sunt culpa qui{" "}
            <br /> officia deserunmollit anim id est laborum.
          </p>
        </div>
        <div className="recipeCategoryList recipesFlex">
          <div className="categoryCard cSp">
            <img src={mainCourse1} alt="" />
            <h1>Bakes</h1>
          </div>
          <div className="categoryCard cSp">
            <img src={mainCourse2} alt="" />
            <h1>Dishes</h1>
          </div>
          <div className="categoryCard cSp">
            <img src={mainCourse3} alt="" />
            <h1>Drinks</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
