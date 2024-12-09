import { useNavigate } from "react-router-dom";
function UserInput({ label, field, placeHolder }) {
  return (
    <div className="flex flex-col text-2xl w-[28rem]">
      <label className="font-semibold text-gray-700 mb-3">{label}</label>
      <input
        className="h-16 bg-gray-100 px-4 py-1 rounded-md outline-none mb-8"
        type={field}
        placeholder={placeHolder}
      />
    </div>
  );
}

const SignInForm = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-w-[360px] w-1/4 h-[42rem] items-center bg-white rounded-3xl">
      <div className="text-4xl text-red-400 mt-12 mb-6">Welcome back to</div>
      <div className="text-4xl text-red-400 font-bold mb-10">
        Football Prediction
      </div>
      <UserInput
        label="Email"
        field="email"
        placeHolder="example.email@gmail.com"
      />
      <UserInput
        label="Mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
      />
      <button
        onClick={handleNavigateHome}
        className=" w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none mt-6"
      >
        Đăng nhập
      </button>
      <div className="min-w-[300px] text-red-500 text-center text-2xl mt-8">
        Chưa có tài khoản?
        <a
          href="/signup"
          className="p-2 font-semibold hover:text-red-700 text-red-500"
        >
          Đăng ký
        </a>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col w-1/4 min-w-[300px] h-[50rem] items-center bg-white rounded-3xl">
      <div className="text-4xl text-red-400 mt-12 mb-6">Welcome to</div>
      <div className="text-4xl text-red-400 font-bold mb-10">
        Football Prediction
      </div>
      <UserInput
        label="Email"
        field="email"
        placeHolder="example.email@gmail.com"
      />
      <UserInput
        label="Mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
      />
      <UserInput
        label="Xác nhận mật khẩu"
        field="password"
        placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự"
      />
      <button
        onClick={handleNavigateHome}
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
