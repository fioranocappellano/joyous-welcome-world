
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-1">
            <a href="/" className="text-xl font-semibold tracking-tight mb-4 inline-block">
              Lumina
            </a>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Beautiful design that balances form and function in perfect harmony.
            </p>
          </div>
          
          {['Product', 'Company', 'Resources'].map((category, idx) => (
            <div key={idx} className="md:col-span-1">
              <h3 className="font-medium mb-4">{category}</h3>
              <ul className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category} Link {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Lumina. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {['Terms', 'Privacy', 'Cookies'].map((item, idx) => (
              <a 
                key={idx}
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
