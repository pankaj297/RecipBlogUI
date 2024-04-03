import React, { useContext, useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const Comments = ({
  recipeComments,
  commentsWithUsers,
  fetchRecipeComments,
  recipeId,
}) => {
  const { auth } = useContext(AuthContext);
  const [updateState, setUpdateState] = useState(false);
  const [commentId, setcommentId] = useState("");
  const [userComment, setUserComment] = useState({
    rating: "",
    comment: "",
  });

  const handleComment = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      return toast.error("Please Login !");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}/api/v1/comments/addComment/${recipeId}`,
        { comment: userComment.comment, rating: userComment.rating }
      );
      toast.success("Comment Added");
      fetchRecipeComments();
      setUserComment({ rating: "", comment: "" });
    } catch (error) { 
      toast.error("Unable to add Comment");
    }
  };

  const updateComment = (cId, comment, rating) => { 
    setUpdateState(true);
    setcommentId(cId);
    setUserComment({ rating: rating, comment: comment });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); 

    if (!auth.token) {
      return toast.error("Please Login !");
    }
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BURL
        }/api/v1/comments/updateComment/${recipeId}/${commentId}`,
        { comment: userComment.comment, rating: userComment.rating }
      );

      toast.success("Comment Updated");
      fetchRecipeComments();
      setUserComment({ rating: "", comment: "" });
    } catch (error) { 
      toast.error("Unable to Update Comment");
    }
  };

  const deleteComment = async (commentId) => {
    if (!auth.token) {
      return toast.error("Please Login !");
    }

    try {
      if (confirm("Are you shure you want to delete") === true) {
        const { data } = await axios.delete(
          `${
            import.meta.env.VITE_BURL
          }/api/v1/comments/deleteComment/${recipeId}/${commentId}`
        );
        toast.success("Comment Deleted");
        fetchRecipeComments();
      }
    } catch (error) { 
      toast.error("Unable to Delete Comment");
    }
  };

  return (
    <div className="comments">
      <h3>Comments ({recipeComments ? recipeComments.length : "0"})</h3>

      <form
        className="commentBox"
        onSubmit={!updateState ? handleComment : handleUpdate}
      >
        <textarea
          name="comment"
          value={userComment.comment}
          onChange={(e) =>
            setUserComment({
              ...userComment,
              [e.target.name]: e.target.value,
            })
          }
          required
          type="text"
          placeholder="Comment Here"
        />
        <input
          name="rating"
          value={userComment.rating}
          required
          onChange={(e) =>
            setUserComment({
              ...userComment,
              [e.target.name]: e.target.value,
            })
          }
          min={1}
          max={5}
          type="number"
          placeholder="Rate It 1 - 5"
        />
        <div className="flex" style={{ gap: "1rem" }}>
          <button type="submit">
            {!updateState ? "Comment" : "Update Comment"}
          </button>

          {!updateState ? (
            ""
          ) : (
            <button
              onClick={() => {
                setUpdateState(false);
                setUserComment({ rating: "", comment: "" });
              }}
            >
              cancel
            </button>
          )}
        </div>
      </form>
      <div className="userComments">
        {!recipeComments.length <= 0
          ? commentsWithUsers.map((item) => (
              <div key={item.comment._id} className="userSingleComment">
                <h4>{item.user?.result.name}</h4>

                <h3>
                  {Array(item.comment.rating)
                    .fill("*")
                    .map((item, index) => (
                      <IoIosStar key={index} />
                    ))}
                </h3>
                <p>
                  {item.comment.comment}{" "}
                  {item.comment.user === auth?.user?._id ? (
                    <>
                      <CiEdit
                        onClick={() =>
                          updateComment(
                            item.comment._id,
                            item.comment.comment,
                            item.comment.rating
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <MdDeleteForever
                        onClick={() => deleteComment(item.comment._id)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Comments;
