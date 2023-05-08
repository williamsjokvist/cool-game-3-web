import { FunctionComponent } from "react";

type LevelProps = {
  level: number;
  color?: "blue" | "green";
};
const Level: FunctionComponent<LevelProps> = (props) => {
  const { level, color } = props;

  let hueRotation = 0;

  switch (color) {
    case "blue":
      hueRotation = 175;
      break;
    case "green":
      hueRotation = 100;
      break;
  }
  return (
    <span
      className="!inline-flex level-no"
      style={{
        filter: `hue-rotate(${hueRotation}deg)`,
      }}
    >
      {level
        .toString()
        .split("")
        .map((num, index) => (
          <span key={`${num}-${index}`} className={`level-no-${num}`} />
        ))}
    </span>
  );
};

export default Level;
