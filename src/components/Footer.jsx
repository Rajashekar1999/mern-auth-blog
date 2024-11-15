import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MERN Blog App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
