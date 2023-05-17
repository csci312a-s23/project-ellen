import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditForm({ username }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [major, setMajor] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [classYear, setClass] = useState("");
  const [id, setId] = useState("");

  const getUserInfo = async (name) => {
    const res = await fetch(`/api/users/${name}`);
    const json = await res.json();
    const jsonStr = JSON.stringify(json);
    const user = JSON.parse(jsonStr);

    return user;
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const user = await getUserInfo(username);

      setEmail(user.email);
      setDepartment(user.department);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setMajor(user.major);
      setTitle(user.title);
      setType(user.type);
      setClass(user.classYear);
      setId(user.username);
    };
    fetchInfo();
  }, [username]);

  const handleClick = async (choice) => {
    if (choice === "Submit") {
      // Put request
      await fetch(`/api/users/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classYear: classYear ? parseInt(classYear) : 0,
          department: department ? department : "",
          email: email,
          firstName: firstName ? firstName : "",
          lastName: lastName ? lastName : "",
          major: major ? major : "",
          title: title ? title : "",
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("Response", response);
        });

      router.back();
    } else if (choice === "Cancel") {
      // Return nothing
      router.back();
    }
  };

  return (
    <form>
      <TextField
        name="Username"
        label="Username"
        variant="outlined"
        value={id}
        style={{ width: "75%", float: "right" }}
        margin="normal"
        onChange={(event) => {
          setId(event.target.value);
        }}
      />
      {type === "Faculty" && (
        <TextField
          name="Title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          style={{ width: "75%", float: "right" }}
          margin="normal"
        />
      )}
      <TextField
        name="First Name"
        label="First Name"
        variant="outlined"
        value={firstName}
        style={{ width: "75%", float: "right" }}
        margin="normal"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        name="Last Name"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
        style={{ width: "75%", float: "right" }}
        margin="normal"
      />

      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        style={{ width: "75%", float: "right" }}
        margin="normal"
        InputProps={{ readOnly: true, style: { color: "grey" } }}
      />
      {type === "Student" && (
        <TextField
          name="Class Year"
          label="Class Year"
          variant="outlined"
          value={classYear}
          onChange={(event) => {
            setClass(event.target.value);
          }}
          style={{ width: "75%", float: "right" }}
          margin="normal"
        />
      )}
      {type === "Student" && (
        <TextField
          name="Major"
          label="Major"
          variant="outlined"
          value={major}
          onChange={(event) => {
            setMajor(event.target.value);
          }}
          style={{ width: "75%", float: "right" }}
          margin="normal"
          data-testid="major-input"
        />
      )}
      {type === "Faculty" && (
        <TextField
          name="Department"
          label="Department"
          variant="outlined"
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
          }}
          style={{ width: "75%", float: "right" }}
          margin="normal"
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick("Submit")}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick("Cancel")}
      >
        Cancel
      </Button>
    </form>
  );
}
