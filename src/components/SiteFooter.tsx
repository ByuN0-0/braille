export default function SiteFooter() {
  return (
    <footer className="w-full border-t">
      <div className="container py-6 text-sm text-gray-600 flex flex-col md:flex-row md:items-start md:justify-between gap-y-2">
        {/* 왼쪽: 세로 정렬 */}
        <div className="flex flex-col gap-y-1">
          <div>© {new Date().getFullYear()} Biyeon Hwang. All rights reserved.</div>
          <div>Directed by Kyunga Choi</div>
        </div>

        {/* 오른쪽 */}
        <div>
          Contact:&nbsp;
          <a
            href="mailto:devbyeon@gmail.com"
            className="underline hover:text-gray-800"
          >
            devbyeon@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
