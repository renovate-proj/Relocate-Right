import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1A56DB] to-[#7E3AF2] rounded-lg flex items-center justify-center transform rotate-45">
                <div className="transform -rotate-45 text-white font-bold text-lg">R</div>
              </div>
              <span className="text-2xl font-bold">RelocateRight</span>
            </div>
            <p className="text-slate-400 max-w-md">
              Making relocation decisions smarter, faster, and more informed with comprehensive neighborhood data and analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Explore', 'Areas', 'Methodology'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
            <div className="space-y-2">
              {['Blog', 'FAQ', 'Contact', 'Privacy Policy'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex justify-center gap-20 flex-wrap">
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
