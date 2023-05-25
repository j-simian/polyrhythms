interface TimingVisualiserProps {
  score: number;
  numerator: number;
  denominator: number;
  left: number[];
  right: number[];
}
const TimingVisualiser = ({
  score,
  numerator,
  denominator,
  left,
  right,
}: TimingVisualiserProps) => {
  const buildTimingMarks = (max: number, times: number[]) => {
    let end = Math.max(...left, ...right);
    const ams = [];
    for (let i = 0; i <= max; i++) {
      ams.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 100) / max}%`,
            width: i == 0 || i == max ? "10px" : "5px",
            height: i == 0 || i == max ? "50px" : "30px",
            backgroundColor: "#586171",
          }}
        ></div>
      );
    }
    times.forEach((t, i) => {
      ams.push(
        <div
          key={`t-${i}`}
          style={{
            position: "absolute",
            left: `calc(${(t * 100) / end}% - 10px)`,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#ec4c56",
          }}
        ></div>
      );
    });
    return ams;
  };
  return (
    <div
      style={{
        flexGrow: "1",
        flexBasis: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "100px",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {buildTimingMarks(numerator, left)}
      </div>
      <div
        style={{
          width: "80%",
          height: "100px",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {buildTimingMarks(denominator, right)}
      </div>
    </div>
  );
};

export default TimingVisualiser;
