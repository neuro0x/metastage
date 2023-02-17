import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../lib/components/Loader";
import { SceneLayout } from "../lib/components/SceneLayout";
import ScrollContainer from "../lib/components/ScrollContainer";
import { useAppState } from "../lib/hooks/useAppState";
import { fetcher } from "../utils/fetcher";

const Home: NextPage = () => {
  const { connected } = useWallet();
  const [loaded, setLoaded] = useState(false);
  const { setProject, setVideos, videos } = useAppState();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const response = await fetcher("/api/get-videos");
      setProject(response.project);
      setVideos(response.videos);
      setLoaded(true);
    };

    if (!loaded) {
      init();
    }
  }, [loaded]);

  return (
    <>
      <Head>
        <title>Metastage | RightClickable</title>
        <meta name="description" content="Powering the metaverse" />
      </Head>

      <SceneLayout needsWallet={false} connected={connected} loaded={loaded}>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <Suspense fallback={<Loader />}>
            <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
              <color attach="background" args={["#000000"]} />
              <fog attach="fog" args={["#000000", 0, 15]} />
              <Environment preset="city" />
              <group position={[0, -0.4, 3.5]}>
                <ScrollContainer videos={videos} router={router} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
                  <planeGeometry args={[50, 50]} />
                  <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.5}
                    mirror={0}
                  />
                </mesh>
              </group>
            </Canvas>
          </Suspense>
        </div>
      </SceneLayout>
    </>
  );
};

export default Home;
