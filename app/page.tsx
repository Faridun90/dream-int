import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

import HeroSection from "@/components/landing_page/HeroSection";
import FloatingStars from "@/components/landing_page/FloatingStars";
import NavigationServer from "@/components/landing_page/NavigationServer";
import FeaturesSection from "@/components/landing_page/FeaturesSection";
import TrustSection from "@/components/landing_page/TrustSection";
import Footer from "@/components/landing_page/Footer";

export default async function DreamIntLanding() {
  const user = await db.user.findFirst({
    where: {
      email: "test@test.com",
    },
  });
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-background">
      <NavigationServer />
      <FloatingStars />
      <HeroSection />
      <FeaturesSection />
      <TrustSection />
      <Footer />
    </div>
  );
}
