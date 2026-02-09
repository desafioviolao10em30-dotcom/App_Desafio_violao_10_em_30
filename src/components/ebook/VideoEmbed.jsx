import React from "react";

export default function VideoEmbed({ videoUrl, title }) {
  if (!videoUrl) return null;

  return (
    <div className="bg-black/30 rounded-2xl overflow-hidden border border-purple-700/50">
      <div className="px-4 py-3 text-white font-bold">{title}</div>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
