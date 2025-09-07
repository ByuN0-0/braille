export default function SiteFooter() {
  return (
    <footer className="w-full border-t">
      <div className="container py-6 text-sm text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>© {new Date().getFullYear()} Biyeon Hwang. All rights reserved.</span>
        <span className="whitespace-nowrap">만든이 및 문의의: <a href="mailto:devbyeon@gmail.com">devbyeon@gmail.com</a></span>
      </div>
    </footer>
  );
}


