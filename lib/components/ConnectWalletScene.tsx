import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, Suspense } from "react";
import { EthConnectButton } from "./wallets/EthConnectButton";

export const ConnectWalletScene: FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="absolute z-10 flex flex-col">
        <WalletMultiButton className="btn" />
        <EthConnectButton />
      </div>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Suspense fallback={null}>
          <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 0, 15]} />
            <Environment preset="city" />
            <group position={[0, -0.4, 0]}>
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
                  color="#000000"
                  metalness={0.5}
                  mirror={0}
                />
              </mesh>
            </group>
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};
