
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Setup intersection observers for reveal animations
    const appearElements = document.querySelectorAll('.appear');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    appearElements.forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <main>
        <Hero />
        <Features />
        
        {/* Products Section */}
        <section id="products" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 appear">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary mb-4">
                <span className="text-xs font-medium">Our Products</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Crafted with precision
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our collection of meticulously designed products that combine elegance with functionality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 appear">
              {[1, 2].map((item) => (
                <div key={item} className="glass rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-[16/9] bg-muted"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Product {item}</h3>
                    <p className="text-muted-foreground mb-4">A beautiful description for this amazing product that will change how you work.</p>
                    <button className="text-sm font-medium text-primary hover:underline">Learn more</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-secondary/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 appear">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-white mb-4">
                <span className="text-xs font-medium">Pricing</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 appear">
              {['Basic', 'Pro', 'Enterprise'].map((plan, idx) => (
                <div 
                  key={plan} 
                  className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-md ${
                    idx === 1 
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm relative' 
                      : 'bg-white border-border'
                  }`}
                >
                  {idx === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full shadow-sm">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-3xl font-bold">${idx === 0 ? '0' : (idx === 1 ? '29' : '99')}</span>
                    <span className={`text-sm ${idx === 1 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      /month
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[...Array(4)].map((_, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          idx === 1 ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                        <span className={idx === 1 ? 'text-primary-foreground/90' : 'text-muted-foreground'}>
                          Feature {i + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-2 rounded-full font-medium transition-all hover:shadow-sm active:scale-95 ${
                      idx === 1 
                        ? 'bg-primary-foreground text-primary border border-primary/20' 
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 appear">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary mb-4">
                <span className="text-xs font-medium">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Our philosophy
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe that design should be both beautiful and functional, working in harmony to create experiences that inspire.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 appear">
              {['Simplicity', 'Quality', 'Purpose'].map((value, idx) => (
                <div key={value} className="text-center p-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                    <span className="text-xl font-semibold">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value}</h3>
                  <p className="text-muted-foreground">
                    {idx === 0 && "We embrace simplicity in everything we do, focusing on what truly matters."}
                    {idx === 1 && "Quality is non-negotiable. We attend to every detail with precision and care."}
                    {idx === 2 && "Every element serves a purpose, creating cohesive and intentional experiences."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
