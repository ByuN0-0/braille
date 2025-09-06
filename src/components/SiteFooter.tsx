export default function SiteFooter() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} 점자 학습 · 만든이: <a href="mailto:devbyeon@gmail.com" className="underline hover:no-underline">devbyeon@gmail.com</a> · 문의: <a href="mailto:devbyeon@gmail.com" className="underline hover:no-underline">devbyeon@gmail.com</a>
      </div>
    </footer>
  );
}


