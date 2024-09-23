import SesionDao from "../../dao/SesionDao.js";

window.onload = () => {

    agregarEvento();

}

function agregarEvento(){

    let formElement = document.querySelector("#frmInicio");

    formElement.onsubmit = (e)=>{

        e.preventDefault();
        let email = formElement.email.value;
        let password = formElement.password.value;
        iniciarSesion(email,password);

    }

}

    async function iniciarSesion(email,password){

        let respuesta = await new SesionDao().iniciarSesion(email,password);
        if(respuesta.estado){
            let respuesta = await new SesionDao().obtenerSesion();
            console.log(respuesta);
            window.location.href = "../index/index.html";
        }else{

            alert(respuesta.mensaje);
        }
        console.log(respuesta);

    }

