import { email, phones, websiteHref } from "@/lib/contact";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LSAR* Works Group",
    url: websiteHref,
    email,
    telephone: phones.map((phone) => phone.href.replace("tel:", "")),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
    description:
      "An Integrated Alliance for Institutional Transformation & Brand Operations Management.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
