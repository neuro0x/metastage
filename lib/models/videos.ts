import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import { User } from "./user";

export interface Video {
  id: number;
  previewImage: string;
  video: string;
  title: string;
  description: any; // TODO: rich text?
  creator: User;
  clicks: StringPublicKey[];
}
