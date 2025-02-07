import React from "react";
import Hero from "../../components/hero/HeroSection.jsx";
import FeatureSection from "../../components/features/Features.jsx";
import BusinessFeatures from "../../components/features/BusinessFeatures.jsx";
import ExploreCategory from "../../components/exploreCategory/ExploreCategory.jsx";

const Home = () => {
  return (
    <main className="space-y-16 overflow-x-hidden bg-zinc-950 " id="home">
      <Hero />
      <FeatureSection />
      <BusinessFeatures />
      <ExploreCategory/>
    </main>
  );
};

export default Home;