export default function MemberHeader() {
  return (
    <div className="w-full mt-10">
      <div className="w-full border-b-[1px] border-gray-300 pb-3 flex items-center justify-between">
        <h2 className="font-500 flex-1 text-2xl">訂單</h2>

        <nav>
          <ul className="flex flex-1 gap-8">
            <li>個人檔案</li>
            <li>訂單</li>
            <li>最愛</li>
            <li>設定</li>
          </ul>
        </nav>

        <div className="flex-1"></div>
      </div>
    </div>
  );
}
