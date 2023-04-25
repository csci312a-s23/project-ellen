import PropTypes from "prop-types";
import Link from "next/link";

import { Typography } from "@mui/material";

import styled from "@emotion/styled";

const PostContainer = styled("div")({
  marginBottom: "2%",
  border: "2px solid #E0E0E0",
  borderRadius: "25px",
  padding: "10px",
  position: "relative",
  alignItems: "center",
});

export default function Post({ postInfo }) {
  // return (
  //   <div data-testid="post">
  //     <Paper elevation={3} style={postStyle}>
  //       <div style={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
  //         <Link href={`/posts/${postInfo.id}`} style={{ marginLeft: "5%" }}>
  //           {postInfo.title}
  //         </Link>
  //         <p style={{ alignSelf: "center", marginLeft: "5%" }}>
  //           {postInfo.category}
  //         </p>
  //         <p style={{ marginLeft: "auto", marginRight: "2%" }}>
  //           {postInfo.votes}
  //         </p>
  //       </div>
  //       <p style={{ marginLeft: "10%", marginTop: "3%", marginBottom: "2%" }}>
  //         {postInfo.content}
  //       </p>
  //       <p style={{ marginLeft: "80%", fontSize: "10px" }}>{postInfo.date}</p>
  //     </Paper>
  //   </div>
  // );

  console.log(postInfo);

  return (
    <PostContainer data-testid="post">
      <Typography position={"absolute"} color={"grey"}>
        {postInfo.category}
      </Typography>
      <Link href={`/posts/${postInfo.id}`}>
        <Typography fontSize={"210%"} href={`/posts/${postInfo.id}`} ml={"10%"}>
          {postInfo.title}
        </Typography>
      </Link>

      <Typography position={"relative"} ml={"13%"}>
        {postInfo.content}
      </Typography>
      <Typography position={"relative"} ml={"90%"}>
        {postInfo.votes}
      </Typography>

      {/* <Typography>{postInfo.created_at}</Typography> */}
    </PostContainer>
  );
}
Post.propTypes = {
  postInfo: PropTypes.object,
};
