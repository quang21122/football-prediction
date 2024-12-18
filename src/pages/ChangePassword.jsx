import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { UserInput } from "../components/signInForm/signInForm";
import { FaChevronRight } from "react-icons/fa";

function ChangePassword(){
    //const navigate = useNavigate();
    const { userName, setUserName, email, setEmail, password, setPassword} = useContext(UserContext); 
    
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmNewPasswordRef = useRef(null);
    const [passwordNoti, setPasswordNoti] = useState("");
    const [newPasswordNoti, setNewPasswordNoti] = useState("");
    const [confirmNewPasswordNoti, setConfirmNewPasswordNoti] = useState("");
    const [successfulNoti, setSuccessfulNoti] = useState("");

    const handleChangePassowrd = () => {
        // const enteredPassword = passwordRef.current.value
        if (passwordRef.current.value != password)
        {
            setPasswordNoti("Mật khẩu đã nhập không đúng"); 
        }
        else
        {
            setPasswordNoti("");
            if (newPasswordRef.current.value.length < 8)
            {
                setNewPasswordNoti("Mật khẩu mới phải chứa ít nhất 8 ký tự");
            }
            else
            {
                setNewPasswordNoti("");
                if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value)
                {
                    setConfirmNewPasswordNoti("Mật khẩu xác nhận không khớp với mật khẩu mới")
                }
                else
                {
                    setConfirmNewPasswordNoti("");
                    setSuccessfulNoti("Đổi mật khẩu thành công"); 
                    setPassword(newPasswordRef.current.value);
                }
            }
        }
    };
    return (
        <div className=" h-screen">
            <div className="min-w-screen pt-12 h-screen flex flex-col items-center bg-red-200">
                <div className="ml-4 self-start flex">
                    <Link to="/profile" className="mr-4 block hover:underline">
                        Tài khoản
                    </Link>
                    <div className="flex items-center ">
                        <FaChevronRight />
                        <p className="ml-4">Đổi mật khẩu</p>
                    </div>
                </div>
                <div className="flex flex-col self-stretch justify-center items-center pt-36">
                    <div className="flex flex-col min-w-[360px] min-h-[40rem] w-1/4 h-auto justify-center items-center bg-white rounded-3xl">
                        <UserInput
                            label="Nhập mật khẩu hiện tại"
                            field="password"
                            placeHolder="Mật khẩu phải chứa ít nhất 8 ký tự"
                            inputRef = {passwordRef}
                        >
                            <div className="min-w-[300px] text-left text-red-500 text-base">
                                {passwordNoti}
                            </div>
                        </UserInput>

                        <UserInput
                            label="Nhập mật khẩu mới"
                            field="password"
                            placeHolder="Mật khẩu phải chứa ít nhất 8 ký tự"
                            inputRef = {newPasswordRef}
                        >
                            <div className="min-w-[300px] text-left text-red-500 text-base">
                                {newPasswordNoti}
                            </div>
                        </UserInput>

                        <UserInput
                            label="Xác nhận mật khẩu mới"
                            field="password"
                            placeHolder="Mật khẩu phải chứa ít nhất 8 ký tự"
                            inputRef = {confirmNewPasswordRef}
                        >
                            <div className="min-w-[300px] text-left text-red-500 text-base">
                                {confirmNewPasswordNoti}
                            </div>
                        </UserInput>
                        <button onClick={handleChangePassowrd} className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6"
                        >
                            Đổi mật khẩu
                            
                        </button>
                        <div className="min-w-[300px] text-left text-red-500 text-base">
                                {successfulNoti}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default ChangePassword;