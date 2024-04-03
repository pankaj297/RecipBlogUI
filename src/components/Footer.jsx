import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer customPadding">
      <div className="flex spF">
        <div className="rb">
          <Link to={"/"} className="logo">
            Recipe <span>Blog</span>
          </Link>
          <h1>Subscribe For Updates</h1>
          <button className="heroBtn">Subscribe</button>
        </div>
        <div className="flink flex">
          <div className="item">
            <h2>Recipe Blog</h2>
            <h3>
              <Link to={"/"}>Home </Link>
            </h3>
            <h3>
              <Link to={"/"}>About </Link>
            </h3>
            <h3>
              <Link to={"/recipes"}>Recipes</Link>
            </h3>
          </div>
          <div className="item">
            <h2>My Links</h2>
            <h3>
              <a target="_blank" href="https://github.com/AbbasGawali">
                Github
              </a>
            </h3>
            <h3>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/abbasgawali/"
              >
                LinkedIn
              </a>
            </h3>
            <h3>
              <a
                target="_blank"
                href="https://abbasreactportfolio.netlify.app/"
              >
                Portfolio
              </a>
            </h3>
          </div>
          <div className="item">
            <h2>Social</h2>
            <h3>FB</h3>
            <h3>YT</h3>
            <h3>TW</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
