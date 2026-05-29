import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { label: "Home", to: "/" },
  // {
  //   label: 'Services',
  //   to: '#',
  //   hasDropdown: true,
  //   dropdown: [
  //     { label: 'Holiday Packages', to: '/destinations' },
  //     { label: 'Flight Bookings', to: '/booking' },
  //     { label: 'Travel Insurance', to: '/contact' },
  //   ],
  // },
  { label: "About Us", to: "/about" },
  { label: "Domestic", to: "/destinations/domestic" },
  { label: "International", to: "/destinations/international" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(container.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".nav-link", {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <header ref={container} className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full" style={{ paddingLeft: '20px', paddingRight: '24px' }}>
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/images/logo/trinetralogo.png"
              alt="Trinetra"
              className="h-24 w-auto object-contain select-none"
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 ml-auto mr-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative nav-link"
                onMouseEnter={() =>
                  link.hasDropdown && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive && link.to !== "#"
                        ? "text-gold border-b-2 border-gold pb-0.5"
                        : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </NavLink>

                {/* Dropdown */}
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          {/* <Link
            to="/booking"
            className="nav-link hidden md:inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors shrink-0"
          >
            Plan My Trip
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link> */}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
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
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <NavLink
                  to={link.to === "#" ? "/" : link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
                {link.hasDropdown &&
                  link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block px-6 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 hover:text-primary"
                    >
                      — {item.label}
                    </Link>
                  ))}
              </div>
            ))}
            {/* <Link
              to="/booking"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 text-center bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Plan My Trip
            </Link> */}
          </div>
        )}
      </div>
    </header>
  );
}
