import { TbError404 } from "react-icons/tb";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-2xl font-500 pt-24">
      <TbError404 size="5.5rem" />
      <p className="mb-1">我們找不到您要尋找的網頁。</p>
      <p>很抱歉造成您的不便。</p>
    </div>
  );
}
