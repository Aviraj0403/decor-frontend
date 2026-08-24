import React from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Clock,
  FileCheck2,
  HelpCircle,
  LockKeyhole,
  Mail,
  PackageCheck,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Truck,
  Undo2,
} from "lucide-react";

const support = {
  email: "ayrajofficial@gmail.com",
  phone: "+91 9588360684",
};

const policyContent = {
  shipping: {
    eyebrow: "Shipping Policy",
    title: "Fast, protected delivery for every sacred order.",
    description:
      "We pack every Ayraj order with care and share tracking details as soon as your parcel is dispatched.",
    updated: "Last updated: June 2026",
    icon: Truck,
    heroTone: "from-brand-text via-accent to-primary-700",
    highlights: [
      { icon: Clock, title: "1-2 Days Processing", text: "Most orders are prepared and dispatched within 1-2 business days." },
      { icon: PackageCheck, title: "Secure Packaging", text: "Fragile and ritual items are packed with extra protection." },
      { icon: ShieldCheck, title: "Trusted Couriers", text: "Shipments move through reliable logistics partners across India." },
    ],
    sections: [
      {
        title: "Order Processing",
        body: "Orders are processed after successful payment confirmation. During high-demand festive periods, dispatch may take slightly longer, but our team will keep you informed.",
        items: ["Order confirmation is shared by email/SMS.", "Tracking details are shared after dispatch.", "Orders placed on holidays are processed on the next working day."],
      },
      {
        title: "Delivery Timelines",
        body: "Delivery time depends on your location and courier serviceability.",
        items: ["Metro cities: usually 3-6 business days.", "Other cities and towns: usually 5-9 business days.", "Remote locations may take 7-12 business days."],
      },
      {
        title: "Shipping Charges",
        body: "Shipping charges, if applicable, are shown during checkout before payment.",
        items: ["Free shipping may be available on selected order values or offers.", "COD availability depends on location and courier support.", "Any delivery exception will be communicated by support."],
      },
    ],
  },
  returnRefund: {
    eyebrow: "Return & Refund",
    title: "Simple support when something arrives wrong or damaged.",
    description:
      "If your order has an issue, raise a request quickly so our team can review and resolve it with care.",
    updated: "Last updated: June 2026",
    icon: RefreshCcw,
    heroTone: "from-brand-text via-accent to-primary-700",
    highlights: [
      { icon: Undo2, title: "7-Day Window", text: "Raise eligible return or exchange requests within 7 days of delivery." },
      { icon: BadgeCheck, title: "Quality Review", text: "Our team checks photos, packaging and order details before approval." },
      { icon: RefreshCcw, title: "Quick Resolution", text: "Approved cases are resolved through replacement, exchange, credit or refund." },
    ],
    sections: [
      {
        title: "Eligible Cases",
        body: "Returns are accepted for genuine order issues after support verification.",
        items: ["Damaged item received.", "Wrong item delivered.", "Missing item from order.", "Manufacturing defect visible on arrival."],
      },
      {
        title: "Return Conditions",
        body: "Products must be unused and returned with original packaging wherever possible.",
        items: ["Request must be raised within 7 days.", "Product photos and unboxing details may be requested.", "Used, altered or damaged-by-customer products may not qualify."],
      },
      {
        title: "Refund & Exchange",
        body: "Once approved and received, your request is processed as per the case type.",
        items: ["Replacement is offered for damaged or incorrect items.", "Refunds are processed to the original payment method or store credit.", "Processing may take 5-7 business days after approval."],
      },
    ],
  },
  terms: {
    eyebrow: "Terms & Conditions",
    title: "Clear terms for shopping with Ayraj.",
    description:
      "These terms explain how orders, pricing, payments, content and customer responsibilities work on our website.",
    updated: "Last updated: June 2026",
    icon: Scale,
    heroTone: "from-brand-text via-accent to-primary-700",
    highlights: [
      { icon: FileCheck2, title: "Order Agreement", text: "Using the website means you agree to these shopping terms." },
      { icon: ShieldCheck, title: "Secure Payments", text: "Payments are handled through trusted checkout and payment partners." },
      { icon: AlertCircle, title: "Fair Usage", text: "Website content, offers and product information must be used responsibly." },
    ],
    sections: [
      {
        title: "Use of Website",
        body: "By accessing this website, you agree to use it only for lawful shopping and information purposes.",
        items: ["Do not misuse the website or attempt unauthorized access.", "Product content, photos and designs belong to Ayraj or its suppliers.", "We may update website features, prices or policies when required."],
      },
      {
        title: "Products, Pricing & Orders",
        body: "We try to keep product information accurate, but availability and prices may change.",
        items: ["Orders are confirmed only after payment or COD confirmation.", "We may cancel orders affected by stock, pricing or address issues.", "Colors and product appearance may vary slightly due to screen settings."],
      },
      {
        title: "Payments & Liability",
        body: "Customers are responsible for providing correct details during checkout.",
        items: ["Incorrect address or contact details may delay delivery.", "Payment failures or bank delays are handled by the payment provider.", "Our liability is limited to the value of the purchased product."],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy Policy",
    title: "Your information stays protected and used with care.",
    description:
      "We collect only the information needed to process orders, provide support and improve your shopping experience.",
    updated: "Last updated: June 2026",
    icon: LockKeyhole,
    heroTone: "from-brand-text via-accent to-primary-700",
    highlights: [
      { icon: LockKeyhole, title: "Protected Data", text: "Customer information is handled with practical security measures." },
      { icon: Truck, title: "Used for Orders", text: "Details are shared only where needed for delivery, payment and support." },
      { icon: HelpCircle, title: "Support Access", text: "You can contact us for privacy or account-related questions." },
    ],
    sections: [
      {
        title: "Information We Collect",
        body: "We collect details required to complete your purchase and support requests.",
        items: ["Name, phone number, email and delivery address.", "Order, payment status and shipping information.", "Support messages, feedback and website interaction details."],
      },
      {
        title: "How We Use Information",
        body: "Your data helps us deliver orders and provide a smoother customer experience.",
        items: ["To process orders, payments, invoices and deliveries.", "To send order updates, tracking information and support replies.", "To improve products, offers and website performance."],
      },
      {
        title: "Sharing & Security",
        body: "We do not sell customer data. Information is shared only with trusted service providers needed for operations.",
        items: ["Courier partners receive delivery details.", "Payment providers process transaction data securely.", "We use reasonable safeguards to protect customer information."],
      },
    ],
  },
};

function PolicyPage({ type }) {
  const content = policyContent[type];
  const Icon = content.icon;

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      <section className={`relative overflow-hidden bg-gradient-to-br ${content.heroTone} px-4 py-16 text-white sm:px-6 lg:px-8`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(212,175,55,0.32),transparent_28%),radial-gradient(circle_at_12%_80%,rgba(230,126,34,0.28),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-secondary-300/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary-200 backdrop-blur">
              <Icon size={16} />
              {content.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
              {content.description}
            </p>
            <p className="mt-5 text-sm font-semibold text-secondary-200">{content.updated}</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Need help?</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Our support team can help with order updates, returns, refunds and account questions.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <a href={`mailto:${support.email}`} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15">
                <Mail size={18} className="text-secondary-200" />
                {support.email}
              </a>
              <a href={`tel:${support.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white transition hover:bg-white/15">
                <ShieldCheck size={18} className="text-secondary-200" />
                {support.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {content.highlights.map(({ icon: HighlightIcon, title, text }) => (
            <article key={title} className="rounded-2xl border border-secondary-100 bg-white/70 p-5 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary-100 text-accent">
                <HighlightIcon size={21} />
              </span>
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-brand-text/70">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-secondary-100 bg-white/70 p-5 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">On this page</p>
            <nav className="mt-4 space-y-2">
              {content.sections.map((section) => (
                <a key={section.title} href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-text/72 transition hover:bg-secondary-50 hover:text-accent">
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-5">
            {content.sections.map((section) => (
              <article key={section.title} id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-28 rounded-2xl border border-secondary-100 bg-white/75 p-6 shadow-sm sm:p-7">
                <h2 className="text-2xl font-bold text-brand-text">{section.title}</h2>
                <p className="mt-3 leading-7 text-brand-text/72">{section.body}</p>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-brand-text/78">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-primary-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Still have a question?</h2>
              <p className="mt-2 text-sm leading-6 text-white/75">Send your order details to support and we will guide you with the next step.</p>
            </div>
            <Link to="/contact-us" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-6 text-sm font-bold text-brand-text transition hover:bg-secondary-300">
              Contact Support <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ShippingPolicy() {
  return <PolicyPage type="shipping" />;
}

export function ReturnRefundPolicy() {
  return <PolicyPage type="returnRefund" />;
}

export function TermsConditions() {
  return <PolicyPage type="terms" />;
}

export function PrivacyPolicy() {
  return <PolicyPage type="privacy" />;
}
