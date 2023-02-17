import { Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { NextRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Video } from "../models/videos";
import { VideoFrame } from "./VideoFrame";

export default function ScrollContainer({
  videos,
  router
}: PropsWithChildren<{ videos: Video[]; router: NextRouter }>) {
  const { width } = useThree((state) => state.viewport);
  const xW = 1.25;

  return (
    <ScrollControls
      horizontal
      damping={10}
      pages={(width - xW + videos.length * xW) / width}
    >
      <Scroll>
        {videos.map((video: Video, i: number) => (
          <VideoFrame
            key={i}
            position={[i * xW, 0, 0]}
            video={video}
            router={router}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}
