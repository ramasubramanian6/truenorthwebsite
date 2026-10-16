/* Site-wide settings. Set the NEXT_PUBLIC_ values at build time. */

export const SITE = {
  name: "True North IT Consulting",
  short: "True North",
  origin: (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://truenorthitc.com").replace(/\/$/, ""),
  email: "support@truenorthitc.com",
  phone: "+91 95665 56056",
  phoneHref: "tel:+919566556056",
  whatsapp: "https://wa.me/919566556056",
  linkedin: "https://www.linkedin.com/company/truenorth-it",
  office: "Tirunelveli, Tamil Nadu, India",
  /* The existing contact API (backend/routes/contact.js) on Vercel. It
     allows requests from truenorthitc.com; elsewhere the form falls back to
     a prefilled email so no enquiry is lost. */
  contactApi: (process.env.NEXT_PUBLIC_CONTACT_API || "https://truenorthwebsite.vercel.app/api/contact").replace(/\/$/, ""),
  /* GRIT's own website. Paste the address here (or set NEXT_PUBLIC_GRIT_URL)
     once it is hosted; every "Visit the GRIT website" link on this site uses
     it. While it is empty those links are hidden and GRIT links go to /grit/. */
  gritUrl: process.env.NEXT_PUBLIC_GRIT_URL || "",
};
