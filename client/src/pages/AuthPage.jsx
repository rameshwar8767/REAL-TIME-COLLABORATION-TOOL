import { useState } from "react";
import SignupForm from "./../component/SignupFom";
import LoginForm from "./../component/LoginForm";
import Layout from "./../layout/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn == true) navigate("/dashboard");
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center mt-4">
        {isLogin ? (
          <LoginForm onSwitch={handleSwitch} />
        ) : (
          <SignupForm onSwitch={handleSwitch} />
        )}
      </div>
    </Layout>
  );
};

export default AuthPage;
