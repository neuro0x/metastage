import { FC } from "react";
import { ConnectWalletScene } from "./ConnectWalletScene";
import { Loader } from "./Loader";

interface SceneLayoutProps {
  needsWallet: boolean;
  connected: boolean;
  loaded: boolean;
  children: any; // TODO: type this
}

export const SceneLayout: FC<SceneLayoutProps> = ({
  loaded,
  connected,
  children,
  needsWallet,
}) => {
  return (
    <>
      {needsWallet ? (
        <>
          {loaded && connected && <>{children}</>}
          {connected && !loaded && <Loader />}
          {!connected && <ConnectWalletScene />}
        </>
      ) : (
        <>
          {loaded && <>{children}</>}
          {!loaded && <Loader />}
        </>
      )}
    </>
  );
};
