import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import styled from "@emotion/styled";

const PostContainer = styled("div")({
  // marginBottom: "2%",
  // border: "2px solid #E0E0E0",
  // borderRadius: "25px",
  // padding: "10px",
  // position: "relative",
  // alignItems: "center",
});

export default function Post({
  postInfo,
  // refreshPosts
}) {
  return (
    <PostContainer data-testid="post">
      <div
        style={{
          border: "3px solid black ",
          padding: "20px",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 0.4px -1px",
        }}
      >
        <Typography position={"absolute"} color={"grey"}>
          {postInfo.category}
        </Typography>
        <Typography
          style={{ paddingTop: "20px" }}
          fontSize={"35px"}
          href={`/posts/${postInfo.id}`}
          // ml={"10%"}
        >
          {postInfo.title}
        </Typography>

        <Typography
          position={"relative"}
          // ml={"13%"}
        >
          {postInfo.content}
        </Typography>
        <Typography
          position={"relative"}
          // ml={"90%"}
        >
          {postInfo.votes}
        </Typography>

        {/* <Typography>{postInfo.created_at}</Typography> */}
      </div>
    </PostContainer>
  );
}
Post.propTypes = {
  postInfo: PropTypes.object,
};
