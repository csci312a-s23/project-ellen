import Slider from "@mui/material/Slider";
export default function voteSlider({ voteVal, setVote }) {
  // https://stackoverflow.com/questions/46743113/javascript-generate-array-of-strings-with-inline-solution
  const marks = Array.from(new Array(7), (val, index) => {
    return { label: index - 3, value: index - 3 };
  });
  return (
    <div>
      slider
      <Slider
        step={1}
        min={-3}
        max={3}
        marks={marks}
        value={voteVal}
        onChange={(e) => setVote(e.target.value)}
        aria-label="Custom marks"
        valueLabelDisplay="auto"
      />
    </div>
  );
}
