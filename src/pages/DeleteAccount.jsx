import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { UserInput } from "../components/signInForm/signInForm";
import { FaChevronRight } from "react-icons/fa";

function DeleteAccount(){
    const { userName, setUserName, email, setEmail, password, setPassword} = useContext(UserContext); 
    
    const passwordRef = useRef(null);
    const [passwordNoti, setPasswordNoti] = useState("");
    const [successfulNoti, setSuccessfulNoti] = useState("");
    const [backToPrevious, setBackToPrevious] = useState("/profile");
    const [previousPage, setPreviousPage] = useState("Tài khoản");
    const handleDeleteAccount = () => {
        if (passwordRef.current.value != password)
        {
            setPasswordNoti("Mật khẩu đã nhập không đúng"); 
        }
        else
        {
            setPasswordNoti("");
            setSuccessfulNoti("Xóa tài khoản thành công");
            setBackToPrevious("/signin");
            setPreviousPage("Đăng nhập");
            setUserName(null);
            setEmail(null);
            setPassword(null);
        }
    };
    return (
        <div className=" h-screen">
            <div className="min-w-screen pt-12 h-screen flex flex-col items-center bg-red-200">
                <div className="ml-4 self-start flex">
                    <Link to={backToPrevious}  className="mr-4 block hover:underline">
                        {previousPage}
                    </Link>
                    <div className="flex items-center ">
                        <FaChevronRight />
                        <p className="ml-4">Xóa tài khoản</p>
                    </div>
                </div>
                <div className="flex flex-col self-stretch justify-center items-center pt-36">
                    <div className="flex flex-col min-w-[360px] min-h-[25rem] w-1/4 h-auto justify-center items-center bg-white rounded-3xl">
                        <UserInput
                            label="Nhập mật khẩu để xác nhận xóa tài khoản"
                            field="password"
                            placeHolder="Mật khẩu phải chứa ít nhất 8 ký tự"
                            inputRef = {passwordRef}
                        >
                            <div className="min-w-[300px] text-left text-red-500 text-base">
                                {passwordNoti}
                            </div>
                        </UserInput>

                        
                        <button onClick={handleDeleteAccount} className="w-[28rem] h-16 bg-red-400 hover:bg-red-500 text-3xl text-white font-bold rounded-md outline-none my-6"
                        >
                            Xóa tài khoản
                            
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

export default DeleteAccount;