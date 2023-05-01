import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditProfile() {
  const router = useRouter();
  const { username } = router.query;

  const [email, setEmail] = useState("test");
  const [department, setDepartment] = useState("test");
  const [firstName, setFirstName] = useState("test");
  const [lastName, setLastName] = useState("test");
  const [major, setMajor] = useState("test");
  const [title, setTitle] = useState("test");
  const [type, setType] = useState("test");
  const [classYear, setClass] = useState("test");
  const [id, setId] = useState("John Kantaros");

  async function getUserInfo(name) {
    const res = await fetch(`/api/users/${name}`);
    const json = await res.json();
    const jsonStr = JSON.stringify(json);
    const user = JSON.parse(jsonStr);
    console.log(user);
    return user;
  }

  useEffect(() => {
    async function fetchInfo() {
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
    }
    fetchInfo();
  }, [username]);

  async function handleClick(choice) {
    if (choice === "Submit") {
      // Put request
      await fetch(`/api/users/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classYear: classYear ? parseInt(classYear) : 0,
          department: department ? department : " ",
          email: email,
          firstName: firstName,
          lastName: lastName,
          major: major ? major : " ",
          title: title ? title : " ",
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
  }

  return (
    <div>
      <h1>Edit profile</h1>

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
          onChange={(event) => {
            setEmail(event.target.value);
          }}
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
    </div>
  );
}
