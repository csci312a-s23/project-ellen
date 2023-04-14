import nc from "next-connect";
import Post from "../../../../../models/Posts.js";

const handler = nc().patch(async (req, res) => {
  // handle the upvote or downvote of a post

  const postID = req.query.id;
  //validate postID
  if (!postID) {
    res.status(400).end("Invalid Post ID");
    return;
  }
  const { body } = req;
  //validate body
  if (!body) {
    res.status(400).end("Invalid Vote");
    return;
  }
  //validate vote
  if (body.vote !== "upvote" && body.vote !== "downvote") {
    res.status(400).end("Invalid Vote");
    return;
  }
  //validate user
  if (!body.userID) {
    res.status(400).end("Invalid User");
    return;
  }
  //validate user has not already voted
  //add after login is implemented

  //get post
  const post = await Post.query().findById(postID).throwIfNotFound();

  //update post
  if (body.vote === "upvote") {
    post.votes++;
  }
  if (body.vote === "downvote") {
    post.votes--;
  }
  const updatedPost = await Post.query()
    .patchAndFetchById(postID, {
      votes: post.votes,
    })
    .throwIfNotFound();

  res.status(200).json(updatedPost);
});

export default handler;
