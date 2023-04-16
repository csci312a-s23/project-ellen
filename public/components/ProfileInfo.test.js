import ProfileInfo from "./profileInfo";
// import { screen, render, fireEvent, waitFor } from "@testing-library/react";

describe("ProfileInfo: Basic ProfileInfo functionality", () => {
  // beforeEach(() => {
  //   render(<ProfileInfo/>);
  // });

  // is there a different way we're supposed to make fake data here?
  const mockProfile = {
    name: "Alec",
    pronouns: "He/Him",
    bio: "Hi!",
    profilePic: "placeholder",
  };

  test("Smoke test", () => {
    render(
      <ProfileInfo
        name={mockProfile.name}
        pronouns={mockProfile.pronouns}
        bio={mockProfile.bio}
        profilePic={mockProfile.profilePic}
      />
    );
  });
});
