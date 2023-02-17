import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => (
  <footer className="absolute bottom-1 z-10">
    <Link href="https://rightclickable.com" target={"_blank"}>
      <button className="btn btn-link">
        <Image
          src="/android-chrome-192x192.png"
          height={30}
          width={30}
          alt="RightClickable"
        />
      </button>
    </Link>
  </footer>
);
