import React from "react";
import { Link } from "react-router-dom";

const lookbookSlides = [
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0001_11.webp?v=1785935940&width=900",
    alt: "Petal Knot curtain tieback",
    text: "A charming velvet flower detailed with elegant threads and beads on a matching rope to beautifully cinch your curtains.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0003_9.webp?v=1785935940&width=900",
    alt: "Life n Colors linen lyric collection",
    text: "The afternoon sun slips through the linen, casting long striped shadows that dance with wandering vines.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0004_Layer-3.webp?v=1785935940&width=900",
    alt: "Hiranya luxury silk embroidered cushion cover",
    text: "Gold silk-satin scattered with Mughal floral sprigs and hand-stitched sequins that catch the light.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0002_10.webp?v=1785935940&width=900",
    alt: "Linen Poet cushion cover",
    text: "A delicate stitched spine bridges rich woven textures, finished with hand-knotted jute corners.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0005_7.webp?v=1785935941&width=900",
    alt: "Echoes of Casablanca lookbook",
    text: "Bathed in golden light, the collection embodies the detailed artistry of Moroccan craftsmanship and the elegance of Riad design. Textural weaves, geometric arch motifs, and stylized palm silhouettes trace the visual language of sun-warmed central patios and Moorish architecture. Earthy...",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0008_4.webp?v=1785935940&width=900",
    alt: "Nazneen sofa throw",
    text: "The Nazneen Throw brings understated elegance to your living space with soft texture, floral applique, and tassel details.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0010_2.webp?v=1785935940&width=900",
    alt: "Nar tie back",
    text: "A handcrafted luxury curtain tie back with embellished pomegranate seeds, twisted gold cord, and elegant tassels.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0007_5.webp?v=1785935941&width=900",
    alt: "Riwaayat table mats",
    text: "Linen-blend placemats in a patchwork of paisley, botanical, and ikat prints with decorative coin trim.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0006_Layer-8.webp?v=1785935941&width=900",
    alt: "Zayan weave cushion cover",
    text: "Smooth velvet suede meets woven jute arches, traced with delicate pearl beads to blend rustic Moroccan heritage with elegant luxury.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0012_Layer-6.webp?v=1785935941&width=900",
    alt: "Garden Gala table runner",
    text: "Sage-green velvet with aari-embroidered leaf trails, scalloped edges, and hand-knotted tassels.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0013_Layer-7.webp?v=1785935941&width=900",
    alt: "Garden Gala table mats",
    text: "A refreshing sanctuary of textured velvet, block-printed leaf tracks, and organic scalloped boundaries.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0000_12.webp?v=1785935941&width=900",
    alt: "Florentine ruffle table runner",
    text: "A touch of British tea-room charm, handwoven to make every gathering feel beautifully unhurried.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0011_1.webp?v=1785935940&width=900",
    alt: "Gulbano tie back",
    text: "Handcrafted embroidery, braided tie cord, pearl detailing, and decorative triple tassels.",
  },
  {
    image:
      "https://lifencolors.in/cdn/shop/files/PNGS-for-website_0009_3.webp?v=1785935941&width=900",
    alt: "Gulzar collection",
    text: "Inspired by the tranquil elegance of Persian gardens, Gulzar weaves delicate floral motifs into modern spaces.",
  },
];

const loopSlides = [...lookbookSlides, lookbookSlides[0]];

function CarouselDots({ activeIndex, onSelect }) {
  return (
    <div className="flex justify-center gap-2" aria-label="Lookbook slides">
      {lookbookSlides.map((slide, index) => (
        <button
          key={slide.image}
          type="button"
          className={`h-[8px] w-[8px] rounded-full border border-[#8f0018] transition ${
            index === activeIndex ? "bg-[#8f0018]" : "bg-white"
          }`}
          aria-label={`Show slide ${index + 1}`}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

export default function LookbookPreview() {
  const [activeProduct, setActiveProduct] = React.useState(8);
  const [productTransition, setProductTransition] = React.useState(true);

  React.useEffect(() => {
    const productTimer = window.setInterval(() => {
      setActiveProduct((current) => (current + 1) % lookbookSlides.length);
    }, 5200);

    return () => {
      window.clearInterval(productTimer);
    };
  }, []);

  const resetProductLoop = () => {
    if (activeProduct !== lookbookSlides.length) return;
    setProductTransition(false);
    setActiveProduct(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setProductTransition(true));
    });
  };

  const selectProduct = (index) => {
    setProductTransition(true);
    setActiveProduct(index);
  };

  return (
    <section className="bg-white px-4 pb-10 pt-7 md:px-10 md:pb-12 md:pt-8">
      <h2 className="text-center text-[32px] font-light uppercase tracking-[0.08em] text-[#8f0018] md:text-[46px]">
        LOOKBOOK
      </h2>

      <div className="mx-auto mt-6 grid max-w-[1180px] grid-cols-1 items-center gap-8 md:mt-7 md:grid-cols-2 md:gap-12">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black">
            LOOKBOOKS
          </p>
          <h3 className="mt-3 text-[25px] font-normal leading-tight text-[#8f0018] md:text-[32px]">
            The Art of Inspiration
          </h3>
          <p className="mx-auto mt-3 max-w-[610px] text-[14px] leading-[1.6] text-black md:text-[16px]">
            Every Prasanaakshi masterpiece begins as a quiet observation and
            conversation between memory and craft. The lookbook presents a
            world where memory, travel, nature, art, and culture inspire design
            stories, creating homes layered with beauty, character, and meaning.
          </p>
          <Link
            to="/new-products"
            className="mt-6 inline-flex border border-black px-7 py-3 text-[11px] font-medium uppercase tracking-[0.26em] text-black transition hover:bg-black hover:text-white"
          >
            Discover Our Lookbooks
          </Link>
        </div>

        <div className="overflow-hidden text-center">
          <div
            className={`flex ${
              productTransition
                ? "transition-transform duration-1000 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${activeProduct * 100}%)` }}
            onTransitionEnd={resetProductLoop}
          >
            {loopSlides.map((slide, index) => (
              <div key={`${slide.image}-${index}`} className="w-full shrink-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="mx-auto h-[210px] w-[240px] object-contain md:h-[270px] md:w-[320px]"
                  loading="lazy"
                />
                <p className="mx-auto mt-5 max-w-[510px] text-[14px] leading-[1.55] text-[#555] md:text-[16px]">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-1 md:grid-cols-2 md:gap-12">
        <div className="hidden md:block" />
        <div className="flex justify-center">
          <CarouselDots
            activeIndex={activeProduct % lookbookSlides.length}
            onSelect={selectProduct}
          />
        </div>
      </div>
    </section>
  );
}
