import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { FC } from "react";
import { useAppState } from "../hooks/useAppState";
import { EthConnectButton } from "./wallets/EthConnectButton";

export const Navbar: FC = () => {
  const { project } = useAppState();

  return (
    <nav className="navbar w-screen absolute z-10">
      <section className="flex justify-end w-screen">
        <div className="dropdown dropdown-end">
          <div className="btn btn-ghost flex flex-col gap-1" tabIndex={0}>
            <div className="h-1 w-6 bg-white"></div>
            <div className="h-1 w-6 bg-white"></div>
            <div className="h-1 w-6 bg-white"></div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content flex flex-col items-center bg-black"
          >
            <WalletMultiButton />
            <EthConnectButton showDisconnect />
            {project?.externalUrl && (
              <Link href={project.externalUrl}>
                <a target={"_blank"} className="btn btn-ghost">
                  {project?.name || "back"}
                </a>
              </Link>
            )}
          </ul>
        </div>
      </section>
    </nav>
  );
};
