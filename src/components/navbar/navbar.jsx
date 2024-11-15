import { useEffect} from "react";

const NavigationBar = () => {
  useEffect(() => {
    // Lấy tất cả các tab
    const tabs = document.querySelectorAll('.navbar a');

    // Thêm sự kiện click cho mỗi tab
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        // Loại bỏ lớp active khỏi tất cả các tab
        tabs.forEach(t => t.classList.remove('active'));
        // Nếu tab đầu tiên được click, active tab thứ hai
        if (index === 0) {
          tabs[1].classList.add('active');
        } else {
          // Thêm lớp active vào tab được click
          this.classList.add('active');
        }
      });
    });

    // Cleanup function để loại bỏ các sự kiện khi component bị unmount
    return () => {
      tabs.forEach((tab) => {
        tab.removeEventListener('click', function() {
          tabs.forEach(t => t.classList.remove('active'));
          if (index === 0) {
            tabs[1].classList.add('active');
          } else {
            this.classList.add('active');
          }
        });
      });
    };
  }, []);
  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-family: Arial, sans-serif;
        }
        .navbar {
            height: 3.75em;
            width: 100%;
            top: 0;
            position: fixed;
            overflow: hidden;
            background-color: #DD3333;
            display: flex;
            justify-content: center; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar a {
            float: left;
            display: block;
            color: #ffffff;
            text-align: center;
            padding: 0.875em 1em;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold; 
            width: 10.9em;
            border-right: 0.0625em solid #B22D2D;
            position: relative;
        }
        .navbar a:first-child {
            text-align: left;
            width: 20em;
        }
        .navbar a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0.25em;
            background-color: yellow;
            bottom: 0;
            left: 0;
            transition: width 0s;
        }
        .navbar a.active::after {
            width: 100%;
        }
        .navbar a:hover {
            background-color: #FF8F8F;
            /*color: black;*/
        }
        `}
      </style>
      <div className="navbar">
        {/* Add your navigation items here */}
        <a href="/">Football Prediction</a>
        <a href="/" class="active">Lịch thi đấu</a>
        <a href="#ranking">Bảng xếp hạng</a>
        <a href="#clubs">Câu lạc bộ</a>
        <a href="#chatbot">Chatbot</a>
        <a href="#account">Đăng nhập</a>
      </div>
    </>
  );
};

export default NavigationBar;