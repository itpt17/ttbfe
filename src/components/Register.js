import axios from 'axios';
import { useRef, useState } from 'react';
import '../css/register.css';

function Register(){
    const user = useRef();
    const pass = useRef();
    const repass = useRef();
    const [message,setMessage] = useState();

    function register(){
        let __user = user.current.value;
        let __pass = pass.current.value;
        let __repass = repass.current.value;
        axios({
            method:'POST',
            url: 'https://timtable-server.herokuapp.com/register',
            data:{
                user: __user,
                pass: __pass,
                repass: __repass
            }
        }).then((res)=>{
            if(res.data.register == true){
                alert("Thành công");
            }else{
                setMessage(res.data.message);
            }
        }).catch((err)=>{
            alert("Lỗi");
        })
    }
    return(
        <div className="w-100 register d-flex justify-content-center align-items-center">
            <div className="register-container position-absolute text-center">
                <h4 className="f-bold text-main text-start">Đăng kí</h4>
                <input ref={user} type="text" placeholder="Tên đăng nhập" className="register-inp f-12"/>
                <input ref={pass} type="password" placeholder="Mật khẩu" className="register-inp f-12"/>
                <input ref={repass} type="password" placeholder="Nhập lại mật khẩu" className="register-inp f-12"/>
                <button className="register-submit f-12 text-white" onClick={()=>register()}>Gửi đi</button>
                <p className="text-danger f-12 text-center">{message}</p>
            </div>
       </div>
    )
}

export default Register;