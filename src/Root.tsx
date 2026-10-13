import "./index.css";
import { Composition } from "remotion";
import { ReelComposition } from "./ReelComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelVideo"
        component={ReelComposition}
        durationInFrames={1590}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
