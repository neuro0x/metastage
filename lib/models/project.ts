import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { StrapiVideo } from "./strapi";
import { User } from "./user";

// TODO: update this type

export interface Project {
  id: number;
  name: string;
  shortName: string;
  description: string;
  shortDescription?: string;
  coverPhoto: string;
  smallPhoto?: string;
  mintDate?: Date;
  category: string;
  chain: "solana" | "ethereum";
  candyMachineId?: StringPublicKey;
  updateAuthority?: StringPublicKey;
  contractAddress?: string;
  mints: string[];
  externalUrl: string;
  twitterHandle: string;
  discordUrl?: string;
  creator: User;
  featuredVideoTitle: string;
  featureVideoUrl: string;
  featuredVideo: {
    id: number;
    data: {
      attributes: StrapiVideo;
    };
  };
}
