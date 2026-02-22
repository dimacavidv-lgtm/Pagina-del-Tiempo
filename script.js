

const apiKey = 'b772fff849dd056c918a5fd7da962449'; 

// elementos de busqueda
const section = document.querySelector('#tiempo');
const button = document.getElementById('button'); 
const input = section.querySelector('input');

// Elemento de detalles clima
const sectionResultado = document.querySelector('#resultado');
const lugarGrado = document.getElementById('lugar-grado');
const humedad = document.getElementById('humedad');
const iconoHumedad = document.getElementById('icono-humedad');
const viento = document.getElementById('viento');
const iconoViento = document.getElementById('icono-viento');
const descripcion = document.getElementById('descripcion');
const icono = document.getElementById('icono-clima');

// Al iniciar la página, el mensaje de error está oculto
document.getElementById('error').style.display = 'none';

// Cuando el usuario hace click en el botón busca en la API el clima de la ciudad ingresada
button.addEventListener('click', () => {

    let ciudad = input.value.trim();

    if (input.value.trim() === '') {
        document.getElementById('error').style.display = 'block';
        sectionResultado.style.display = 'none';
        return;
    }
    document.getElementById('error').style.display = 'none';

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${ciudad}&appid=${apiKey}`;
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new document.getElementById('error').style.display = 'block';
        }
        return response.json();
    })
    .then(data => {
        sectionResultado.style.display = 'block';

        lugarGrado.textContent = `Temperatura en ${data.name.replace(/Province of /gi, "")}:  ${data.main.temp.toFixed(0)}°C`;
        humedad.textContent = `Humedad: ${data.main.humidity}%`;
        viento.textContent = `Viento: ${(data.wind.speed*3.6).toFixed(1)} km/h`;
        descripcion.textContent = `Clima: ${data.weather[0].description}`;
        switch (data.weather[0].description.toLowerCase()) {
                case 'clear sky':
                    icono.src = 'img/sun_15817544.png';
                    break;
                case 'few clouds':
                    icono.src = 'img/cloudy_4234997.png';
                    break;
                case 'rain':
                    icono.src = 'img/rain_3935284.png';
                    break;
                case 'thunderstorm':
                    icono.src = 'img/storm_2288801.png';
                    break;
                case 'snow':
                    icono.src = 'img/nevando.png';
                    break;
                case 'mist':
                    icono.src = 'img/fog_7774324.png';
                    break;
                default:
        }
        if (data.main.humidity > 0) {
            iconoHumedad.src = 'img/humedad.png';
        }
        if ((data.wind.speed*3.6).toFixed(1) > 7) {
            iconoViento.src = 'img/viento.png';
        }


        console.log("Datos recibidos:", data);
        console.log(`Temperatura en ${data.name.replace(/Province of /gi, "")}: ${data.main.temp}°C`);
        console.log(`Clima: ${data.weather[0].description}`);
        console.log(`Humedad: ${data.main.humidity}%`);
        console.log(`Viento: ${(data.wind.speed*3.6).toFixed(1)} km/h`);
        console.log(`Icono: http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        console.log(`Latitud: ${data.coord.lat}, Longitud: ${data.coord.lon}`);
        console.log(`País: ${data.sys.country}`);
    })
    .catch(error => {
        // Si algo falla (red, ciudad no encontrada, etc.), cae aquí
        document.getElementById('error').style.display = 'block';
        sectionResultado.style.display = 'none';
    });

});


 
  