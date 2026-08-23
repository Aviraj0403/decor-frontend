import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    title: "Indian Table Setting: The Art of Hosting at Home",
    image:
      "https://lifencolors.in/cdn/shop/articles/gulnaz-linen-runner-and-mats-tablescape-set..jpg?v=1787307880&width=900",
    href: "/collections/best-selling-wallpapers",
  },
  {
    title: "Meaningful Gifts for the Home: The Art of Gifting",
    image: "https://lifencolors.in/cdn/shop/articles/image_46.png?v=1787313946&width=900",
    href: "/collections/best-selling-wallpapers",
  },
];

const testimonials = [
  {
    quote:
      "Life n Colors completely transformed my living room! The wallpaper design is absolutely breathtaking - a true work of art. The quality is exceptional, and I've received so many compliments. Highly recommend for unique beauty!",
    author: "Priya Sharma",
    image: "https://lifencolors.in/cdn/shop/files/WhatsApp_Image_2025-07-15_at_10.18.42_AM.jpg?v=1769067716&width=900",
  },
  {
    quote:
      "The experience with Life n Colors was seamless. Their team was incredibly helpful, and the wallpaper and fabric quality is superior, easy to clean, and looks stunning.",
    author: "Arjun Kapoor",
    image: "https://lifencolors.in/cdn/shop/files/customer_testimonial_image.jpg?v=1769067678&width=900",
  },
  {
    quote:
      "Life n Colors delivered beyond my expectations for my nursery's custom wallpaper. The bespoke design service was fantastic, perfectly capturing my vision.",
    author: "Meera Singh",
    image:
      "https://lifencolors.in/cdn/shop/files/preview_images/3a082f6d84584c1a8360fc65163a807c.thumbnail.0000000000_400x.jpg?v=1756884060",
  },
];

function BlogCard({ post }) {
  return (
    <a href={post.href} className="group relative block min-h-[270px] sm:min-h-[330px]">
      <div className="h-[230px] w-[68%] overflow-hidden bg-[#eee8df] sm:h-[285px]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="absolute right-0 top-[38px] flex min-h-[200px] w-[58%] flex-col justify-between bg-white px-7 py-8 sm:top-[56px] sm:min-h-[235px] sm:px-10">
        <h3 className="font-sans text-[15px] font-normal leading-[1.25] tracking-[0.03em] text-black sm:text-[18px]">
          {post.title}
        </h3>
        <span className="inline-block w-fit border-b border-transparent pb-1 font-sans text-[14px] tracking-[0.24em] text-black transition group-hover:border-black">
          Read more
        </span>
      </div>
    </a>
  );
}

export default function BlogStoriesSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = testimonials[activeIndex];

  const move = (direction) => {
    setActiveIndex((current) => {
      if (direction === "next") return (current + 1) % testimonials.length;
      return (current - 1 + testimonials.length) % testimonials.length;
    });
  };

  return (
    <section className="bg-white px-4 pb-12 pt-2 sm:px-6 sm:pb-16 lg:px-9">
      <div className="mx-auto max-w-[1680px] border-t border-black/18 pt-8">
        <h2 className="text-center font-serif text-[21px] font-normal leading-tight text-black sm:text-[28px]">
          Blog posts
        </h2>

        <div className="mt-3">
          <a
            href="/collections/best-selling-wallpapers"
            className="inline-block border-b-2 border-black pb-1 font-sans text-[13px] text-black"
          >
            View all posts
          </a>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>

        <div className="relative mt-10 grid min-h-[235px] items-center gap-8 md:grid-cols-[1fr_260px] lg:mt-12 lg:grid-cols-[1fr_320px]">
          <button
            type="button"
            onClick={() => move("prev")}
            className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center text-black md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={26} strokeWidth={1.5} />
          </button>

          <div className="px-0 md:px-12 lg:px-16">
            <div className="font-sans text-[16px] tracking-[0.12em] text-black">*****</div>
            <p className="mt-4 max-w-4xl font-sans text-[14px] leading-5 text-[#555]">{active.quote}</p>
            <p className="mt-3 font-sans text-[14px] text-[#8d8d8d]">- {active.author}</p>
          </div>

          <div className="aspect-[1/1] max-w-[320px] overflow-hidden bg-[#eee8df] justify-self-center md:max-w-none">
            <img src={active.image} alt={active.author} className="h-full w-full object-cover" loading="lazy" />
          </div>

          <button
            type="button"
            onClick={() => move("next")}
            className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center text-black md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight size={26} strokeWidth={1.5} />
          </button>

          <div className="flex justify-center gap-2 md:hidden">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full ${activeIndex === index ? "bg-black" : "bg-black/25"}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
