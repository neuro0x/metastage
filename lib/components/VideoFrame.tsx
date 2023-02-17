import { Image, Text, useCursor } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { NextRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { Color, TextureLoader } from "three";
import { Video } from "../models/videos";

interface VideoFrameProps {
  video: Video;
  position: any;
  color?: Color;
  emissiveColor?: Color;
  emissiveIntensity?: number;
  router: NextRouter;
}

export const VideoFrame: FC<VideoFrameProps> = ({
  video,
  position,
  color = new Color("silver"),
  emissiveColor = new Color("silver"),
  emissiveIntensity = 0.15,
  router
}) => {
  const frame = useRef<any>();
  const image = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const mask = useLoader(TextureLoader, "./assets/mask.png");

  useCursor(hovered);

  return (
    <group position={position}>
      <mesh
        onClick={async () =>
          await router.push(`${router.route}?video=${video.id}`)
        }
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        scale={[1, 1, 0.05]}
        position={[0, 1 / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />

        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>

        <Text
          maxWidth={1}
          anchorX="center"
          anchorY="bottom"
          position={[0, 0.55, 0]}
          fontSize={0.06}
          textAlign={"center"}
        >
          {video.title}
        </Text>

        {hovered && (
          <>
            <mesh
              raycast={() => null}
              rotation={[0, -Math.PI / 2, 0]}
              position={[0, 0, 0.2]}
            >
              <boxGeometry />
              <meshStandardMaterial
                map={mask}
                opacity={0.7}
                transparent={true}
              />
            </mesh>
            <Text
              maxWidth={0.9}
              raycast={() => null}
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.7]}
              fontSize={0.04}
              textAlign={"center"}
            >
              {video.description}
            </Text>
          </>
        )}

        <Image
          ref={image}
          raycast={() => null}
          position={[0, 0, 0.7]}
          url={video.previewImage}
        />
      </mesh>
    </group>
  );
};
