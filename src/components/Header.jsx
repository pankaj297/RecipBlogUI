import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
const Header = () => {
  const [navtoggle, setNavToggle] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [selected, setSelected] = useState("UserProfile");
  const navigate = useNavigate();

  useEffect(() => {
    switch (selected) {
      case "UserProfile":
        break;
      case "addRecipe":
        navigate("/addRecipe");
        setSelected("UserProfile");
        break;
      case "logout":
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("recipeAuth");
        toast.success("Logout Success");
        setSelected("UserProfile");
        break;
      case "favourites":
        navigate("/favouriteRecipe");
        setSelected("UserProfile");
        break;
      case "myRecipes":
        navigate("/myRecipes");
        setSelected("UserProfile");
        break;
      case "myProfile":
        navigate("/myProfile");
        setSelected("UserProfile");

        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <div className="header customPadding">
      <Link to={"/"} className="logo">
        Recipe <span>Blog</span>
      </Link>
      <div className={navtoggle ? "links linkScale" : "links "}>
        <Link onClick={() => setNavToggle(!navtoggle)} to={"/"}>
          Home
        </Link>
        <Link onClick={() => setNavToggle(!navtoggle)} to={"/"}>About</Link>
        <Link onClick={() => setNavToggle(!navtoggle)} to={"/recipes"}>
          Recipes
        </Link>
        {!auth.user ? (
          <>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
          </>
        ) : (
          <>
            <select
              onChange={(e) => setSelected(e.target.value)}
              value={selected}
              name="userOptions"
              className="userOptions"
            >
              <option value={"UserProfile"}>{auth?.user?.name} </option>
              <option value={"myProfile"}>My Profile</option>
              <option value={"addRecipe"}>Add Recipe</option>
              <option value={"favourites"}>My Favourites</option>
              <option value={"myRecipes"}>My Recipes</option>
              <option value={"logout"}>Logout</option>
            </select>
          </>
        )}
      </div>
      <div className="toggleNav" onClick={() => setNavToggle(!navtoggle)}>
        {!navtoggle ? <GiHamburgerMenu /> : <IoCloseSharp />}
      </div>
    </div>
  );
};

export default Header;
