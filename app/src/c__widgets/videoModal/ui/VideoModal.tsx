import React, { createRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {BaseModal} from "@/shared/ui";
import { CrossIcon } from "@/shared/ui";

type Props = {
  src: string
}

export function VideoModal({src}: Props) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  const modalElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsVideoModalOpen(true);
    }, 1000);
  }, [modalElement]);

  useEffect(() => {
    setRenderTrigger((prev) => prev + 1);
  }, []);

  const handleCloseButton = () => {
    setIsVideoModalOpen(false);
    videoElement.current?.pause();
  };

  const handleVideoClick = () => {
    if (isVideoPlaying && !isControlsVisible) {
      showControlsTemporary();
    }
  };

  const timeoutId = useRef<NodeJS.Timeout | string>("");

  const showControlsTemporary = () => {
    clearTimeout(timeoutId.current);
    setIsControlsVisible(true);
    timeoutId.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 2800);
  };

  const videoElement = createRef<HTMLVideoElement>();

  useEffect(() => {
    if (isVideoPlaying) {
      videoElement.current?.play();
      setIsControlsVisible(false);
    } else {
      videoElement.current?.pause();
    }
  }, [isVideoPlaying]);

  useEffect(() => {
    const handleVideoPlayEvent = () => {
      setIsVideoPlaying(true);
      setIsControlsVisible(false);
      clearTimeout(timeoutId.current);
    };
    const handleVideoPauseEvent = () => {
      setIsVideoPlaying(false);
      setIsControlsVisible(true);
      clearTimeout(timeoutId.current);
    };
    if (videoElement.current) {
      videoElement.current.addEventListener("play", handleVideoPlayEvent);
      videoElement.current.addEventListener("pause", handleVideoPauseEvent);
    }
    return () => {
      if (videoElement.current) {
        videoElement.current.removeEventListener("play", handleVideoPlayEvent);
        videoElement.current.removeEventListener(
          "pause",
          handleVideoPauseEvent
        );
      }
    };
  }, [videoElement.current]);

  return (
    <BaseModal
      isSubmitButtonHidden={true}
      isCloseButtonHidden={true}
      ref={modalElement}
      renderTrigger={renderTrigger}
      isOpen={isVideoModalOpen}
      handleClose={() => {}}
    >
      <div
        onClick={handleVideoClick}
        onTouchStart={handleVideoClick}
        className="overflow-hidden rounded-[12px] mt-[-28px] mx-[-20px] mb-[-20px] relative bg-black"
      >
        <video className="relative z-0" ref={videoElement} controls width="384">
          <source src={src} type="video/mp4" />
        </video>
        <div
          className={clsx(
            "absolute  z-20 top-0 left-0 w-full h-full pointer-events-none "
          )}
        >
          <button
            onClick={handleCloseButton}
            className={clsx(
              "absolute top-[20px] right-[15px]  w-[30px] h-[30px] pointer-events-auto",
              { "pointer-events-auto": isControlsVisible }
            )}
          >
            <CrossIcon
              color="white"
              className="w-[15px] h-[15px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
