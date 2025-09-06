export default function SiteFooter() {
  return (
    <footer className="w-full border-t">
      <div className="container py-6 text-sm text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>© {new Date().getFullYear()} 점자 학습</span>
        <span className="whitespace-nowrap">만든이: <a href="mailto:devbyeon@gmail.com">devbyeon@gmail.com</a></span>
        <span className="whitespace-nowrap">문의: <a href="mailto:devbyeon@gmail.com">devbyeon@gmail.com</a></span>
      </div>
    </footer>
  );
}


