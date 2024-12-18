import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import userIcon from "../assets/user.png";

function Profile(){
    const navigate = useNavigate();
    const { userName, setUserName, email, setEmail, password, setPassword} = useContext(UserContext); 
    const handleLogout = () =>{
        setUserName(null);
        setPassword(null);
        setEmail(null);
        navigate("/signin");
    };

    const handleChangePassword = () => {
        navigate("/changepassword");
    };

    const handleDeleteAccount = () => {
        navigate("/deleteaccount");
    }
    return (
        <div className="bg-width h-screen">
            <div className="max-w-[160rem] pt-48 mx-auto h-screen flex flex-col items-center bg-red-200">
                <div className="flex flex-col min-w-[360px] min-h-[40rem] w-auto h-auto justify-center items-center bg-white rounded-3xl">
                    <div className="flex flex-col justify-items-start">
                        <img className="w-16 h-16 mx-auto" src={userIcon} alt="User Icon" />
                        <div className="mt-4 mb-8 text-3xl font-bold text-gray-500">{email}</div>
                    </div>
                    <button onClick={handleChangePassword} className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12">
                        Đổi mật khẩu
                    </button>
                    <button onClick={handleLogout} className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12">
                        Đăng xuất
                    </button>
                    <button onClick={handleDeleteAccount} className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6 mb-12">
                        Xóa tài khoản
                    </button>
                </div>
            </div>
        </div>
    )
} 

export default Profile;
