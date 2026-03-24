import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: "Location Not Found" };

  return {
    title: `Spice Hut ${location.name} — Hours, Menu & Contact`,
    description: location.description,
    openGraph: {
      title: `Spice Hut ${location.name}`,
      description: location.description,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return <LocationPageClient location={location} />;
}
