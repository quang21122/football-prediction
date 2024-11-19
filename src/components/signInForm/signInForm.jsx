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
    return (
            <div className="flex flex-col w-1/4 h-[36rem] items-center bg-white rounded-3xl">
                <div className="text-3xl text-red-400 font-bold mt-12 mb-10">Football Prediction</div>
                <UserInput label="Email" field="email" placeHolder="example.email@gmail.com" />
                <UserInput label="Mật khẩu" field="password" placeHolder="Mật khẩu phải chứa ít nhất 8 kí tự" />
                <button className="w-96 h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12 ">Đăng nhập</button>
                <div className="text-red-500 mb-6 text-base" >Chưa có tài khoản?  
                    <href className = "p-2 font-semibold text-red-500">Đăng ký</href>
                </div>
            </div>
    )
}
export {UserInput};
export default SignInForm;