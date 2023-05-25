"use client";
import { useEffect, useState } from "react";
import PolySelector from "@/components/PolySelector";
import TimingVisualiser from "@/components/TimingVisualiser";
import ScoreDisplay from "@/components/ScoreDisplay";
import KeySelector from "@/components/KeySelector";

export default function Home() {
  const [keyLeft, setKeyLeft] = useState("f");
  const [keyRight, setKeyRight] = useState("j");

  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(-1); // start == -1 <==> !playing

  const [leftTiming, setLeftTiming] = useState<number[]>([]);
  const [rightTiming, setRightTiming] = useState<number[]>([]);

  const [leftTimes, setLeftTimes] = useState<number[]>([]);
  const [rightTimes, setRightTimes] = useState<number[]>([]);

  const [numerator, setNumerator] = useState(20);
  const [denominator, setDenominator] = useState(16);

  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const startGame = (now: number) => {
      console.log(`Starting game @ ${now}`);
      setPlaying(true);
      setStart(now);
    };

    const endGame = (now: number, left: boolean) => {
      console.log(`Ending game @ ${now}`);
      let timesLeft = left ? [...leftTiming, now] : leftTiming;
      let timesRight = !left ? [...rightTiming, now] : rightTiming;
      let end = Math.max(...timesLeft, ...timesRight) - start;
      timesLeft = timesLeft.map((t) => (t - start) / end);
      timesRight = timesRight.map((t) => (t - start) / end);
      setLeftTimes(timesLeft);
      setRightTimes(timesRight);

      let loss = 0;
      timesLeft.forEach((x, i) => {
        loss += Math.abs(x - i / numerator);
      });
      timesRight.forEach((x, i) => {
        loss += Math.abs(x - i / denominator);
      });

      let maxLoss = (numerator - 1) / 2 + (denominator - 1) / 2; // maximum possible loss
      let accuracy = 1 - loss / maxLoss;

      const scoreUnlinearised =
        (Math.exp(2 * accuracy) - 1) / (Math.exp(2) - 1); // we scale 0->0, 50->20, 100->100 to create more variation in higher scores and less in lower.

      setScore(scoreUnlinearised);
      setSpeed(end);
      console.log(end / 4);

      setPlaying(false);
      setLeftTiming([]);
      setRightTiming([]);
      setStart(-1);
    };

    const resetGame = () => {
      setScore(0);
      setSpeed(0);
      setRightTiming([]);
      setLeftTiming([]);
      setRightTimes([]);
      setLeftTimes([]);
      setPlaying(false);
      setStart(-1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == " ") resetGame();
      if (e.key !== keyLeft && e.key !== keyRight) return;
      const now = Date.now();
      if (!playing) {
        startGame(now);
      }

      const i = leftTiming.length + (e.key == keyLeft ? 1 : 0);
      const j = rightTiming.length + (e.key == keyRight ? 1 : 0);

      if (
        i > numerator + 1 ||
        j > denominator + 1 ||
        (i == numerator + 1 && j == denominator + 1)
      ) {
        endGame(now, e.key == keyLeft);
      } else {
        e.key == keyLeft
          ? setLeftTiming((xs) => [...xs, now])
          : setRightTiming((xs) => [...xs, now]);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [
    denominator,
    setDenominator,
    numerator,
    setNumerator,
    keyLeft,
    keyRight,
    leftTiming,
    rightTiming,
    playing,
    start,
  ]);

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        width: "100vw",
      }}
    >
      <KeySelector
        left={keyLeft}
        right={keyRight}
        setLeft={setKeyLeft}
        setRight={setKeyRight}
      />
      <div
        style={{
          height: "100%",
          flexBasis: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <PolySelector
          num={numerator}
          setNum={setNumerator}
          den={denominator}
          setDen={setDenominator}
        />
        <TimingVisualiser
          score={score}
          numerator={numerator}
          denominator={denominator}
          left={leftTimes}
          right={rightTimes}
        />
        <ScoreDisplay score={score} speed={speed} />
      </div>
    </main>
  );
}
