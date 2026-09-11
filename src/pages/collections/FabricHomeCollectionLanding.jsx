import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategorySlug } from "../../services/productApi";
import ProductCard from "../../components/Product/ProductCard";

const collectionPages = {
  "ready-made-curtains": {
    title: "Ready-Made Designer Curtains",
    description: "Soft, finished curtains for bedrooms, living rooms, and dining spaces - crafted to frame light, add texture, and complete the room.",
    categorySlug: "curtains",
  },
  "sofa-and-chair-fabric": {
    title: "Sofa & Chair Upholstery Fabrics",
    description: "Designer upholstery fabrics in rich textures, calm neutrals, and art-led patterns for sofas, chairs, benches, and custom seating.",
    categorySlug: "upholstery-fabrics",
  },
  "cushion-covers": {
    title: "Designer Cushion Covers",
    description: "Handcrafted cushion covers that bring color, embroidery, pattern, and finishing detail into everyday living spaces.",
    categorySlug: "cushion-covers",
  },
  "tabler-runners-mats": {
    title: "Designer Table Linen",
    description: "Table runners, mats, and dining textiles designed for warm hosting, festive tables, and polished everyday meals.",
    categorySlug: "table-linen",
  },
  "stitched-stories-hand-embroidered-wall-art": {
    title: "Hand-Embroidered Wall Art",
    description: "Textile wall art with hand-finished embroidery, detailed storytelling, and a soft crafted presence for special walls.",
    categorySlug: "embroidered-wall-arts",
  },
  "wallart-posters": {
    title: "Printed Wall Arts",
    description: "Art-led wall pieces and prints designed to bring history, pattern, and color into modern homes with ease.",
    categorySlug: "printed-wall-arts",
  },
  "beautiful-curtain-tie-backs": {
    title: "Handcrafted Curtain Tiebacks",
    description: "Curtain tiebacks and holdbacks made to finish drapes beautifully with texture, craft, and quiet decorative detail.",
    categorySlug: "curtain-tiebacks",
  },
};

export default function FabricHomeCollectionLanding() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);
  const config = collectionPages[slug] || {
    title: "Fabric & Home Collection",
    description: "Explore curtains, upholstery fabrics, cushion covers, table linen, wall art, and finishing accents for layered homes.",
    categorySlug: "fabric-home",
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getProductsByCategorySlug(config.categorySlug || slug, 1, 100);
        if (data && data.success && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching collection products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [slug, config.categorySlug]);

  return (
    <section className="bg-brand-bg min-h-screen pb-16">
      <div className="bg-[#D7D7D7] border-b border-[#D7D7D7] py-14 px-6 text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl text-[#103438] tracking-wider uppercase font-semibold mb-4">
          {config.title}
        </h1>
        <p className="max-w-3xl mx-auto text-[#103438]/75 text-sm md:text-base leading-relaxed font-light font-sans">
          {config.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#2D545E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-medium">
            No products found in this collection.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
