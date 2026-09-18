// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { SITE_CONFIG } from "@/config/site";

// interface HomeBanner {
//   _id: string;
//   title: string;
//   image: string;
//   displayOrder: number;
//   published: boolean;
// }

// interface HomeHeroProps {
//   banners: HomeBanner[];
// }

// export default function HomeHero({ banners }: HomeHeroProps) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     if (banners.length <= 1) {
//       return;
//     }

//     const interval = window.setInterval(() => {
//       setActiveIndex((current) => (current + 1) % banners.length);
//     }, 6000);

//     return () => {
//       window.clearInterval(interval);
//     };
//   }, [banners.length]);

//   /*
//    * If there are no published banners in the database,
//    * show the default hero.
//    */
//   if (!banners || banners.length === 0) {
//     return (
//       <section className="relative isolate overflow-hidden bg-primary pb-1 pt-14 shadow-[0_18px_50px_rgba(0,0,0,0.42)] sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
//         <div className="pointer-events-none absolute inset-0 -z-20 bg-primary" />

//         <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_50%,rgba(0,0,0,0.38)_100%)]" />

//         <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />

//         <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-black/30 blur-3xl" />

//         <div className="container relative">
//           <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-black/20 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-9 lg:p-11">
//             <div className="home-hero-reveal home-hero-reveal-1 mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-accent">
//               <span className="h-[2px] w-10 bg-accent" />
//               Peace Zone Academy
//             </div>

//             <h1 className="home-hero-reveal home-hero-reveal-2 mt-5 max-w-2xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
//               A place to{" "}
//               <span className="text-accent">grow,</span> discover, and lead.
//             </h1>

//             <p className="home-hero-reveal home-hero-reveal-3 mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
//               At {SITE_CONFIG.name}, students build knowledge, confidence, and
//               purpose through NEB-affiliated +2 programmes in Science,
//               Management, and Law.
//             </p>

//             <div className="home-hero-reveal home-hero-reveal-4 mt-8 flex flex-col gap-3 sm:flex-row">
//               <Button
//                 asChild
//                 size="lg"
//                 className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-primary hover:shadow-xl"
//               >
//                 <Link href="/contact">
//                   Enquire about admissions
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </Button>

//               <Button
//                 asChild
//                 size="lg"
//                 variant="outline"
//                 className="group rounded-full border-white/40 bg-white/10 px-7 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-white/15 hover:text-white hover:shadow-lg"
//               >
//                 <Link href="/contact">
//                   Contact the academy
//                   <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>

//         <style jsx>{`
//           @keyframes home-hero-reveal {
//             from {
//               opacity: 0;
//               transform: translate3d(0, -24px, 0);
//             }

//             to {
//               opacity: 1;
//               transform: translate3d(0, 0, 0);
//             }
//           }

//           .home-hero-reveal {
//             animation: home-hero-reveal 0.75s
//               cubic-bezier(0.22, 1, 0.36, 1) both;
//           }

//           .home-hero-reveal-1 {
//             animation-delay: 0.1s;
//           }

//           .home-hero-reveal-2 {
//             animation-delay: 0.2s;
//           }

//           .home-hero-reveal-3 {
//             animation-delay: 0.3s;
//           }

//           .home-hero-reveal-4 {
//             animation-delay: 0.4s;
//           }
//         `}</style>
//       </section>
//     );
//   }

//   const activeBanner = banners[activeIndex];

//   return (
//     <section className="relative isolate overflow-hidden bg-primary pb-1 pt-14 shadow-[0_18px_50px_rgba(0,0,0,0.42)] sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
//       {/* =====================================================
//           DATABASE BANNER SLIDES
//       ====================================================== */}
//       <div className="pointer-events-none absolute -inset-[7%] -z-20 overflow-hidden">
//         {banners.map((banner, index) => (
//           <div
//             key={banner._id}
//             className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//               index === activeIndex
//                 ? "scale-100 opacity-100"
//                 : "scale-105 opacity-0"
//             }`}
//           >
//             <Image
//               src={banner.image}
//               alt={banner.title || "School banner"}
//               fill
//               priority={index === 0}
//               sizes="100vw"
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Dark overlay */}
//       <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_50%,rgba(0,0,0,0.38)_100%)]" />

