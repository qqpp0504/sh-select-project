import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import FeatureButton from "../UI/FeatureButton.jsx";
import ShowPasswordButton from "./ShowPasswordButton.jsx";
import { useInput } from "../hooks/useInput.js";
import { isNotEmpty } from "../../util/validation.js";

export default function LoginForm() {
  const { email } = useSelector((state) => state.account);
  const authPasswordInput = useInput("", (value) => isNotEmpty(value));

  return (
    <section>
      <form>
        <h1 className="text-3xl">請輸入密碼。</h1>
        <p className="text-gray-600 my-3 inline-block">
          {email}{" "}
          <Link to=".." className="text-gray underline">
            編輯
          </Link>
        </p>

        <div className="my-6 relative">
          <ShowPasswordButton authPasswordInput={authPasswordInput} />
        </div>

        <div className="my-9 flex justify-end">
          <FeatureButton
            type="button"
            bgColor="accountBlack"
            paddingStyle="py-3 px-6"
          >
            登入
          </FeatureButton>
        </div>
      </form>
    </section>
  );
}
