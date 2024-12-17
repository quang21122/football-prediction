import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const authenticateEmail = (email) => {
  return email == "nnpuyen22@clc.fitus.edu.vn";
}

const authenticatePassword = (password) => {
  return password == "12345678";
}

function UserInput({ label, field, placeHolder, inputRef, children }) {
  return (
    <div className="flex flex-col text-2xl w-[28rem] mb-8">
      <label className="font-semibold text-gray-700 mb-3">{label}</label>
      <input
        className="h-16 bg-gray-100 px-4 py-1 rounded-md outline-none"
        type={field}
        placeholder={placeHolder}
        ref = {inputRef}
      />
      {children}
    </div>
  );
}

const SignInForm = () => {
    const navigate = useNavigate();
    const { userName, setUserName } = useContext(UserContext); 
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailNoti, setEmailNoti] = useState("");
    const [passwordNoti, setPasswordNoti] = useState("");

    const handleSignIn = () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (!authenticateEmail(email))
      {
        setEmailNoti("Email này chưa đăng ký tài khoản");
        setPasswordNoti("");
      }
      else
      {
        setEmailNoti("");
        if (!authenticatePassword(password))
        {
          setPasswordNoti("Mật khẩu đã nhập không đúng");
        }
        else
        {
          setPasswordNoti("");
          const username = email.split('@')[0];
          setUserName(username);
          navigate("/");
        }
      }
      
    };

  return (
    <div className="flex flex-col min-w-[360px] w-1/4 min-h-[42rem] h-auto items-center bg-white rounded-3xl">
      <div className="text-4xl text-red-400 mt-12 mb-6">Welcome back to</div>
      <div className="text-4xl text-red-400 font-bold mb-10">
        Football Prediction
      </div>
      <UserInput
        label="Email"
        field="email"
        placeHolder="example.email@gmail.com"
        inputRef = {emailRef}
      >
        <div className="min-w-[300px] text-left text-red-500 text-base">
          {emailNoti}
        </div>
      </UserInput>

      <UserInput
        label="Mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
        inputRef = {passwordRef}
      >
        <div className="min-w-[300px] text-left text-red-500 text-base">
          {passwordNoti}
        </div>
      </UserInput>
      <button
        onClick={handleSignIn}
        className=" w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none mt-6"
      >
        Đăng nhập
      </button>

      <a
        href="/forgot-password"
        className="text-red-500 hover:text-red-700 text-2xl mt-6 mb-4"
      >
        Quên mật khẩu?
      </a>
      <div className="min-w-[300px] text-red-500 text-center text-2xl mb-2">
        Chưa có tài khoản?
        <a
          href="/signup"
          className="p-2 font-semibold hover:text-red-700 text-red-500"
        >
          Đăng Ký
        </a>
      </div>
    </div>
  );
};

const SignUpForm = () => {

  const navigate = useNavigate();
  const { userName, setUserName } = useContext(UserContext); 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null)
  const [emailNoti, setEmailNoti] = useState("");
  const [passwordNoti, setPasswordNoti] = useState("");
  const [confirmPasswordNoti, setConfirmPasswordNoti] = useState("");

  const handleSignUp = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!validateEmail(email))
    {
      setEmailNoti("Địa chỉ email không hợp lệ");
    }
    else
    {
      setEmailNoti("");
    }

    if (!validatePassword(password))
    {
      setPasswordNoti("Mật khẩu phải chứa ít nhất 8 kí tự")
      setConfirmPasswordNoti("");
    }
    else
    {
      setPasswordNoti("");
    }

    if (validateEmail(email) && validatePassword(password))
    {
      if (password != confirmPassword)
      {
        setConfirmPasswordNoti("Mật khẩu xác nhận không khớp với mật khẩu");
      }
      else
      {
        const username = email.split('@')[0];
        setUserName(username);
        setConfirmPasswordNoti("");
        navigate("/");
      }
    }
  };
  return (
    <div className="flex flex-col w-1/4 min-w-[300px] min-h-[50rem] h-auto items-center bg-white rounded-3xl">
      <div className="text-4xl text-red-400 mt-12 mb-6">Welcome to</div>
      <div className="text-4xl text-red-400 font-bold mb-10">
        Football Prediction
      </div>

      <UserInput
        label="Email"
        field="email"
        placeHolder="example.email@gmail.com"
        inputRef = {emailRef}
      >
        <div className="min-w-[300px] text-left text-red-500 text-base">
          {emailNoti}
        </div>
      </UserInput>

      <UserInput
        label="Mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
        inputRef = {passwordRef}
      >
        <div className="min-w-[300px] text-left text-red-500 text-base">
          {passwordNoti}
        </div>
      </UserInput>

      <UserInput
        label="Xác nhận mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
        inputRef = {confirmPasswordRef}
      >
        <div className="min-w-[300px] text-left text-red-500 text-base">
          {confirmPasswordNoti}
        </div>

      </UserInput>
      <button
        onClick={handleSignUp}
        className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12 "
      >
        Đăng ký
      </button>
      <div className="min-w-[300px] text-center text-red-500 mb-6 text-2xl">
        Đã có tài khoản?
        <a
          href="/signin"
          className="p-2 font-semibold hover:text-red-700 text-red-500"
        >
          Đăng nhập
        </a>
      </div>
    </div>
  );
};
export { SignUpForm };
export default SignInForm;
