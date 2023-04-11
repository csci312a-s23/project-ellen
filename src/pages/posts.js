import NavBar from "@/components/Navbar";

// How do i pass in handleclick function to postscroller
export default function PostScroller({ handleClick }) {
  return (
    <div>
      <NavBar handleClick={handleClick} />
    </div>
  );
}
