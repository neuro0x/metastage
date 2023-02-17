import { XCircleOutline } from "heroicons-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { TwitterShareButton } from "react-twitter-embed";
import { shortenAddress, shortenText } from "../../../utils/general-utils";
import { useAppState } from "../../hooks/useAppState";

export function VideoDetailModal() {
  const { project, videos, selectedVideo, setSelectedVideo } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (videos.length && router.query?.video) {
      setSelectedVideo(
        videos.find((it) => it.id.toString() === router.query.video) || null
      );
    }
  }, [videos, router.query]);

  return (
    <>
      {selectedVideo && (
        <div className="absolute z-20 w-screen h-screen bg-black bg-opacity-75 flex flex-col">
          <main className="card mx-auto my-auto bg-black">
            <section className="p-3 mx-auto">
              <video
                loop={!isMobile}
                autoPlay={!isMobile}
                controls
                muted
                crossOrigin="anonymous"
                width={512}
                height={512}
              >
                <source
                  src={selectedVideo.video}
                  type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                />
              </video>
            </section>

            <section className="card-body gap-5">
              <div className="relative flex items-center justify-between">
                <h1 className="card-title text-center flex-grow">
                  {selectedVideo.title.length > 24 && isMobile
                    ? shortenText(selectedVideo.title, 24)
                    : selectedVideo.title}
                </h1>
                <button
                  className="btn btn-ghost btn-sm btn-circle"
                  onClick={() => setSelectedVideo(null)}
                >
                  <XCircleOutline />
                </button>
              </div>

              {selectedVideo.description && (
                <div tabIndex={0} className="collapse collapse-arrow border">
                  <div className="collapse-title font-bold">Description</div>
                  <div className="collapse-content">
                    <p className={"w-96"}>{selectedVideo.description}</p>
                  </div>
                </div>
              )}

              {selectedVideo?.creator?.data?.id && (
                <div tabIndex={0} className="collapse collapse-arrow border">
                  <div className="collapse-title font-bold">Creator</div>
                  <div className="collapse-content">
                    <p className={"w-96"}>
                      <span className={"font-bold"}>Username: </span>
                      {selectedVideo.creator.data.attributes.username}
                    </p>
                    <p className={"w-96"}>
                      <span className={"font-bold"}>Solana Address: </span>
                      <a
                        href={`https://solscan.io/account/${selectedVideo.creator.data.attributes.solanaAddress}`}
                        target={"_blank"}
                        rel={"noreferrer"}
                        className={"link link-primary"}
                      >
                        {shortenAddress(
                          selectedVideo.creator.data.attributes.solanaAddress
                        )}
                      </a>
                    </p>
                    {!!selectedVideo.creator.data.attributes
                      .ethereumAddress && (
                      <p className={"w-96"}>
                        <span className={"font-bold"}>Ethereum Address: </span>
                        <a
                          href={`https://etherscan.io/address/${selectedVideo.creator.data.attributes.ethereumAddress}`}
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={"link link-primary"}
                        >
                          {shortenAddress(
                            selectedVideo.creator.data.attributes
                              .ethereumAddress
                          )}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedVideo && project && (
                <div className="flex justify-center items-center gap-3">
                  <div className="">
                    <TwitterShareButton
                      url={location.href}
                      options={{
                        text: `✨ Check out this video in the ${project.twitterHandle} MetaStage! ✨\n\nUploaded by ${selectedVideo.creator.data.attributes.username}\n\n▶️▶️▶️\n\n`,
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
