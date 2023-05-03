import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Comment({ data, vote }) {
  console.log("comment:", data);
  return (
    <div data-testid="comment">
      <Box
        sx={{
          width: 700,
          bgcolor: "lightgray",
          padding: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          borderRadius: 10,
          padding: 2,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ width: 500, paddingLeft: 2 }}>
          <div>{data.content}</div>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => vote("upvote", data.id)}
          >
            {" "}
            <KeyboardArrowUpIcon />{" "}
          </div>
          <p>likes: {data.likes}</p>
          <p>by: {data.username}</p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => vote("downvote", data.id)}
          >
            {" "}
            <KeyboardArrowDownIcon />{" "}
          </div>
        </Box>
      </Box>
    </div>
  );
}
