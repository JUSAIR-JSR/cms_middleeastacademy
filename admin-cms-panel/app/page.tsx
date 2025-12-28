"use client";

import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ExternalLink, Shield, Sparkles, Lock, BarChart3, FileEdit, Users, Globe, Zap, Cpu, Cloud } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animatedIcons = [
    { icon: Zap, color: "from-emerald-500 to-green-400" },
    { icon: Cpu, color: "from-teal-500 to-cyan-400" },
    { icon: Cloud, color: "from-green-500 to-emerald-400" },
    { icon: Globe, color: "from-lime-500 to-green-400" },
  ];

  const features = [
    { 
      icon: FileEdit, 
      title: "Course Management", 
      description: "Create and organize courses with AI assistance",
      color: "from-emerald-500 to-green-400"
    },
    { 
      icon: BarChart3, 
      title: "Real-time Analytics", 
      description: "Live data visualization and insights",
      color: "from-teal-500 to-cyan-400"
    },
    { 
      icon: Lock, 
      title: "Secure Authentication", 
      description: "Multi-factor and biometric security",
      color: "from-green-600 to-emerald-500"
    },
    { 
      icon: Users, 
      title: "User Management", 
      description: "Advanced role-based access control",
      color: "from-lime-600 to-green-500"
    },
  ];

 const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};


 const itemVariants: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconFloatVariants: Variants = {
  float: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};


  const shimmerVariants: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/30 to-green-200/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-cyan-200/10 rounded-full blur-3xl"
        />

        {/* Animated floating icons in background */}
        <AnimatePresence>
          {animatedIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${15 + (index * 20)}%`,
                top: `${20 + (Math.sin(index) * 30)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.1,
                scale: 1,
                y: [0, -50, 0],
                rotate: [0, 360],
              }}
              transition={{
                opacity: { delay: index * 0.5 },
                scale: { delay: index * 0.5 },
                y: {
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <item.icon className={`w-16 h-16 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, #059669 1px, transparent 1px),
                            linear-gradient(to bottom, #059669 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/10 to-transparent"
              animate={{ y: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Mouse follow glow */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-300/20 to-green-300/10 blur-2xl"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl text-center relative z-10"
      >
        {/* Premium badge with animation */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/50 shadow-lg shadow-emerald-100/50 text-emerald-800 font-semibold mb-12 group hover:shadow-emerald-200/70 transition-all duration-300"
        >
          <motion.div
            variants={iconFloatVariants}
            animate="float"
            className="relative"
          >
            <Shield className="w-5 h-5" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-emerald-400/30 rounded-full"
            />
          </motion.div>
          <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            Premium Admin Suite
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
          />
        </motion.div>

        {/* Main heading with enhanced animation */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="block text-emerald-950">Middle East</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Academy CMS
                </span>
                <motion.div
                  variants={iconFloatVariants}
                  animate="float"
                  className="absolute -top-6 -right-6"
                >
                  <Sparkles className="w-8 h-8 text-emerald-500" />
                </motion.div>
              </span>
            </motion.h1>
            
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mx-auto rounded-full mb-4"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-emerald-700/70 mt-6 font-light"
          >
            Enterprise Edition • v3.0
          </motion.p>
        </motion.div>

        {/* Description with animation */}
        <motion.div variants={itemVariants} className="relative mb-16">
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-emerald-800/80 max-w-3xl mx-auto leading-relaxed font-normal mb-8"
          >
            Advanced administration dashboard with{" "}
            <span className="font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AI-powered insights
            </span>
            , real-time analytics, and enterprise-grade security management.
          </motion.p>
          
          {/* Floating decorative elements */}
          <div className="flex justify-center gap-8 mt-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, delay: i * 0.3 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400"
              />
            ))}
          </div>
        </motion.div>

        {/* Animated features grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="relative group cursor-pointer"
            >
              {/* Hover effect background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/80 to-emerald-50/80 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                layoutId={`feature-bg-${index}`}
              />
              
              <div className="relative p-6 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-lg shadow-emerald-100/30 hover:shadow-emerald-200/50 transition-all duration-300 group-hover:border-emerald-300/50">
                {/* Animated icon */}
                <motion.div
                  animate={hoveredFeature === index ? { scale: 1.1, rotate: 5 } : {}}
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-5 shadow-md`}
                >
                  <motion.div
                    animate={hoveredFeature === index ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-emerald-700/70">
                  {feature.description}
                </p>
                
                {/* Animated indicator */}
                <motion.div
                  className="mt-4 h-1 w-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto"
                  animate={hoveredFeature === index ? { width: "100%" } : { width: "48px" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced action buttons with animations */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/admin/login")}
            className="group relative px-12 py-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-semibold shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/70 transition-all duration-300 overflow-hidden min-w-[240px]"
          >
            {/* Shimmer effect */}
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative flex items-center justify-center gap-3 text-lg">
              Access Admin Panel
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("https://middleeastacademy.in")}
            className="group px-12 py-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-emerald-200 text-emerald-800 font-semibold shadow-lg shadow-emerald-100/30 hover:shadow-emerald-200/50 hover:border-emerald-300 hover:text-emerald-900 transition-all duration-300 min-w-[240px]"
          >
            <span className="flex items-center justify-center gap-3 text-lg">
              Visit Main Website
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>

        {/* Animated security badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Lock, text: "SSL Encryption",bg: "bg-emerald-100", textColor: "text-emerald-600", },
            { icon: Shield, text: "RBAC Security", bg: "bg-emerald-100", textColor: "text-emerald-600", },
            { icon: Zap, text: "Real-time Sync", bg: "bg-emerald-100", textColor: "text-emerald-600",},
            { icon: Cloud, text: "Cloud Backup", bg: "bg-emerald-100", textColor: "text-emerald-600", },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                className={`p-2 rounded-lg bg-${item.textColor}-100`}
              >
                <item.icon className={`w-4 h-4 text-${item.textColor}-600`} />
              </motion.div>
              <span className={`text-sm font-medium text-${item.textColor}-800`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating CTA animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 text-sm text-emerald-600/70"
        >
          <span className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Secure • Scalable • Modern
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}