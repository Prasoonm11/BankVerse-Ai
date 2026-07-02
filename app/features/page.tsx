import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AgentsSection from "@/components/AgentsSection";
import WorkflowSection from "@/components/WorkflowSection";
import DashboardPreview from "@/components/DashboardPreview";
import DigitalTwinSimulation from "@/components/DigitalTwinSimulation";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-navy-bg">
        <HeroSection />
        <StatsSection />
        <AgentsSection />
        <WorkflowSection />
        <DashboardPreview />
        <DigitalTwinSimulation />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
