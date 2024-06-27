

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      {/* Footer */}
      <footer className="bg-primary text-white py-10">
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-2 flex-wrap">
            <h1 className="text-white text-4xl font-bold">ACME</h1>
            <p className="text-white text-lg">
              The best place to find the most amazing products
            </p>
          </div>
          <div className="flex justify-between w-full flex-wrap gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-lg font-semibold">
                  Quick Links
                </h2>
                <a href="#" className="text-white text-lg">
                  Home
                </a>
                <a href="#" className="text-white text-lg">
                  About
                </a>
                <a href="#" className="text-white text-lg">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-lg font-semibold">
                  Quick Links
                </h2>
                <a href="#" className="text-white text-lg">
                  Home
                </a>
                <a href="#" className="text-white text-lg">
                  About
                </a>
                <a href="#" className="text-white text-lg">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="company-info">
                  <h2 className="text-white text-lg font-semibold">Company</h2>
                  <p className="text-white text-lg contact">
                    <strong>Contact :</strong> +1 1234567890
                  </p>
                  <p className="text-white text-lg contact max-w-[250px]">
                    <strong>Address :</strong> 1234 street, Los Angeles, California, 90001
                  </p>
                  <p className="text-white text-lg">
                    <strong>Mail :</strong> info@acme.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-white">
        <p className="text-gray-900 font-semibold w-full text-center py-2">
          {currentYear} ACME &copy;. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;