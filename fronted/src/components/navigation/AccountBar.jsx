export default function AccountBar() {
  return (
    <div className="flex justify-between text-xs bg-gray-100 px-12 py-2">
      <div>SH-Select</div>
      <nav>
        <ul className="flex justify-end">
          <li className="border-solid border-r-1 border-black px-3">協助</li>
          <li className="border-solid border-r-1 border-black px-3">加入</li>
          <li className="pl-3">登入</li>
        </ul>
      </nav>
    </div>
  );
}
