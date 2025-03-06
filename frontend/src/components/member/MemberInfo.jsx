import { useSelector } from "react-redux";
import { RiAccountPinCircleFill } from "react-icons/ri";

import SEO from "../SEO.jsx";

export default function MemberInfo() {
  const { userData } = useSelector((state) => state.account);
  return (
    <>
      <SEO
        title="會員資料。SH SELECT"
        description="查看您的個人資料、編輯資訊，並管理帳戶設定。"
      />
      <div className="flex flex-col gap-3 justify-center items-center">
        <RiAccountPinCircleFill size="5rem" />
        <div className="text-3xl font-500">
          {`${userData.user.lastName} 
      ${userData.user.firstName}`}
        </div>
      </div>
    </>
  );
}
