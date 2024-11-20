export default function AccountBar() {
  return (
    <>
      <div className="flex justify-between mx-12 my-2 text-xs">
        <div>SH-Select</div>
        <div>
          <nav>
            <ul className="flex justify-end">
              <li className="border-solid border-r-1 border-black px-3">
                協助
              </li>
              <li className="border-solid border-r-1 border-black px-3">
                加入
              </li>
              <li className="px-3">登入</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