//       {/* Bottom shadow */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />

//       {/* Decorative glow */}
//       <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-black/30 blur-3xl" />

//       <div className="container relative">
//         <div className="max-w-3xl rounded-[2rem] border border-white/20 bg-black/20 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-9 lg:p-11">
//           {/* Small heading */}
//           <div
//             key={`eyebrow-${activeBanner._id}`}
//             className="home-hero-reveal mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-accent"
//           >
//             <span className="h-[2px] w-10 bg-accent" />

//             Peace Zone Academy
//           </div>

//           {/* DATABASE TITLE */}
//           <h1
//             key={activeBanner._id}
//             className="home-hero-title mt-5 max-w-2xl font-[Arial,Helvetica,sans-serif] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
//           >
//             {activeBanner.title}
//           </h1>

//           {/* Existing description */}
//           <p className="home-hero-reveal mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
//             At {SITE_CONFIG.name}, students build knowledge, confidence, and
//             purpose through NEB-affiliated +2 programmes in Science,
//             Management, and Law.
//           </p>

//           {/* Buttons */}
//           <div className="home-hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
//             <Button
//               asChild
//               size="lg"
//               className="group rounded-full px-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-primary hover:shadow-xl"
//             >
//               <Link href="/contact">
//                 Enquire about admissions
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </Button>

//             <Button
//               asChild
//               size="lg"
//               variant="outline"
//               className="group rounded-full border-white/40 bg-white/10 px-7 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-white/15 hover:text-white hover:shadow-lg"
//             >
//               <Link href="/contact">
//                 Contact the academy
//                 <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* =====================================================
//             BANNER INDICATORS
//         ====================================================== */}
//         {banners.length > 1 && (
//           <div className="mt-8 flex items-center gap-2">
//             {banners.map((banner, index) => (
//               <button
//                 key={banner._id}
//                 type="button"
//                 aria-label={`Show banner ${index + 1}`}
//                 onClick={() => setActiveIndex(index)}
//                 className={`h-1.5 rounded-full transition-all duration-500 ${
//                   index === activeIndex
//                     ? "w-12 bg-accent"
//                     : "w-6 bg-white/40 hover:bg-white/70"
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* =====================================================
//             STREAM INFORMATION
//         ====================================================== */}
//         <div className="home-hero-reveal mt-8 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black/35 text-white shadow-[0_15px_40px_rgba(0,0,0,0.32)] backdrop-blur-md sm:grid-cols-4">
//           {[
//             ["NEB", "affiliated"],
//             ["Science", "+2 stream"],
//             ["Management", "+2 stream"],
//             ["Law", "+2 stream"],
//           ].map(([top, bottom], index) => (
//             <div
//               key={top}
//               className="group relative cursor-default px-4 py-4 text-center transition-all duration-300 hover:bg-white/10 sm:py-5"
//             >
//               <p className="font-serif text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
//                 {top}
//               </p>

//               <p className="mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-white">
//                 {bottom}
//               </p>

//               <span className="absolute inset-x-5 bottom-0 h-[2px] origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

//               {index < 3 && (
//                 <span className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-white/15 sm:block" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes home-hero-reveal {
//           from {
//             opacity: 0;
//             transform: translate3d(0, -24px, 0);
//           }

//           to {
//             opacity: 1;
//             transform: translate3d(0, 0, 0);
//           }
//         }

//         @keyframes home-hero-title {
//           from {
//             opacity: 0;
//             transform: translate3d(0, 20px, 0);
//           }

//           to {
//             opacity: 1;
//             transform: translate3d(0, 0, 0);
//           }
//         }

//         .home-hero-reveal {
//           animation: home-hero-reveal 0.75s
//             cubic-bezier(0.22, 1, 0.36, 1) both;
//         }

//         .home-hero-title {
//           animation: home-hero-title 0.8s
//             cubic-bezier(0.22, 1, 0.36, 1) both;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .home-hero-reveal,
//           .home-hero-title {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }