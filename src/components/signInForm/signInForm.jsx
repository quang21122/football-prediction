import { useNavigate } from 'react-router-dom'
function UserInput({label, field, placeHolder}){
    return (
        <div className="flex flex-col text-lg">
            <label className="font-semibold text-gray-700 mb-3">{label}</label>
            <input className ="w-96 h-16 bg-gray-100 text-base p-2 rounded-md outline-none mb-8"
            type={field}
            placeholder={placeHolder}/>
        </div>
    )
}


const SignInForm = () => 
{
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };
    
    return (
            <div className="flex flex-col min-w-[300px] w-1/4 h-[38rem] items-center bg-white rounded-3xl">
                <div className="text-2xl text-red-400 mt-12 mb-2">Welcome back to</div>
                <div className="text-3xl text-red-400 font-bold mb-10">Football Prediction</div>
                <UserInput label="Email" field="email" placeHolder="example.email@gmail.com" />
                <UserInput label="Mật khẩu" field="password" placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự" />
                <button onClick={handleNavigateHome}
                className=" w-96 h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none mt-6">Đăng nhập</button>
                <div className="min-w-[300px] text-red-500 text-center text-base mt-8" >Chưa có tài khoản?  
                    <a href="/signup" className = "p-2 font-semibold hover:text-red-700 text-red-500">Đăng ký</a>
                </div>
            </div>
    )
}

const SignUpForm = () =>
{
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };
    return(
        <div className="flex flex-col w-1/4 min-w-[300px] h-[48rem] items-center bg-white rounded-3xl">
            <div className="text-2xl text-red-400 mt-12 mb-2">Welcome to</div>
            <div className="text-3xl text-red-400 font-bold mb-10">Football Prediction</div>
            <UserInput label="Email" field="email" placeHolder="example.email@gmail.com" />
            <UserInput label="Mật khẩu" field="password" placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự" />
            <UserInput label="Xác nhận mật khẩu" field="password" placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự" />
            <button onClick={handleNavigateHome}
            className="w-96 h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12 ">Đăng ký</button>
            <div className="min-w-[300px] text-center text-red-500 mb-6 text-base" >Đã có tài khoản?  
                <a href="/signin" className = "p-2 font-semibold hover:text-red-700 text-red-500">Đăng nhập</a>
            </div>
        </div>
    )
}
export {SignUpForm};
export default SignInForm;