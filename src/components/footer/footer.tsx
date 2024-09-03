export function Footer() {
    return (
      <footer className="bg-black text-white px-6 py-4 bottom-0 left-0 w-full">
        <div className="max-w flex flex-col space-y-1 sm:flex-row sm:justify-between">
          <div>
            <h4 className="mt-1 text-lg font-semibold">Ecommerce-site</h4>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} MyEcommerce. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="mt-0 text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:underline">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>Email: support@ecommerce.com</li>
              <li>Phone: 8900040000</li>
              <li>Address: 124, Delhi important street, India</li>
            </ul>
          </div>
          <div className="mt-2">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Facebook</a>
                <a href="#" className="hover:text-gray-400">Twitter</a>
                <a href="#" className="hover:text-gray-400">Instagram</a>
              </div>
            </div>
        </div>
      </footer>
    );
  }
  