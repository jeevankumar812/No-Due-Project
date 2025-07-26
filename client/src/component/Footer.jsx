import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            No Due Management System
          </h3>
          <p className="text-gray-400 text-sm">
            A paperless way to handle No Due approvals. Built for colleges to
            save time and improve efficiency.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">📍 Alva's Engineering College</p>
          <p className="text-sm">📧 support@college.com</p>
          <p className="text-sm">📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} No Due Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
