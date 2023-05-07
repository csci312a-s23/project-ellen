import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import styled from "@emotion/styled";
// const fs = require("fs");
import { categoryColors } from "../../../data/CategoryColorData.js";

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
          padding: "10px",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 0.4px -1px",
        }}
      >
        <div
          style={{
            marginBottom: "0px",
            display: "flex",
            flexDirection: "row",
          }}
          position={"absolute"}
          color={"grey"}
        >
          <div
            style={{
              backgroundColor: categoryColors[postInfo.category],
              color: "black",
              padding: "2px 5px 2px 5px",
              borderRadius: "10px",
            }}
          >
            {postInfo.category}
          </div>
        </div>
        <Typography
          style={{ paddingTop: "0px" }}
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
