import Input from "../UI/Input.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";

export default function AuthEmail() {
  return (
    <section>
      <h1 className="text-3xl">輸入你的電子郵件即可註冊或登入。</h1>
      <span className="text-gray-600 my-3 inline-block">台灣</span>
      <div className="my-6">
        <Input
          className="accountInput"
          type="email"
          id="email"
          placeholder="電子郵件*"
        />
      </div>
      <p className="text-gray mt-10">
        繼續即代表我同意 SH SELECT 的{" "}
        <span className="underline">隱私權政策</span>與
        <span className="underline">使用條款</span>。
      </p>
      <div className="my-9 flex justify-end">
        <FeatureButton
          link="register"
          bgColor="accountBlack"
          paddingStyle="py-3"
        >
          繼續
        </FeatureButton>
      </div>
    </section>
  );
}
