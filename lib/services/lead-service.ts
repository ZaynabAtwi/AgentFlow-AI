import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { scrapeWebsite } from "@/lib/services/scraper";

export const leadSearchSchema = z.object({
  industry: z.string().min(2),
  location: z.string().min(2),
});

interface SerpLead {
  title?: string;
  website?: string;
  phone?: string;
  address?: string;
}

async function fetchSerpLeads(industry: string, location: string): Promise<SerpLead[]> {
  if (!process.env.SERPAPI_API_KEY) {
    return [
      {
        title: `${industry} Prime Clinic`,
        website: "https://example.com",
        phone: "+1-555-0100",
        address: `${location}`,
      },
    ];
  }

  const params = new URLSearchParams({
    engine: "google_maps",
    q: `${industry} in ${location}`,
    api_key: process.env.SERPAPI_API_KEY,
  });

  const res = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
  const data = await res.json();
  return data.local_results || [];
}

export async function searchAndSaveLeads(userId: string, industry: string, location: string) {
  const results = await fetchSerpLeads(industry, location);

  const prepared = await Promise.all(
    results.slice(0, 20).map(async (lead) => {
      const website = lead.website || "";
      const analysis = website ? await scrapeWebsite(website) : { hasChatbot: false, hasBookingSystem: false, outdatedUx: false };
      const score = Number(!analysis.hasChatbot) * 40 + Number(analysis.outdatedUx) * 30 + Number(!analysis.hasBookingSystem) * 30;

      return {
        name: lead.title || "Unknown Business",
        website: lead.website,
        phone: lead.phone,
        address: lead.address,
        industry,
        location,
        score,
        hasChatbot: analysis.hasChatbot,
        hasBookingSystem: analysis.hasBookingSystem,
        outdatedUx: analysis.outdatedUx,
        scoreReason: `No chatbot:${!analysis.hasChatbot}, Outdated UX:${analysis.outdatedUx}, Booking:${analysis.hasBookingSystem}`,
      };
    })
  );

  const created = await prisma.$transaction(
    prepared.map((lead) =>
      prisma.lead.create({
        data: {
          userId,
          ...lead,
        },
      })
    )
  );

  return created;
}
