import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const publications = [
    {
        id: 1,
        category: "TECHNOLOGY",
        date: "MAY 24 2023",
        title: "How to Become a Graphic Designer in 10 Simple Steps",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ejus sequi commodi dignissimos optio, beatae, eos necessitatibus nisi. Nam cupidita...",
        image: "https://miller.bslthemes.com/ashley-demo/img/blog/1.jpg"
    },
    {
        id: 2,
        category: "TECHNOLOGY",
        date: "MAY 24 2023",
        title: "16 Best Graphic Design for Online and Offline Courses",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ejus sequi commodi dignissimos optio, beatae, eos necessitatibus nisi. Nam cupidita...",
        image: "https://miller.bslthemes.com/ashley-demo/img/blog/2.jpg"
    }
];

const Blog = () => {
    return (
        <section className="bg-white py-20 md:py-24 relative overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24">

                {/* Header Pattern */}
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-[30px] md:text-[42px] font-bold text-black tracking-tight">
                        Popular Publications:
                    </h2>

                    <Link to="/portfolio" className="group flex items-center gap-4 transition-all duration-500">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">View All</span>
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black transition-all duration-500">
                            <ArrowRight size={18} className="text-black group-hover:text-orange-500 transition-colors" />
                        </div>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                    {publications.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/11] overflow-hidden mb-8">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-6 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">{post.category}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">{post.date}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[20px] md:text-[24px] font-bold text-black leading-tight mb-2 transition-colors duration-500">
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-[14px] md:text-[15px] text-black/40 leading-relaxed font-light mb-8 max-w-xl">
                                {post.excerpt}
                            </p>

                            {/* Read More */}
                            <Link to="/portfolio" className="flex items-center gap-4 group/more">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Read More</span>
                                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover/more:bg-black transition-all duration-500">
                                    <ArrowRight size={16} className="text-black group-hover/more:text-orange-500 transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Blog;
