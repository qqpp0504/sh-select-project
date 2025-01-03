import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import FeatureButton from "../UI/FeatureButton.jsx";
import ShowPasswordButton from "./ShowPasswordButton.jsx";
import { useInput } from "../hooks/useInput.js";
import { isNotEmpty } from "../../util/validation.js";
import { loginUser } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import AuthErrorBlock from "./AuthErrorBlock.jsx";
import { accountActions } from "../../store/account-slice.js";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.account);
  const authPasswordInput = useInput("", (value) => isNotEmpty(value));

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(accountActions.login({ token: data.token, user: data.user }));
      navigate("/");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = { ...Object.fromEntries(fd.entries()), email: email };

    if (formData.password === "" || authPasswordInput.hasError) {
      authPasswordInput.handleInputBlur();
      return;
    }

    mutate(formData);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl">請輸入密碼。</h1>
        <p className="text-gray-600 my-3 inline-block">
          {email}{" "}
          <Link to=".." className="text-gray underline">
            編輯
          </Link>
        </p>

        {isError && (
          <AuthErrorBlock message={error.info?.message || "你的驗證資訊無效"} />
        )}

        <div className="my-6 relative">
          <ShowPasswordButton authPasswordInput={authPasswordInput} />
        </div>

        <div className="my-9 flex justify-end">
          <FeatureButton
            type={`${isPending ? "button" : "submit"}`}
            bgColor="accountBlack"
            paddingStyle={`${isPending ? "py-3 px-8" : "py-3 px-6"}`}
          >
            {isPending ? (
              <LoadingIndicator color="white" margin="my-0" />
            ) : (
              "登入"
            )}
          </FeatureButton>
        </div>
      </form>
    </section>
  );
}
