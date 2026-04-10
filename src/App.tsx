/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Droplets, 
  Leaf, 
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Check
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Argan Oil',
    category: 'Haircare & Skincare',
    price: 45,
    description: 'Pure, organic Moroccan Argan Oil. The "Liquid Gold" for your hair and skin.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop', // Placeholder for Argan Oil
    features: ['100% Organic', 'Cold-pressed', 'Nourishing', 'Repairing']
  },
  {
    id: '2',
    name: 'Moroccan Black Soap',
    category: 'Skincare',
    price: 35,
    description: 'Traditional Beldi soap with olive and eucalyptus for deep cleansing.',
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=1000&auto=format&fit=crop', // Placeholder for Black Soap
    features: ['Deep Cleansing', 'Exfoliating', 'Natural Ingredients']
  },
  {
    id: '3',
    name: 'Herbal Body Scrub',
    category: 'Body Care',
    price: 38,
    description: 'A blend of Rose and Moroccan herbs for silky smooth skin.',
    image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1000&auto=format&fit=crop', // Placeholder for Scrub
    features: ['Hydrating', 'Smoothing', 'Aromatic']
  },
  {
    id: '4',
    name: 'Eclat Amazigh',
    category: 'Skincare',
    price: 55,
    description: 'Radiance night mask inspired by ancient Amazigh beauty secrets.',
    image: 'https://images.unsplash.com/photo-1570172619384-210fa1de8bd8?q=80&w=1000&auto=format&fit=crop', // Placeholder for Mask
    features: ['Brightening', 'Anti-aging', 'Overnight Repair']
  },
  {
    id: '5',
    name: 'Moroccan Ghassoul',
    category: 'Skincare & Haircare',
    price: 32,
    description: 'Natural mineral clay from the Atlas Mountains for purifying skin and hair.',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop', // Placeholder for Ghassoul
    features: ['Purifying', 'Mineral-rich', 'Detoxifying']
  },
  {
    id: '6',
    name: 'Prickly Pear Oil',
    category: 'Skincare',
    price: 85,
    description: 'The ultimate luxury oil for intense hydration and skin rejuvenation.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop', // Placeholder for Prickly Pear
    features: ['Intense Hydration', 'Vitamin E Rich', 'Luxury Care']
  }
];

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-hidden border-2 border-black shadow-lg">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-black" />
        <div className="w-1/2 h-full bg-brand-gold" />
      </div>
      <span className="relative text-white mix-blend-difference font-serif font-bold text-xl tracking-tighter">AB</span>
    </div>
    <span className="text-brand-dark font-serif font-bold text-xl tracking-widest hidden sm:block">ARGAN BOUTIQUE</span>
  </div>
);

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-brand-ochre/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-brand-dark/80 hover:text-brand-dark font-medium text-sm uppercase tracking-widest transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6 text-brand-dark" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-black text-brand-gold text-[10px] flex items-center justify-center rounded-full">0</span>
          </button>
          <button 
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-ochre border-t border-black/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-brand-dark font-serif text-2xl"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2000&auto=format&fit=crop" 
        alt="Moroccan Landscape" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-ochre/20 via-transparent to-brand-ochre" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 bg-black text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-6 rounded-full">
          Natural Beauty from Morocco
        </span>
        <h1 className="text-5xl md:text-8xl font-serif text-brand-dark mb-6 leading-tight">
          Unleash your <span className="italic">natural beauty</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Luxury skincare, haircare, and body care products, made with natural ingredients from Morocco, designed to nourish your skin and repair damaged hair.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products"
            className="px-8 py-4 bg-black text-brand-gold rounded-full font-bold tracking-widest hover:scale-105 transition-transform flex items-center gap-2 group"
          >
            SHOP THE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#about-us"
            className="px-8 py-4 border border-black/20 text-brand-dark rounded-full font-bold tracking-widest hover:bg-black/5 transition-colors"
          >
            OUR STORY
          </a>
        </div>
      </motion.div>
    </div>

    {/* Floating Elements */}
    <motion.div 
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 left-10 hidden lg:block"
    >
      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
        <Droplets className="w-8 h-8 text-brand-gold mb-2" />
        <p className="text-[10px] font-bold tracking-widest uppercase">Pure Hydration</p>
      </div>
    </motion.div>
  </section>
);

const AboutUs = () => (
  <section id="about-us" className="py-24 px-6 bg-brand-cream">
    <div className="max-w-7xl mx-auto grid md:grid-template-columns: 1fr 1fr; gap-16 items-center">
      <div className="relative">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop" 
            alt="Moroccan Tradition" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-ochre rounded-3xl -z-10 hidden lg:block" />
      </div>

      <div>
        <div className="flex items-center gap-2 text-brand-ochre mb-4">
          <Leaf className="w-5 h-5" />
          <span className="text-sm font-bold tracking-widest uppercase">About Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8">
          Inspired by the rich traditions of Moroccan beauty
        </h2>
        <p className="text-lg text-brand-dark/70 mb-6 leading-relaxed">
          Our brand is inspired by the rich traditions of Moroccan beauty. We offer high-quality cosmetics made with natural ingredients sourced directly from nature.
        </p>
        <p className="text-lg text-brand-dark/70 mb-10 leading-relaxed">
          Each product is carefully crafted to strengthen skin, repair damaged hair, and provide deep hydration. We believe in simple yet effective beauty, using the power of nature to help you look and feel your best.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Sparkles, title: "Natural Ingredients", desc: "Sourced from Morocco" },
            { icon: Star, title: "Luxury Care", desc: "Premium formulas" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <item.icon className="w-6 h-6 text-brand-ochre" />
              <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
              <p className="text-xs text-brand-dark/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product, onBuy }: { product: Product, onBuy: (p: Product) => void, key?: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-black/5"
  >
    <div className="relative aspect-square overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => onBuy(product)}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-brand-gold transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-brand-gold text-[10px] font-bold tracking-widest uppercase rounded-full">
          {product.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif text-brand-dark">{product.name}</h3>
        <span className="text-lg font-bold text-brand-ochre">${product.price}</span>
      </div>
      <p className="text-sm text-brand-dark/60 mb-6 line-clamp-2">
        {product.description}
      </p>
      <button 
        onClick={() => onBuy(product)}
        className="w-full py-3 border border-black text-black rounded-full text-xs font-bold tracking-widest hover:bg-black hover:text-brand-gold transition-all"
      >
        BUY NOW
      </button>
    </div>
  </motion.div>
);

const Products = ({ onBuy }: { onBuy: (p: Product) => void }) => (
  <section id="products" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-2 text-brand-ochre mb-4">
          <Droplets className="w-5 h-5" />
          <span className="text-sm font-bold tracking-widest uppercase">Our Collection</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">
          Pure ingredients, <span className="italic">real results</span>
        </h2>
        <p className="text-brand-dark/60 max-w-2xl mx-auto">
          Discover our range of luxury skincare, haircare, and body care products, designed to nourish your skin and repair damaged hair.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={onBuy} />
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="py-24 px-6 bg-black text-brand-gold overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">
            Why Choose <span className="italic">Argan Boutique?</span>
          </h2>
          <div className="space-y-8">
            {[
              "Made with natural ingredients",
              "Inspired by Moroccan beauty traditions",
              "Helps repair damaged hair",
              "Strengthens and nourishes skin",
              "Gentle and effective care"
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 rounded-full border border-brand-gold flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-lg font-light tracking-wide">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square rounded-full border border-brand-gold/20 p-8 animate-spin-slow">
            <div className="w-full h-full rounded-full border border-brand-gold/40 p-8">
              <div className="w-full h-full rounded-full border border-brand-gold flex items-center justify-center">
                <Logo />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-serif italic mb-2">100%</p>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Natural</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-brand-ochre pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Logo />
          <p className="text-brand-dark/70 text-sm leading-relaxed">
            Unleash your natural beauty with luxury Moroccan products designed to nourish and repair.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-brand-gold transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-brand-dark/70">
            <li><a href="#" className="hover:text-brand-dark">Skincare</a></li>
            <li><a href="#" className="hover:text-brand-dark">Haircare</a></li>
            <li><a href="#" className="hover:text-brand-dark">Body Care</a></li>
            <li><a href="#" className="hover:text-brand-dark">Hand & Foot Care</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-brand-dark/70">
            <li><a href="#" className="hover:text-brand-dark">About Us</a></li>
            <li><a href="#" className="hover:text-brand-dark">Sustainability</a></li>
            <li><a href="#" className="hover:text-brand-dark">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-dark">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-6">Newsletter</h4>
          <p className="text-sm text-brand-dark/70 mb-4">Subscribe to receive updates and exclusive offers.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/50 border border-black/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black w-full"
            />
            <button className="bg-black text-brand-gold p-2 rounded-full hover:scale-105 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-black/10 text-center text-[10px] font-bold tracking-widest uppercase text-brand-dark/40">
        © 2026 Argan Boutique. All rights reserved.
      </div>
    </div>
  </footer>
);

const BuyModal = ({ product, onClose }: { product: Product, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center px-6"
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative bg-brand-cream w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-ochre mb-2">{product.category}</span>
        <h3 className="text-3xl font-serif mb-4">{product.name}</h3>
        <p className="text-sm text-brand-dark/70 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="space-y-3 mb-8">
          {product.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <Check className="w-3 h-3 text-brand-ochre" />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-bold">${product.price}</span>
          <div className="flex items-center gap-4 bg-black/5 rounded-full px-4 py-2">
            <button className="text-xl font-bold">-</button>
            <span className="font-bold">1</span>
            <button className="text-xl font-bold">+</button>
          </div>
        </div>

        <button className="w-full py-4 bg-black text-brand-gold rounded-full font-bold tracking-widest hover:scale-[1.02] transition-transform">
          ADD TO BAG
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-black">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <AboutUs />
        <Products onBuy={setSelectedProduct} />
        <WhyChooseUs />
        
        {/* Slogans Section */}
        <section className="py-12 bg-brand-gold text-black overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[
              "Natural beauty from Morocco",
              "Repair, nourish, and shine",
              "Strength for your hair, care for your skin",
              "Pure ingredients, real results"
            ].map((slogan, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <span className="text-2xl font-serif italic">{slogan}</span>
                <Sparkles className="w-6 h-6" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "Natural beauty from Morocco",
              "Repair, nourish, and shine",
              "Strength for your hair, care for your skin",
              "Pure ingredients, real results"
            ].map((slogan, i) => (
              <div key={i + 10} className="flex items-center gap-8 mx-8">
                <span className="text-2xl font-serif italic">{slogan}</span>
                <Sparkles className="w-6 h-6" />
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Discover the power of natural beauty.</h2>
            <p className="text-xl text-brand-dark/70 mb-10">Shop now and give your skin and hair the care they deserve.</p>
            <a 
              href="#products"
              className="inline-block px-12 py-5 bg-black text-brand-gold rounded-full font-bold tracking-[0.2em] hover:scale-105 transition-transform"
            >
              EXPLORE PRODUCTS
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProduct && (
          <BuyModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar (Simplified) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[110]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl p-10"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-serif">Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex flex-col items-center justify-center h-[60%] text-center">
                <ShoppingBag className="w-16 h-16 text-brand-dark/20 mb-6" />
                <p className="text-brand-dark/60 italic">Your bag is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-8 px-8 py-3 bg-black text-brand-gold rounded-full font-bold tracking-widest text-xs"
                >
                  START SHOPPING
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
