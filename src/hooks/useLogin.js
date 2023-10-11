import supabase from "../config/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const login = async () => {
    const { data, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) return setError(error.message);
    console.log(data);
    dispatch(
      authActions.login({
        username: data.username,
        id: data.id,
        avatar_url: data.avatar_url,
      })
    );
    if (data.avatar_url) {
      navigate("/menu");
    }
    navigate("/profile");
  };

  return {
    login,
    handleInput,
    email,
    password,
    loading,
    error,
  };
};

export default useLogin;
