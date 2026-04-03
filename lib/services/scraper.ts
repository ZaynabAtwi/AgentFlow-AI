import * as cheerio from "cheerio";

export async function scrapeWebsite(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const html = await res.text();
    const $ = cheerio.load(html);

    const text = $("body").text().replace(/\s+/g, " ").slice(0, 5000);
    const hasChatbot = /chat|assistant|intercom|drift/i.test(html);
    const hasBookingSystem = /book|appointment|schedule|calendly/i.test(html);
    const outdatedUx = /<marquee|table\s+border|font\s+size/i.test(html);

    return {
      text,
      hasChatbot,
      hasBookingSystem,
      outdatedUx,
    };
  } catch {
    return {
      text: "",
      hasChatbot: false,
      hasBookingSystem: false,
      outdatedUx: false,
    };
  }
}
