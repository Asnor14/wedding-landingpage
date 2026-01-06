"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import PhotoCarousel from "./components/PhotoCarousel";
import InvitationEnvelopeSection from "./components/InvitationEnvelopeSection";
import ButterflyScroll from "./components/ButterflyScroll";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  const [envelopeInView, setEnvelopeInView] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      <MusicPlayer />
      <ButterflyScroll envelopeInView={envelopeInView} />

      <HeroSection
        coupleName="Lucas & Amelia"
        weddingDate="June 14, 2026"
        invitationText="Together with their families, joyfully invite you to celebrate their wedding"
      />

      <StorySection />

      <PhotoCarousel
        title="Our Moments"
        images={[
          "/photos/photo-1.jpg",
          "/photos/photo-2.jpg",
          "/photos/photo-3.jpg",
          "/photos/photo-4.jpg",
          "/photos/photo-5.jpg",
          "/photos/photo-6.jpg",
        ]}
      />

      <InvitationEnvelopeSection onInViewChange={setEnvelopeInView} />
    </main>
  );
}
