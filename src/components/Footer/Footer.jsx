import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram, MapPin, Mail, Phone } from 'lucide-react';

const FOOTER_LINKS = [
    {
        title: 'Company',
        links: [
            { label: 'About Us',   to: '/portfolio' },
            { label: 'Our Team',   to: '/team' },
            { label: 'Careers',    to: '/careers' },
            { label: 'Newsroom',   to: '/press' },
        ],
    },
    {
        title: 'Services',
        links: [
            { label: 'Web Development',  to: '/services' },
            { label: 'Mobile Apps',      to: '/services' },
            { label: 'UI / UX Design',   to: '/services' },
            { label: 'Cloud Solutions',  to: '/services' },
        ],
    },
    {
        title: 'Work',
        links: [
            { label: 'About Us',     to: '/portfolio' },
            { label: 'Case Studies', to: '/projects' },
            { label: 'Our Clients',  to: '/our-clients' },
            { label: 'Testimonials', to: '/our-clients' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy',  to: '/contact' },
            { label: 'Terms of Service',to: '/contact' },
            { label: 'Cookie Policy',   to: '/contact' },
            { label: 'Compliance',      to: '/contact' },
        ],
    },
];

const SOCIALS = [
    { icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn' },
    { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter' },
    { icon: Github,    href: 'https://github.com',    label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer data-navtheme="dark" className="bg-[#0a0a0a] border-t border-white/[0.07]">

            {/* ── Main grid ── */}
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-12 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Brand column */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-12">

                        {/* Logo + tagline */}
                        <div>
                            <Link to="/" className="inline-block text-2xl tracking-tight text-white"
                                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                                System<span className="text-orange-500">Mindz</span>
                            </Link>
                            <p className="mt-2.5 text-[13px] leading-relaxed text-white/35 max-w-xs">
                                Engineering intelligent digital solutions for enterprises worldwide.
                                We build scalable, future-ready technology that drives measurable impact.
                            </p>
                        </div>

                        {/* Contact info */}
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2.5 text-[12px] text-white/30">
                                <MapPin size={12} className="text-orange-500/70 shrink-0" />
                                Whitefield, Bangalore, India
                            </li>
                            <li>
                                <a href="mailto:hello@systemmindz.com"
                                   className="flex items-center gap-2.5 text-[12px] text-white/30 hover:text-orange-400 transition-colors">
                                    <Mail size={12} className="text-orange-500/70 shrink-0" />
                                    hello@systemmindz.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917829730090"
                                   className="flex items-center gap-2.5 text-[12px] text-white/30 hover:text-orange-400 transition-colors">
                                    <Phone size={12} className="text-orange-500/70 shrink-0" />
                                    +91 78297 30090
                                </a>
                            </li>
                        </ul>

                        {/* Social icons */}
                        <div className="flex items-center gap-2">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                   className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/35 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-200">
                                    <Icon size={13} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {FOOTER_LINKS.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white mb-4">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link to={link.to}
                                                  className="text-[13px] text-white/45 hover:text-white transition-colors duration-150">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Legal bar ── */}
            <div className="border-t border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-white/20 tracking-wide">
                        © {year} SystemMindz Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((item) => (
                            <Link key={item} to="/contact"
                                  className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
