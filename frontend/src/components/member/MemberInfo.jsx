import { useSelector } from "react-redux";
import { RiAccountPinCircleFill } from "react-icons/ri";

export default function MemberInfo() {
  const { userData } = useSelector((state) => state.account);
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <RiAccountPinCircleFill size="5rem" />
      <div className="text-3xl font-500">
        {`${userData.user.lastName} 
        ${userData.user.firstName}`}
      </div>
    </div>
  );
}
