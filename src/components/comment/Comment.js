import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";

export default function Comment({ data, vote, whereis }) {
  console.log("comment:", data);
  const [allowVotes, setAllowVotes] = useState(true);

  useEffect(() => {
    if (whereis === "profile") {
      setAllowVotes(false);
    }
  }, []);

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

        {!!allowVotes && (
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
            <p>by: {data?.poster?.username}</p>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => vote("downvote", data.id)}
            >
              {" "}
              <KeyboardArrowDownIcon />{" "}
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
}
