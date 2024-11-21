
import { SignUpForm } from "../components/signInForm/signInForm";
import googleIcon from "../assets/Google.png";

function SignUp(){
    return(
        <div className="bg-width h-screen">
            <div className="max-w-[120rem] pt-36 mx-auto h-screen flex flex-col items-center bg-red-200">
                <SignUpForm/>
                <div className="w-1/4 text-left text-base text-gray-700 mt-8 mb-4">hoặc</div>
                <button className="flex hover:bg-gray-100 justify-start items-center w-1/4 h-[5rem] text-gray-700 bg-white rounded-3xl"> 
                    <img className="w-12 h-12 ml-16" src={googleIcon} alt="Google Icon"  />
                    <div className="ml-10 mr-auto text-2xl ">Đăng ký bằng Google</div>
                </button>
            </div>
        </div>
    )
}
export default SignUp