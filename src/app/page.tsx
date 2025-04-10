"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LabelButton from "@/components/ui/LabelButton";
import { useState } from "react";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [testimonialPage, setTestimonialPage] = useState(0);

  const testimonials = [
    {
      text: "Custom challenges with friends are so much fun! It's the best way to learn and compete in a friendly way.",
      name: "Emily T.",
      role: "Coding Enthusiast",
      image: "/emily.svg",
    },
    {
      text: "Code Clash transformed my coding practice. The challenges are engaging and push my limits!",
      name: "David M.",
      role: "Junior Developer",
      image: "/david.svg",
    },
    {
      text: "The instant feedback after each battle helped me understand my mistakes and grow as a programmer.",
      name: "Nina G.",
      role: "Machine Learning Intern",
      image: "/nina.svg",
    },
  ];

  const nextTestimonials = () => {
    setTestimonialPage((prev) => (prev + 1) % 2);
  };

  const previousTestimonials = () => {
    setTestimonialPage((prev) => (prev - 1 + 2) % 2);
  };

  return (
    <div className="bg-[#10141D] min-h-screen">
      {/* Fixed navbar with higher z-index and proper overflow handling */}
      <nav className="bg-[#292C33] fixed top-0 left-0 right-0 z-50 w-full h-16 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 flex items-center justify-between shadow-md">
        {/* Remove the w-screen class */}
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="logo"
              width={160}
              height={40}
              className="p-2"
              priority
            />
          </div>
          <button
            className="md:hidden text-white hover:text-gray-300 transition-colors "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <ul className="hidden md:flex items-center gap-4 lg:gap-8 font-[600]">
            <li>
              <button className="text-white hover:text-gray-300 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors">
                Features
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors">
                About
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors">
                Contact
              </button>
            </li>
            <li>
              <LabelButton
                variant="filled"
                customSize={{ width: "56px", height: "30px" }}
                className="text-sm whitespace-nowrap"
                onClick={() => router.push("/login")}
              >
                Join Us
              </LabelButton>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu with higher z-index but below the navbar */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 w-screen bg-[#1A1D24] p-4 z-40 shadow-lg">
          <ul className="flex flex-col gap-4">
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Home
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Features
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                About
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Contact
              </button>
            </li>
            <li className="px-4">
              <LabelButton
                variant="filled"
                customSize={{ width: "100%", height: "32px" }}
                onClick={() => router.push("/login")}
              >
                Join Us
              </LabelButton>
            </li>
          </ul>
        </div>
      )}

      {/* Top padding to account for fixed navbar */}
      <div className="pt-16"></div>

      <section className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-20 py-20 gap-8">
        <div className="flex-1">
          <p className="text-base sm:text-lg mb-4 text-[#db83d8] font-semibold leading-9">
            With CodeClash
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6">
            Conquer Every Challenge
          </h1>
          <p className="w-full sm:w-[450px] md:w-[550px] lg:w-[630px] mb-8 text-lg sm:text-xl md:text-2xl font-medium text-white leading-7 sm:leading-9">
            The ultimate platform for coding enthusiasts to learn, compete, and
            grow.
          </p>
          <LabelButton
            variant="filled"
            customSize={{
              width: "200px",
              height: "48px",
            }}
            className="w-full sm:w-[200px]"
            onClick={() => router.push("/get-started")}
          >
            Get Started
          </LabelButton>
        </div>

        <div className="flex-1 relative hidden md:block">
          <div className="w-full max-w-xl">
            <Image
              src="/illustration1.svg"
              alt="Developer working"
              width={600}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-20">
        <h2 className="text-white font-[600] text-2xl sm:text-3xl mb-8 sm:mb-16 text-center">
          Why Choose Us?
        </h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-4 sm:p-8 w-full lg:w-[522px] h-auto sm:h-[512px] bg-[#0000ff]/0 backdrop-blur-[206.80px] relative overflow-hidden">
              <Image
                src="/gradient.png"
                alt="Gradient Background"
                fill
                className="object-cover opacity-70"
                priority
              />
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 w-full sm:w-[211px] text-center leading-7">
                  Coding Challenges
                </h3>
                <p className="mb-4 sm:mb-8 w-full sm:w-[404px] text-white text-base sm:text-lg font-medium leading-6 sm:leading-7">
                  Solve challenges tailored for all skill levels, from beginner
                  to advanced.
                </p>
                <div className="w-full flex justify-center items-start relative">
                  <Image
                    src="/box1.svg"
                    alt="Coding Challenges"
                    width={360}
                    height={360}
                    className="w-[200px] sm:w-[360px] h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1E1B2E] rounded-2xl p-4 sm:p-8 w-full lg:w-[522px] h-auto sm:h-80 bg-[#0000ff]/0 backdrop-blur-[206.80px] relative overflow-hidden">
              <Image
                src="/gradient2.png"
                alt="Gradient Background"
                fill
                className="object-cover opacity-50"
                priority
              />
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 w-full sm:w-[211px] text-center sm:text-left">
                  Community
                </h3>
                <p className="mb-4 sm:mb-8 w-full sm:w-[404px] text-white text-base sm:text-lg font-medium leading-6 sm:leading-7">
                  Join a thriving community of passionate programmers.
                </p>
                <div className="w-full h-[150px] sm:h-[200px] flex justify-center items-center relative sm:bottom-12">
                  <Image
                    src="/box3.svg"
                    alt="Community"
                    width={260}
                    height={260}
                    className="w-[180px] sm:w-[260px] h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#1E1B2E] rounded-2xl p-4 sm:p-8 w-full lg:w-[522px] h-auto sm:h-80 bg-[#0000ff]/0 backdrop-blur-[206.80px] relative overflow-hidden">
              <Image
                src="/gradient1.png"
                alt="Gradient Background"
                fill
                className="object-cover opacity-10"
                priority
              />
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 w-full sm:w-[211px] text-center sm:text-left">
                  Tutorials
                </h3>
                <p className="mb-4 sm:mb-8 w-full sm:w-[404px] text-white text-base sm:text-lg font-medium leading-6 sm:leading-7">
                  Master concepts with interactive tutorials and expert-guided
                  paths.
                </p>
                <div className="w-full h-[150px] sm:h-[200px] flex justify-center items-center relative sm:bottom-12">
                  <Image
                    src="/box2.svg"
                    alt="Tutorials"
                    width={250}
                    height={250}
                    className="w-[180px] sm:w-[250px] h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-4 sm:p-8 w-full lg:w-[522px] h-auto sm:h-[512px] bg-[#0000ff]/0 backdrop-blur-[206.80px] relative overflow-hidden">
              <Image
                src="/gradient3.png"
                alt="Gradient Background"
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 w-full sm:w-[211px] text-center sm:text-left">
                  Leaderboards
                </h3>
                <p className="mb-4 sm:mb-8 w-full sm:w-[404px] text-white text-base sm:text-lg font-medium leading-6 sm:leading-7">
                  Climb the ranks as you compete with coders worldwide.
                </p>
                <div className="w-full h-[150px] sm:h-[200px] flex justify-center items-center relative top-12 sm:bottom-12">
                  <Image
                    src="/box4.svg"
                    alt="Leaderboards"
                    width={360}
                    height={360}
                    className="w-[180px] sm:w-[360px] h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-20 py-20">
        <h2 className="text-white font-[600] text-3xl mb-16 text-center">
          What Coders Say About Code Clash
        </h2>
        <div className="relative w-full">
          <button
            onClick={previousTestimonials}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous testimonials"
            disabled={testimonialPage === 0}
          >
            {/* Remove sm:-translate-x-12 */}
          </button>

          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full transition-transform duration-300"
              style={{
                transform: `translateX(-${testimonialPage * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#1A1D24] rounded-lg p-8 hover:bg-[#212631] transition-colors flex flex-col items-center text-center relative"
                >
                  <Image
                    height={32}
                    width={152}
                    src="/quote.svg"
                    alt="Quote icon"
                    className="absolute top-0 left-0"
                  />
                  <p className="text-gray-300 z-10 text-lg mb-6 font-[600]">
                    {testimonial.text}
                  </p>
                  <div className="w-20 h-20 relative mb-6 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextTestimonials}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next testimonials"
            disabled={testimonialPage === 1}
          >
            {/* Remove translate-x-12 */}
          </button>
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setTestimonialPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === testimonialPage ? "bg-[#DB84D9]" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-20 py-10 md:py-20">
        <div className="w-full relative rounded-lg overflow-hidden">
          <Image
            src="/foot.svg"
            alt="Gradient Background"
            width={1060}
            height={234}
            className="w-full h-full absolute top-0 left-0 object-cover opacity-90"
            priority
          />
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative z-10">
            <div className="flex-1 w-full md:w-auto mb-8 md:mb-0 relative top-8">
              <Image
                height={300}
                width={400}
                src="/coding1.svg"
                alt={"Coding illustration"}
                className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] mx-auto"
              />
            </div>

            <div className="flex flex-col justify-center items-center flex-1 z-10 text-center px-4 mb-8 md:mb-0">
              <h2 className="text-white font-[600] text-2xl md:text-3xl lg:text-4xl mb-4">
                Ready to Code Clash?
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-[300px]">
                Unleash Your Inner Coder! Join the Battle Today
              </p>
              <LabelButton
                variant="filled"
                customSize={{
                  width: "180px",
                  height: "44px",
                }}
                className="w-[180px] md:w-[200px]"
                onClick={() => router.push("/join-now")}
              >
                Join Now
              </LabelButton>
            </div>

            <div className="flex-1 relative md:left-32 w-full md:w-auto">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/coding2.svg"
                  alt="Ready to code"
                  width={250}
                  height={100}
                  className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] mx-auto md:mx-0 h-auto relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[#FFFFFF1A] p-4">
          <ul className="flex flex-col gap-4">
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Home
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Features
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                About
              </button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 transition-colors w-full text-left px-4">
                Contact
              </button>
            </li>
            <li className="px-4">
              <LabelButton
                variant="filled"
                customSize={{ width: '100%', height: '32px' }}
                onClick={() => router.push('/login')}
              >
                Join Us
              </LabelButton>
            </li>
          </ul>
        </div>
      )} */}

      <footer className="bg-[#10141D] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Code Clash</h2>
              <div className="flex space-x-4">
                <Link
                  href="https://twitter.com"
                  className="bg-[#551870] rounded-md p-2 hover:opacity-80 transition-opacity"
                >
                  <Twitter size={24} className="text-white" />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="bg-[#551870] rounded-md p-2 hover:opacity-80 transition-opacity"
                >
                  <Instagram size={24} className="text-white" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="bg-[#551870] rounded-md p-2 hover:opacity-80 transition-opacity"
                >
                  <Linkedin size={24} className="text-white" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6">Platform</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guidelines"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/faqs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-6">Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">
              © 2025 Code Clash. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
