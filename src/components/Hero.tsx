
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapesRef.current) return;
      
      const shapes = shapesRef.current.children;
      const x = e.clientX;
      const y = e.clientY;
      
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i] as HTMLElement;
        const factor = (i + 1) * 0.05;
        
        // Apply a slight parallax effect
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      }
    };

    // Add intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Add mousemove listener
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen w-full flex items-center justify-center pt-16 px-6 overflow-hidden stagger-appear"
    >
      {/* Abstract Shapes */}
      <div 
        ref={shapesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-teal-100/20 blur-2xl"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 z-10">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary mb-6">
            <span className="text-xs font-medium">Introducing Lumina</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary ml-2"></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance mb-6">
            Design that inspires. <br />
            <span className="text-primary">Simplicity</span> that performs.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Discover the perfect balance of form and function. Crafted with precision, 
            designed for the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-98">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-input bg-background/50 font-medium transition-all hover:bg-secondary active:scale-98">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -rotate-3 scale-105"></div>
            <div className="glass relative rounded-3xl overflow-hidden shadow-lg animate-float">
              <div className="aspect-[4/3] w-full bg-muted rounded-t-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <span className="text-6xl">✨</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-3 w-24 bg-muted rounded-full mb-4"></div>
                <div className="h-2 w-full bg-muted rounded-full mb-3"></div>
                <div className="h-2 w-4/5 bg-muted rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
