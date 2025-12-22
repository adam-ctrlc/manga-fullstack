"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMangaDetails } from "@/services/manga";
import { Container } from "@/components/common/Container";
import {
  SimulationModal,
  CoverSection,
  MangaPoster,
  MangaInfo,
  Synopsis,
  ChapterList,
  MangaTitle,
  LoadingSkeleton,
  ErrorState,
} from "./components";

export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const {
    item: detailsData,
    isLoading: loading,
    isError: error,
  } = useMangaDetails(id);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleBackClick = () => {
    router.back();
  };

  const handleChapterClick = (chapterNumber) => {
    setSelectedChapter(chapterNumber);
    setShowModal(true);
  };

  // Loading State
  if (loading || !detailsData) {
    return <LoadingSkeleton />;
  }

  // Error State
  if (error) {
    return <ErrorState error={error} onBackClick={handleBackClick} />;
  }

  const {
    attributes: {
      titles,
      canonicalTitle,
      synopsis,
      posterImage,
      coverImage,
      startDate,
      endDate,
      status,
      averageRating,
      popularityRank,
      subtype,
      chapterCount,
      volumeCount,
    },
  } = detailsData;

  const displayTitle =
    titles?.en || titles?.en_jp || canonicalTitle || "Unknown Title";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Simulation Modal */}
      <SimulationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        chapterNumber={selectedChapter}
      />

      {/* Cover Image Section */}
      <CoverSection
        coverImage={coverImage}
        displayTitle={displayTitle}
        onBackClick={handleBackClick}
      />

      <Container className="-mt-24 relative z-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Poster & Info */}
          <div className="w-full lg:w-1/3">
            <MangaPoster
              posterImage={posterImage}
              displayTitle={displayTitle}
            />
            <MangaInfo
              subtype={subtype}
              status={status}
              averageRating={averageRating}
              popularityRank={popularityRank}
              startDate={startDate}
              endDate={endDate}
              chapterCount={chapterCount}
              volumeCount={volumeCount}
            />
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-2/3">
            <MangaTitle
              titles={titles}
              canonicalTitle={canonicalTitle}
              subtype={subtype}
              status={status}
            />
            <Synopsis synopsis={synopsis} />
            <ChapterList
              chapterCount={chapterCount}
              onChapterClick={handleChapterClick}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
