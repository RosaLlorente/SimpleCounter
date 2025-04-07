window.onload = function() {//Fallas con la asignacion de modos,se debe arreglar
    //Gestionar el modo
    var modo = document.getElementById("Modo");
    var SimpleCounterdiv = document.getElementById("SimpleCounter");
    var Cronometrodiv = document.getElementById("Cronometro");
    var Relojdiv = document.getElementById("Reloj");
    
    actualizarModo(modo,SimpleCounterdiv, Cronometrodiv, Relojdiv);
    modo.addEventListener("change", () => {
        actualizarModo(modo,SimpleCounterdiv, Cronometrodiv, Relojdiv);
    });
}

function actualizarModo(modo,SimpleCounterdiv, Cronometrodiv, Relojdiv) {
    var valor = modo.value; // Obtener el valor actual del select

    // Ocultar todos los divs
    SimpleCounterdiv.style.display = "none";
    Cronometrodiv.style.display = "none";
    Relojdiv.style.display = "none";

    // Mostrar el div correspondiente
    if (valor === "SimpleCounter") 
    {
        SimpleCounterdiv.style.display = "flex";
        SimpleCounter();
    } 
    else if (valor === "Cronometro") 
    {
        Cronometrodiv.style.display = "flex";
        Cronometro();
    } 
    else if (valor === "Reloj") 
    {
        Relojdiv.style.display = "flex";
        Reloj();
    }
}

function SimpleCounter() {
    var Incrementar = document.getElementById("Incrementar");
    var Decrementar = document.getElementById("Decrementar");
    var Reset = document.getElementById("Reset");
    var Contador = document.getElementById("counter");

    var Cantidad_Contador = 0;

    //Gestionar el incremento del contador de clicks
    Incrementar.addEventListener("click", function() {
        Cantidad_Contador++;
        Contador.innerText = Cantidad_Contador;
        if(Cantidad_Contador === 0)
        {
            Contador.style.color = "var(--color-positivo)";
        }
        else if(Cantidad_Contador > 0)
        {
            Contador.style.color = "var(--ContadorPositivo)";
        }
    });
    //Gestionar el decremento del contador de clicks
    Decrementar.addEventListener("click", function() {
        Cantidad_Contador--;
        Contador.innerText = Cantidad_Contador;
        if(Cantidad_Contador === 0)
        {
            Contador.style.color = "var(--color-positivo)";
        }
        else if(Cantidad_Contador < 0)
        {
            Contador.style.color = "var(--ContadorNegativo)";
        }
    });

    //Gestionar el reseteo del contador de clicks
    Reset.addEventListener("click", function() {
        Cantidad_Contador = 0;
        Contador.innerText = Cantidad_Contador;
        Contador.style.color = "var(--color-positivo)";
    });
}

function Cronometro() {
    var Iniciar = document.getElementById("start");
    var Detener = document.getElementById("stop");
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("minutes");
    var seconds = document.getElementById("seconds");
    var Reset = document.getElementById("reset");
    var crono = document.getElementById("crono");

    var cronometro = null;
    var h = 0;
    var m = 0;
    var s = 0;

    Detener.disabled = true;
    //Gestionar el inicio del cronometro
    Iniciar.addEventListener("click", function() {
        Iniciar.disabled = true;
        Detener.disabled = false;
        h = 0;
        m = 0;
        s = 0;
        crono.style.color = "var(--ContadorPositivo)";
        cronometro = setInterval(() => {
            s++;
            seconds.innerText = s;
            if(s === 60){
                s = 0;
                m++;
                minutes.innerText = m;
            }
            else if(m === 60){
                m = 0;
                h++;
                hours.innerText = h;
            }
        }, 1000);
    });
    
    //Gestionar el detención del cronometro
    Detener.addEventListener("click", function() {
        if(Detener.innerText === "Detener") 
        {
            crono.style.color = "var(--CronometroPausado)";
            Iniciar.disabled = true;
            clearInterval(cronometro);
            Detener.innerText = "Reanudar";
        }
        else 
        {
            crono.style.color = "var(--ContadorPositivo)";
            Iniciar.disabled = true;
            cronometro = setInterval(() => {
                s++;
                seconds.innerText = s;
                if(s === 60){
                    s = 0;
                    m++;
                    minutes.innerText = m;
                }

                if(m === 60){
                    m = 0;
                    h++;
                    hours.innerText = h;
                }
            }, 1000);
            Detener.innerText = "Detener";
        }
    });

    //Gestionar el reseteo del cronometro
    Reset.addEventListener("click", function() {
        h = 0;
        m = 0;
        s = 0;
        hours.innerText = "00";
        minutes.innerText = "00";
        seconds.innerText = "00";
        Detener.innerText = "Detener";
        clearInterval(cronometro);
        Iniciar.disabled = false;
        crono.style.color = "var(--color-positivo)";
    });
}

function Reloj () {
    var Day = document.getElementById("day");
    var Today = document.getElementById("date");
    var Hour = document.getElementById("hour");
    var Minute = document.getElementById("minute");
    var Second = document.getElementById("second");

    //Gestionar lenguaje local
    var userLang = navigator.language || 'es-ES';
    
    //Gestion de reloj
    setInterval(() => {
        actualizarReloj(Day,Today,Hour,Minute,Second,userLang);
    },1000);
}

function actualizarReloj(Day,Today,Hour,Minute,Second,userLang) {
    var date = new Date();
    var DayName = date.toLocaleDateString(userLang, { weekday: 'long' });
    var TodayFormatted = date.toLocaleDateString(userLang);

    //Gestion de tiempo actual
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');

    Day.innerText = DayName;
    Today.innerText = TodayFormatted;
    Hour.innerText = hours;
    Minute.innerText = minutes;
    Second.innerText = seconds;
}
