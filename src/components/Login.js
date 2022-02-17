import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import axios from 'axios';

function Login(){
    const [message,setMessage] = useState('');
    const user = useRef();
    const pass = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
        const cookies = `; ${document.cookie}`;
        var cookie = '';
        const parts = cookies.split(`; __token=`);
        if (parts.length === 2) cookie =  parts.pop().split(';').shift();
        console.log(cookie);
        axios({
            method:'GET',
            url: 'https://timtable-server.herokuapp.com/connect',
            headers:{
                Authorization: cookie
            }
        }).then((res)=>{
            if(res.status==200) navigate("/home");
        }).catch((err)=>{
        });
    },[]);

    function login(){
        let __user = user.current.value;
        let __pass = pass.current.value;
        axios({
            method: 'POST',
            url: 'https://timtable-server.herokuapp.com/login',
            data:{
                user: __user,
                pass: __pass
            }
        }).then((res)=>{
            if(res.data.login == false){
                setMessage(res.data.message);
            }else{
                let date = new Date();
                date.setDate(date.getDate()+30);
                let expires = "; expires="+date.toUTCString();
                let newcookie = "__token=" + res.data.token + expires + "; path=/";
                document.cookie = newcookie;
                navigate("/home");
            }
        }).catch((err)=>{
            alert("Lỗi");
        })
    }
    return(
        <div className="w-100 login d-flex justify-content-center align-items-center">
            <div className="login-container position-absolute text-center">
                <h4 className="f-bold text-main text-start">Đăng nhập</h4>
                <input ref={user} type="text" placeholder="Tên đăng nhập" className="login-inp f-12"/>
                <input ref={pass} type="password" placeholder="Mật khẩu" className="login-inp f-12"/>
                <button className="login-submit f-12 text-white" onClick={()=>login()}>Gửi đi</button>
                <p className="text-danger f-12 text-center">{message}</p>
            </div>
       </div>
    )
}

export default Login;