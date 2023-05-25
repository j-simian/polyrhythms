interface ScoreDisplayProps {
  score: number;
  speed: number;
}
const ScoreDisplay = ({ score, speed }: ScoreDisplayProps) => {
  return (
    <div
      className="scoreDisplay"
      style={{
        flexGrow: 0,
        flexBasis: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <p>{score != 0 ? `${Math.round(score * 10000) / 100}% accuracy` : "-"}</p>
      <p>
        {speed != 0 ? `${Math.round(960_000 / speed)}bpm (${speed}ms)` : "-"}
      </p>
    </div>
  );
};

export default ScoreDisplay;
