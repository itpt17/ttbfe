import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

function Navbar(){
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    function logout(){
        document.cookie =  '__token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.reload();
    }
    var elm_register = (
        <div className="register-function position-relative">
            <Link to="/register">
                <i className="fa-solid fa-user-pen f-14 text-white"></i>
            </Link>
            <div className="my-tooltip position-absolute tooltip-br">Đăng ký</div>
        </div>
    )
    var elm_login = (
        <div className="login-function position-relative">
            <Link to="/login">
                <i className="fa-solid fa-right-to-bracket f-14 text-white"></i>
            </Link>
            <div className="my-tooltip position-absolute tooltip-br">Đăng nhập</div>
        </div>
    )
    var elm_out = (
        <div className="login-function position-relative">
            <i className="fa-solid fa-right-from-bracket f-14 text-white" onClick={()=>logout()}></i>
            <div className="my-tooltip position-absolute tooltip-br">Đăng xuất</div>
        </div>
    )
    return(
        <div className="navbar bg-main w-100 d-flex container-fluid position-fixed top-0">
           <div className="text-white">
               <div className="logo none-select">Tạo bởi: Khanh</div>
           </div>
           <div className="function">
               {path.toLocaleLowerCase() == 'home' ? elm_out : path.toLocaleLowerCase() == 'register' ? elm_login : elm_register}
           </div>
       </div>
    )
}

export default Navbar;