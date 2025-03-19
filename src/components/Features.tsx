
import React, { useRef, useEffect } from 'react';
import { Check, Zap, Monitor, Layout, Sparkles, Layers } from 'lucide-react';

const features = [
  {
    icon: <Monitor className="w-5 h-5" />,
    title: 'Responsive Design',
    description: 'Meticulously crafted to function flawlessly across all devices and screen sizes.'
  },
  {
    icon: <Layout className="w-5 h-5" />,
    title: 'Intuitive Interface',
    description: 'Every interaction has been thoughtfully considered for maximum efficiency and clarity.'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures a smooth experience without sacrificing quality.'
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Stunning Details',
    description: 'Refined animations and transitions that delight without overwhelming.'
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Modular System',
    description: 'Flexible components designed to adapt and evolve with your needs.'
  },
  {
    icon: <Check className="w-5 h-5" />,
    title: 'Thoughtful Defaults',
    description: 'Smart presets that anticipate your needs while allowing for customization.'
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
      // Observe each feature card for staggered animation
      const cards = sectionRef.current.querySelectorAll('.feature-card');
      cards.forEach(card => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 px-6 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 appear">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-white mb-4">
            <span className="text-xs font-medium">Core Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Designed with purpose
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every detail has been carefully considered to create an experience that's both beautiful and functional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card appear bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
