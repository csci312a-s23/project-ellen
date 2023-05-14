// Description: Test cases for UnauthorizedMessage.

import { render, fireEvent, screen } from "@testing-library/react";
import UnauthorizedPopup from "./UnauthorizedMessage";
import { SessionProvider, useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  SessionProvider: jest.requireActual("next-auth/react").SessionProvider,
}));

describe("UnauthorizedMessage Tests", () => {
  useSession.mockReturnValue({ data: { user: null } });
  const session = useSession();
  test("Displays correct message", async () => {
    const { getByText } = render(
      <SessionProvider session={session}>
        <UnauthorizedPopup
          unauthorized
          onClose={() => {}}
          message={"You must be logged in to create a post."}
        />
      </SessionProvider>
    );
    const message = getByText("You must be logged in to create a post.");
    expect(message).toBeInTheDocument();
  });

  test("Popup closes when close button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <SessionProvider session={session}>
        <UnauthorizedPopup
          unauthorized
          onClose={onClose}
          message={"You must be logged in to create a post."}
        />
      </SessionProvider>
    );
    const closeButton = screen.getByTestId("close");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
