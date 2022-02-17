import '../css/home.css';
import {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {updateTimeTable,updateWork} from '../actions/index';

function Home(){
    const navigate = useNavigate();
    const [file,setFile] = useState(null);
    const dispatch = useDispatch();
    const TimeTable = useSelector(state=>state.TimeTable).TimeTable;
    const Work = useSelector(state=>state.Work).work;
    console.log(Work);    
    const [week,setWeek] = useState(1);
    const [thu,setThu] = useState(-1);
    const [tiet,setTiet] = useState(-1);
    const begindate = new Date(2022,1,7);
    const workcontent = useRef();

    function changeFile(event){
        let filename = event.target.files[0].name;
        setFile(event.target.files[0]);
        alert(filename + " được chọn thành công !");
    }

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
            console.log(res);
            if(res.status==200) {
                axios({
                    method:'POST',
                    url:'https://timtable-server.herokuapp.com/getTimeTable',
                    headers:{
                        Authorization: cookie
                    }
                }).then((res)=>{
                    dispatch(updateTimeTable(res.data.result));
                }).catch((err)=>{
                    console.log(err);
                })
                axios({
                    method:'POST',
                    url:'https://timtable-server.herokuapp.com/getWork',
                    headers:{
                        Authorization: cookie
                    }
                }).then((res)=>{
                    dispatch(updateWork(res.data.work));
                }).catch((err)=>{
                    console.log(err);
                })
                var today = new Date().getTime();
                var theta = today - begindate.getTime();
                setWeek(Math.ceil(theta/(1000*60*60*24*7)));
            }
            else navigate("/login");
        }).catch((err)=>{
            navigate("/login");
        });
    },[]);

    function uploadFile(){
        const cookies = `; ${document.cookie}`;
        var cookie = '';
        const parts = cookies.split(`; __token=`);
        if (parts.length === 2) cookie =  parts.pop().split(';').shift();
        if(file != null){
        var data = new FormData();
        data.append("file",file);
        axios.post("https://timtable-server.herokuapp.com/upload",data,{headers:{Authorization:cookie}})
        .then(res =>{
            if(res.status==200){
                alert('Đồng bộ thành công !');
                window.location.reload();
            }else{
                alert('Thất bại');
            }
        }).catch(err=>{
            alert(err);
        })
        }else{
            alert('Chưa chọn file lịch học');
        }
    }
    function changeWeek(i){
        if(i==-2) setWeek(1);
        else{
            if(week+i >= 1)
                setWeek(week+i);
            else alert('Không thực hiện được');
        }
    }
    function addwork(event,thu,tiet){
        event.preventDefault();
        setThu(thu);
        setTiet(tiet);
        var addform = document.querySelector(".addwork");
        addform.classList.remove("d-none");
    }
    function cancelAdd(event){
        event.preventDefault();
        var addform = document.querySelector(".addwork");
        addform.classList.add("d-none");
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
    function deletework(){
        const cookies = `; ${document.cookie}`;
        var cookie = '';
        const parts = cookies.split(`; __token=`);
        if (parts.length === 2) cookie =  parts.pop().split(';').shift();
        axios({
            method: 'POST',
            url: 'https://timtable-server.herokuapp.com/deletework',
            headers:{
                Authorization: cookie
            },
            data:{
                work: {
                    thu,
                    tiet,
                    tuan: week
                }
            }
        }).then((res)=>{
            if(res.status == 200) {
                alert("Thành công");
                window.location.reload();
            }
            else alert("Lỗi");
        }).catch((err)=>{
            alert("Lỗi");
        })
    }
    function copyZoom(event){
        var text = event.target.querySelector(".zoomID");
        navigator.clipboard.writeText(text.value);
        alert("Đã sao chép");
    }
    function tutorial(){
        window.open("https://youtu.be/xGDiap3e2fc",'_blank').focus();
    }
    function Add(){
        const cookies = `; ${document.cookie}`;
        var cookie = '';
        const parts = cookies.split(`; __token=`);
        if (parts.length === 2) cookie =  parts.pop().split(';').shift();
        let content = workcontent.current.value;
        axios({
            method: 'POST',
            url: 'https://timtable-server.herokuapp.com/addWork',
            headers:{
                Authorization: cookie
            },
            data:{
                work: {
                    noidung: content,
                    thu,
                    tiet,
                    tuan: week
                }
            }
        }).then((res)=>{
            if(res.status == 200) {
                alert("Thành công");
                window.location.reload();
            }
            else alert("Lỗi");
        }).catch((err)=>{
            alert("Lỗi");
        })
    }
    var daystart = new Date(begindate.getTime() + ((week-1)*7*24*60*60*1000));
    var tgb = "THỜI GIAN BIỂU ( Tuần " + week + " | " + formatDate(daystart) + "-" + formatDate(new Date(daystart.getTime() + 6*24*60*60*1000)) + ")";
    var day = (
        <tr>
            <th className="time"></th>
            <th title={"Ngày: " + formatDate(daystart)}>Thứ 2</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (24*60*60*1000)))}>Thứ 3</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (2*24*60*60*1000)))}>Thứ 4</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (3*24*60*60*1000)))}>Thứ 5</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (4*24*60*60*1000)))}>Thứ 6</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (5*24*60*60*1000)))}>Thứ 7</th>
            <th title={"Ngày: " + formatDate(new Date(daystart.getTime() + (6*24*60*60*1000)))}>Chủ nhật</th>
        </tr>
    )
    var lesson = [];
    var tmpweek = week.toString();
    var curweek = Number(tmpweek[tmpweek.length-1]);
    var remem = [0,0,0,0,0,0,0];
    let time=["7:30-8:20","8:30-9:20","9:30-10:20","10:30-11:20","12:30-13:20","13:30-14:20","14:30-15:20","15:30-16:20","16:30-17:20","17:30-18:20","19:30-20:20","20:30-21:20"];
    function handleSubject(thu,tiet){
        var les = TimeTable.filter((item)=>{
            if(Number(item.Tuan[week-1])==curweek){
                if(item.Thu == thu){
                    if(item.TietBD == tiet){
                        return 1;
                    }
                }
            }
        });
        var haswork = Work.filter((item)=>{
            return (item.Tiet == tiet && item.Thu == thu && item.Tuan == week);
        })
        let clname = "detail position-absolute text-start ";
        thu==8?clname+="end-50 ":clname+="start-50 ";
        tiet<11?clname+="top-50 ":clname+="bottom-50 ";
        if(les.length == 0) {
            if(remem[thu-2] > 0){
                remem[thu-2]--;
                return;
            }else{
                return (
                    <td rowSpan='1' className="position-relative">
                    {haswork.length > 0 ? <strong className="text-danger f-big">!</strong>:null}
                    <div className={clname} style={{zIndex:10,height:'190px'}}>
                        <div className="sbjtitle">Không có lịch học</div>
                        <div className="worktitle">Công việc: {haswork.length > 0 ? haswork[0].NoiDung : null}</div>
                        <div className="detail-function position-absolute start-50 d-flex justify-content-center align-items-center">
                            <div className="btn-info w-50 text-center" onClick={(event)=>addwork(event,thu,tiet)}>Chỉnh sửa</div>
                        </div>
                    </div>
                    </td>
                )
            }
        };
        let i = les[0];
        remem[thu-2] = i.SoTiet-1;
        return(
        <td rowSpan={i.SoTiet} className="position-relative">
        <div className="monhoc">{haswork.length > 0 ? <strong className="text-danger f-big">!</strong>:null} {i.TenMonHoc}</div>
        <div className={clname} style={{zIndex:10,height:'190px'}}>
            <div className="sbjtitle">Môn học: {i.TenMonHoc}</div>
            <div className="sbjplc">
                Phòng: {i.PhongHoc}
                <i className="fa-solid fa-clipboard" onClick={(event)=>copyZoom(event)}>
                    <textarea hidden className="zoomID" defaultValue={i.PhongHoc}></textarea>
                </i>
            </div>
            <div className="sbjdetail">Thời gian: {time[tiet-1].split("-")[0] + "-" +  time[(tiet - 2 + i.SoTiet)].split("-")[1]}</div>
            <div className="worktitle">Công việc: {haswork.length > 0 ? haswork[0].NoiDung : null}</div>
            <div className="detail-function position-absolute start-50 d-flex justify-content-center align-items-center">
                <div className="btn-info w-50 text-center" onClick={(event)=>addwork(event,thu,tiet)}>Chỉnh sửa</div>
            </div>
        </div>
        </td>)
    }
    for(let i = 1; i<=12; i++){
        let temp = (
            <tr key={i}>
                <th className="time" title={"Thời gian: " + time[i-1]}>Tiết {i}</th>
                {handleSubject(2,i)}
                {handleSubject(3,i)}
                {handleSubject(4,i)}
                {handleSubject(5,i)}
                {handleSubject(6,i)}
                {handleSubject(7,i)}
                {handleSubject(8,i)}
            </tr>
        )
        lesson.push(temp);
    }

    return(
    <>
        <div className="w-100 homepage d-flex justify-content-center align-items-center" style={{marginBottom:'100px'}}>
            <div className="d-flex container justify-content-end py-2">
                <div className="btn-info btn-function" onClick={()=>tutorial()}>Hướng dẫn</div>
                <label htmlFor="synch-btn" className="filebtn btn-info btn-function position-relative">
                    Chọn file
                </label>
                <input onChange={changeFile} type="file" accept=".html" id="synch-btn"/>
                <div onClick={uploadFile} className="btn-info btn-function">Đồng bộ lịch học</div>
            </div>
            <div className="addwork d-none position-fixed top-0 start-0 d-flex align-items-center justify-content-center" style={{zIndex:11}}>
                <div className="addwork-form position-absolute d-flex justify-content-between align-items-center">
                    <div className="f-12 none-select">Giới hạn (150 từ)</div>
                    <textarea ref={workcontent} name="" id="mywork" maxLength="150"></textarea>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="btn-info text-center" onClick={()=>Add()}>Thêm</div>
                        <div className="btn-info text-center" onClick={(event)=>cancelAdd(event)}>Đóng</div>
                        <div className="btn-info text-center" onClick={()=>deletework()}>Xóa CV</div>
                    </div>
                </div>
            </div>
            <div className="text-center pb-2 f-18 f-bold">{tgb}</div>
            <table className="my-table text-center">
                <thead>
                    {day}
                </thead>
                <tbody>
                    {lesson}
                </tbody>
            </table>
            <div className="w-100 d-flex align-items-center justify-content-center pt-3">
                <div onClick={()=>changeWeek(-1)} className="btn btn-info mx-1 f-14">Tuần trước</div>
                <div onClick={()=>changeWeek(1)} className="btn btn-info mx-1 f-14">Tuần kế</div>
                <div onClick={()=>changeWeek(-2)} className="btn btn-info mx-1 f-14">Tuần đầu</div>
            </div>
        </div>
    </>
    )
}

export default Home;