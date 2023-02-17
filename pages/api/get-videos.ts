import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../lib/models/project";
import { Video } from "../../lib/models/videos";
import { getProject, getVideos } from "../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ project: Project; videos: Video[] }>
) {
  const project = await getProject();
  const videos = await getVideos();
  return res.status(200).json({ project, videos });
}
