import React from "react";
import { useNavigate } from "react-router-dom";

const filters = [
  "All",
  "Indian",
  "Tropical",
  "Floral",
  "Chinoiserie",
  "European",
  "Pichwai",
  "Abstract",
];

const products = [
  {
    title: "the syntax of spring customised wallpaper",
    slug: "the-syntax-of-spring-customised-wallpaper",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/the-syntax-of-spring-heritage-wallpaper-dining-room.webp?v=1783085459&width=640",
  },
  {
    title: "malabar kerela wallpaper, customised",
    slug: "malabar-kerela-themed-wallpaper",
    price: "7,500",
    tag: "Tropical",
    image:
      "https://lifencolors.in/cdn/shop/files/malabar-kerala-backwaters-mural-living-room.webp?v=1776238197&width=640",
  },
  {
    title: "mint blossom vintage chinoiserie wallpaper, light blue",
    slug: "mint-blossom-light-blue-chinoiserie-wallpaper",
    price: "7,500",
    tag: "Chinoiserie",
    image:
      "https://lifencolors.in/cdn/shop/files/mint-blossom-vintage-chinoiserie-light-blue-wallpaper-full.webp?v=1776685729&width=640",
  },
  {
    title: "kusum indian theme wallpaper",
    slug: "kusum-indian-floral-jharokha-and-stripes-design-wallpaper",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/kusum-mughal-floral-striped-wallpaper-living-room.webp?v=1773911217&width=640",
  },
  {
    title: "petals of persia customised wallpaper",
    slug: "petals-of-persia-customised-wallpaper",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/petals-of-persia-heritage-wallpaper-dining-room.webp?v=1783063394&width=640",
  },
  {
    title: "munnar wallpaper: vintage indian tea garden mural",
    slug: "munnar-wallpaper-vintage-indian-tea-garden-mural",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/munnar-scenic-hill-station-mural-living-room..webp?v=1781845899&width=640",
  },
  {
    title: "tropical vintage nature wallpaper",
    slug: "tropical-jungle-themed-wallpaper-customised-vintage-style",
    price: "6,300",
    tag: "Tropical",
    image:
      "https://lifencolors.in/cdn/shop/files/Tropical_Jungle_Themed_Wallpaper_Customised_Vintage_Style.webp?v=1753692071&width=640",
  },
  {
    title: "whispering moors wallpaper, muted vintage",
    slug: "whispering-moors-wallpaper-for-walls-customised",
    price: "7,500",
    tag: "European",
    image:
      "https://lifencolors.in/cdn/shop/files/whispering-moors-wallpaper-room.webp?v=1773986270&width=640",
  },
  {
    title: "anant vriksha - tree of life kalamkari wallpaper, beige",
    slug: "anant-vriksha-tree-of-life-kalamkari-mural-customise",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/anant-vriksha-wallpaper-beige-study-room..webp?v=1770030291&width=640",
  },
  {
    title: "jade blossom chinoiserie wallpaper, dusty pink",
    slug: "jade-blossom-chinoiserie-wallpaper-dusty-pink",
    price: "7,500",
    tag: "Chinoiserie",
    image:
      "https://lifencolors.in/cdn/shop/files/Jade_Blossom_Chinoiserie_Wallpaper_Dusty_Pink.webp?v=1755949627&width=640",
  },
  {
    title: "rang rali, indian wallpaper",
    slug: "rang-rali-indian-wallpaper-inspired-by-fabrics-of-india",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/Rang-Rali-Indian-Wallpaper-Living-Room.webp?v=1778154551&width=640",
  },
  {
    title: "kovalam, tropical green wallpaper",
    slug: "kovalam-tropical-wallpaper",
    price: "7,500",
    tag: "Tropical",
    image:
      "https://lifencolors.in/cdn/shop/files/kovalam-wallpaper-design-bedroom-0111.webp?v=1776242109&width=640",
  },
  {
    title: "twilight haven vintage european wallpaper",
    slug: "twilight-haven-vintage-european-style-wallpaper-smoky-olive-color",
    price: "7,500",
    tag: "European",
    image:
      "https://lifencolors.in/cdn/shop/files/Twilight_Haven_Vintage_European_Style_Wallpaper_in_smoky_olive.webp?v=1753621608&width=640",
  },
  {
    title: "pastel paradise abstract wallpaper, pink",
    slug: "pastel-paradise-abstract-pattern-wallpaper-for-room-pink",
    price: "6,300",
    tag: "Abstract",
    image:
      "https://lifencolors.in/cdn/shop/files/pastel-paradise-wallpaper.webp?v=1753691252&width=640",
  },
  {
    title: "plum blossom chinoiserie wallpaper, cream",
    slug: "plum-blossom-chinoiserie-cream-color-wallpaper-for-rooms",
    price: "6,300",
    tag: "Chinoiserie",
    image:
      "https://lifencolors.in/cdn/shop/files/plum-blossom-beige-chinoiserie-wallpaper-bedroom.webp?v=1785324918&width=640",
  },
  {
    title: "vintage forest theme wallpaper",
    slug: "vintage-sepia-forest-wallpaper",
    price: "6,300",
    tag: "Tropical",
    image:
      "https://lifencolors.in/cdn/shop/files/vintage-forest-mural-modern-sofa-backdrop.webp?v=1776943979&width=640",
  },
  {
    title: "gopuram vatika wallpaper, south indian style",
    slug: "gopuram-vatika-wallpaper-in-indian-style-customised",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/Gopuram_Vatika_Wallpaper.webp?v=1753621308&width=640",
  },
  {
    title: "rosa chinoiserie, pink wallpaper",
    slug: "rosa-chinoiserie-pink-color-room-wallpaper",
    price: "7,500",
    tag: "Chinoiserie",
    image: "https://lifencolors.in/cdn/shop/files/rosa-chinoiserie-pink-wallpaper.jpg?v=1769834365&width=640",
  },
  {
    title: "geet madhubani art wallpaper",
    slug: "geet-madhubanis-wallpaper-clay-beige",
    price: "7,500",
    tag: "Indian",
    image:
      "https://lifencolors.in/cdn/shop/files/geet-madhubani-mural-clay-beige-living-room.webp?v=1774006458&width=640",
  },
  {
    title: "bagiya, blue chinoiserie wallpaper",
    slug: "bagiya-peacock-chinoiserie-wallpaper",
    price: "7,500",
    tag: "Chinoiserie",
    image: "https://lifencolors.in/cdn/shop/files/bagiya_bedroom_wallpaper.webp?v=1753624399&width=640",
  },
  {
    title: "pakhi, peacock chinoiserie wallpaper",
    slug: "pakhi-chinoiserie-design-wallpaper-customised",
    price: "7,500",
    tag: "Chinoiserie",
    image:
      "https://lifencolors.in/cdn/shop/files/pakhi-chinoiserie-peacock-mural-ochre-gold-living-room.webp?v=1773911608&width=640",
  },
  {
    title: "aalishan indian carpet design wallpaper",
    slug: "aalishan-exquisite-indian-carpet-design-wallpaper",
    price: "7,500",
    tag: "Indian",
    image: "https://lifencolors.in/cdn/shop/files/aalishan-wallpaper-bedrooms.webp?v=1776143522&width=640",
  },
  {
    title: "worth it abstract wallpaper, feather pink",
    slug: "worth-it-premium-abstract-pattern-wallpaper-design-for-walls-pink",
    price: "6,300",
    tag: "Abstract",
    image:
      "https://lifencolors.in/cdn/shop/products/worth-it-abstract-wallpaper-feather-pink-hallway.jpg?v=1757144321&width=640",
  },
  {
    title: "sayonee, nature theme wallpaper green",
    slug: "sayonee-wallpaper-for-walls",
    price: "7,500",
    tag: "Tropical",
    image:
      "https://lifencolors.in/cdn/shop/files/sayonee-haveli-tropical-garden-mural-dining.webp?v=1777633238&width=640",
  },
];

function CollectionProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => navigate(`/product/${product.slug}`)}
        className="block aspect-[0.86/1] w-full overflow-hidden bg-[#f5f1eb]"
        aria-label={product.title}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </button>

      <button
        type="button"
        onClick={() => navigate(`/product/${product.slug}`)}
        className="mt-4 block w-full text-left"
      >
        <h3 className="font-sans text-[12px] font-normal leading-5 text-black transition group-hover:text-primary-700 sm:text-[13px]">
          {product.title}
        </h3>
      </button>
      <p className="mt-1 font-sans text-[10px] leading-4 text-[#8b8b8b] sm:text-[11px]">
        Starts from {"\u20b9"}
        {product.price}
      </p>
    </article>
  );
}

function HelpTile({ compact = false }) {
  return (
    <div className={`bg-[#8f251b] p-6 text-white ${compact ? "col-span-full" : "col-span-full lg:col-span-2"}`}>
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/75">Design help</p>
      <h2 className="mt-3 font-serif text-[20px] font-normal leading-tight text-white sm:text-[24px]">
        Need help choosing the right wallpaper?
      </h2>
      <p className="mt-4 max-w-xl font-sans text-xs leading-5 text-white/85">
        Share your room photo on WhatsApp and our design team will suggest options that fit your space and style.
      </p>
      <a
        href="https://wa.me/918700986208"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block border-b border-white pb-1 font-sans text-xs uppercase tracking-[0.16em] text-white"
      >
        WhatsApp Us
      </a>
    </div>
  );
}

