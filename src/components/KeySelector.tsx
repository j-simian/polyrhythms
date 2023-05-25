interface KeySelectorProps {
  left: string;
  right: string;
  setLeft: React.Dispatch<React.SetStateAction<string>>;
  setRight: React.Dispatch<React.SetStateAction<string>>;
}

const KeySelector = ({ left, right, setLeft, setRight }: KeySelectorProps) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <select value={left} onChange={(e) => setLeft(e.target.value)}>
        {Array.apply(undefined, Array(25))
          .map((x, i) => String.fromCharCode(i + 97))
          .map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
      </select>
      <select value={right} onChange={(e) => setRight(e.target.value)}>
        {Array.apply(undefined, Array(25))
          .map((x, i) => String.fromCharCode(i + 97))
          .map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
      </select>
    </div>
  );
};

export default KeySelector;
