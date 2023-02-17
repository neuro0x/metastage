import { StringPublicKey } from "@metaplex-foundation/mpl-core";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { config } from "../lib/config";
import { Project } from "../lib/models/project";
import { StrapiGetById, StrapiPagination } from "../lib/models/strapi";
import { Video } from "../lib/models/videos";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "./constants";

export const getProject = async (): Promise<Project> => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
  const url = `${config.cmsBaseUrl}/api/projects/${projectId}?populate=*`;

  try {
    const { data }: AxiosResponse<StrapiGetById<Project>> = await axios.get(
      url
    );
    const response = data.data.attributes;
    response.coverPhoto =
      // TODO: fix typing
      // @ts-ignore
      config.cmsBaseUrl + data.data.attributes.coverPhoto.data.attributes.url;
    response.featureVideoUrl =
      config.cmsBaseUrl +
      data.data.attributes.featuredVideo.data.attributes.url;

    return response;
  } catch (e: any) {
    toast.error(ERROR_MESSAGES.PROJECT_NOT_FOUND);
    return {} as Project;
  }
};

export const getVideos = async (): Promise<Video[]> => {
  const url = config.cmsBaseUrl + "/api/stage-videos?populate=*";

  try {
    const videos: AxiosResponse<{
      data: { id: number; attributes: Video }[];
      meta: { pagination: StrapiPagination };
    }> = await axios.get(url);

    let { data } = videos?.data;
    return data.map((it: { attributes: Video; id: number }) => ({
      ...it.attributes,
      id: it.id,
      previewImage:
        // TODO: fix typing
        // @ts-ignore
        config.cmsBaseUrl + it.attributes.previewImage.data.attributes.url,
      video:
        // TODO: fix typing
        // @ts-ignore
        config.cmsBaseUrl + it.attributes.video.data.attributes.url
    }));
  } catch (e: any) {
    toast.error(ERROR_MESSAGES.VIDEOS_NOT_FOUND);
    console.error(ERROR_MESSAGES.PROJECT_NOT_FOUND, e?.message);
    return [];
  }
};

export const getVideo = async (id: string): Promise<Video> => {
  const url = `${config.cmsBaseUrl}/api/stage-videos/${id}?populate=*`;

  try {
    let { data } = await axios.get(url); // TODO: type this response
    data = data.data;
    return {
      id: data.id,
      ...data.attributes,
      previewImage:
        // TODO: fix typing
        // @ts-ignore
        config.cmsBaseUrl + data.attributes.previewImage.data.attributes.url,
      video:
        // TODO: fix typing
        // @ts-ignore
        config.cmsBaseUrl + it.attributes.video.data.attributes.url
    };
  } catch (e: any) {
    toast.error(ERROR_MESSAGES.VIDEO_NOT_FOUND);
    console.error(ERROR_MESSAGES.VIDEO_NOT_FOUND);
    return {} as Video;
  }
};

export const sendCLX = async (
  publicKey: StringPublicKey,
  id: string
): Promise<void> => {
  // TODO: Each Exhibit will need to be an account/nft on-chain and get it's likes incremented
  // TODO: Future may charge/send CLX for clicking, for now web2
  const exhibit = await getVideo(id);
  const url = `${config.cmsBaseUrl}/api/stage-videos/${id}`;
  const publicKeyString = publicKey.toString();

  if (exhibit?.clicks.includes(publicKeyString)) {
    toast.error(ERROR_MESSAGES.ALREADY_CLICKED);
  } else {
    try {
      exhibit.clicks.push(publicKeyString);
      await axios.put(url, { data: exhibit });
      toast.success(SUCCESS_MESSAGES.CLICKED);
    } catch (e: any) {
      toast.error(e.message);
      console.warn(e.message);
    }
  }
};
