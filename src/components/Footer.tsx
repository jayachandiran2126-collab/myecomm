import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/80 backdrop-blur text-secondary-foreground py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} AAHA Solutions. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;