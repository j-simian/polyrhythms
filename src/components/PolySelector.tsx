interface PolySelectorProps {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  den: number;
  setDen: React.Dispatch<React.SetStateAction<number>>;
}
const PolySelector = ({ num, setNum, den, setDen }: PolySelectorProps) => {
  return (
    <div
      className="polySelector"
      style={{ flexGrow: 0, flexBasis: "200px", padding: "40px" }}
    >
      <input
        className="leftSel"
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value))}
      />
      :
      <input
        className="rightSel"
        type="number"
        value={den}
        onChange={(e) => setDen(parseInt(e.target.value))}
      />
    </div>
  );
};

export default PolySelector;
