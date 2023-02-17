import { XCircleOutline } from "heroicons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { TwitterShareButton } from "react-twitter-embed";
import { shortenText } from "../../../utils/general-utils";
import { useAppState } from "../../hooks/useAppState";

export function FeaturedVideoModal() {
  const router = useRouter();
  const { project } = useAppState();
  const [featuredVideo, setFeaturedVideo] = useState<{
    title: string;
    video: string;
  } | null>(null);

  useEffect(() => {
    if (project?.featureVideoUrl && !router.query?.video) {
      setFeaturedVideo({
        title: project.featuredVideoTitle,
        video: project.featureVideoUrl
      });
    }
  }, [project?.featureVideoUrl, router.query]);

  return (
    <>
      {featuredVideo?.video && (
        <div className="absolute z-20 w-screen h-screen bg-black bg-opacity-75 flex flex-col">
          <main className="card mx-auto my-auto bg-black">
            <section className="p-3 mx-auto">
              <video
                muted
                autoPlay
                controls
                crossOrigin="anonymous"
                width={1028}
                height={1028}
                onEnded={() => setFeaturedVideo(null)}
              >
                <source
                  src={featuredVideo.video}
                  type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
              </video>
            </section>

            <section className="card-body gap-5">
              <div className="relative flex items-center justify-between">
                <h1 className="card-title text-center flex-grow">
                  {featuredVideo.title.length > 24 && isMobile
                    ? shortenText(featuredVideo.title, 24)
                    : featuredVideo.title}
                </h1>
                <button
                  className="btn btn-ghost btn-sm btn-circle"
                  onClick={() => setFeaturedVideo(null)}
                >
                  <XCircleOutline />
                </button>
              </div>

              {project && (
                <div className="flex justify-center items-center gap-3">
                  <div className="">
                    <TwitterShareButton
                      url={location.href}
                      options={{
                        text: `✨ Check out this video in the ${project.twitterHandle} MetaStage! ✨\n\n▶️▶️▶️\n\n`,
                        hashtags: `Metastage,Web3`
                      }}
                    />
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      )}
    </>
  );
}
