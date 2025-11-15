const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">AV</span>
              </div>
              <h3 className="text-xl font-bold text-white">Annapurna Veneer</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Leading supplier of premium quality plywood and veneer products. 
              We provide the finest wood solutions for construction, furniture, and industrial applications.
            </p>
            <div className="text-gray-300">
              <p className="mb-2">📍 Premium Wood Industrial Area</p>
              <p className="mb-2">📞 +91 98765 43210</p>
              <p className="mb-2">✉️ info@annapurnaveneer.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Our Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Marine Plywood</li>
              <li>Commercial Plywood</li>
              <li>Decorative Veneer</li>
              <li>Block Boards</li>
              <li>MDF & HDF</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Bulk Supply</li>
              <li>Custom Cutting</li>
              <li>Quality Testing</li>
              <li>Delivery Service</li>
              <li>Technical Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Annapurna Veneer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for quality wood solutions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;