export default function BestSellingWallpapers() {
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  const visibleProducts =
    selectedFilter === "All" ? products : products.filter((product) => product.tag === selectedFilter);

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 pb-8 pt-5 sm:px-6 lg:px-9">
        <div className="mx-auto max-w-[1680px]">
          <div className="text-center font-sans text-[9px] uppercase tracking-[0.16em] text-[#262626] sm:text-[10px]">
            <span className="inline-block">* 4.95/5 Rating</span>
            <span className="mx-4 inline-block text-black/55">.</span>
            <span className="inline-block">17,000+ Homes</span>
            <span className="mx-4 inline-block text-black/55">.</span>
            <span className="inline-block">28+ Countries</span>
          </div>

          <h1 className="mt-7 text-center font-serif text-[24px] font-normal leading-tight text-black sm:text-[32px]">
            Best Selling Wallpaper Designs
          </h1>
          <p className="mx-auto mt-3 max-w-[820px] text-center font-sans text-[13px] leading-6 text-[#1f2937] sm:text-[16px]">
            The wallpapers most homes across 28 countries keep coming back to - from the misty calm of Sukoon to the
            Mughal detail of Meena Bazar. The designs that earned their place on more walls than any others.
          </p>

          <div className="mt-8 flex justify-center sm:justify-end">
            <label className="sr-only" htmlFor="design-filter">
              Shop by Design
            </label>
            <select
              id="design-filter"
              value={selectedFilter}
              onChange={(event) => setSelectedFilter(event.target.value)}
              className="h-9 border border-[#d7d0c8] bg-white px-3 font-sans text-xs text-[#4f453f] outline-none transition hover:border-black"
            >
              <option value="All">Shop by Design</option>
              {filters
                .filter((filter) => filter !== "All")
                .map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {filters.map((filter) => {
              const isActive = selectedFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`h-9 rounded-full border px-5 font-sans text-[11px] uppercase tracking-[0.08em] transition sm:min-w-[82px] ${
                    isActive
                      ? "border-[#151515] bg-[#151515] text-white"
                      : "border-[#d8d0c7] bg-white text-[#1f2937] hover:border-[#151515]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-4 pb-16 pt-4 sm:px-6 lg:px-9">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 md:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <React.Fragment key={product.slug}>
              {index === 12 && <HelpTile />}
              <CollectionProductCard product={product} />
            </React.Fragment>
          ))}

          {visibleProducts.length === 0 && (
              <p className="col-span-full py-16 text-center font-sans text-xs text-black/60">
              No wallpapers match the selected filter.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
