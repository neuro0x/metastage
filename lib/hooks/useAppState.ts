import create from "zustand";
import { Project } from "../models/project";
import { Video } from "../models/videos";

interface AppState {
  project: Project | null;
  setProject: (project: Project | null) => void;
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  selectedVideo: Video | null;
  setSelectedVideo: (video: Video | null) => void;
}

export const useAppState = create<AppState>((set) => ({
  project: null,
  setProject: (project: Project | null) => set(() => ({ project: project })),
  videos: [],
  setVideos: (videos: Video[]) => set(() => ({ videos: videos })),
  selectedVideo: null,
  setSelectedVideo: (video: Video | null) =>
    set(() => ({ selectedVideo: video })),
}));
