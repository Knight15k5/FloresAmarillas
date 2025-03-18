document.addEventListener("DOMContentLoaded", function() {
    const sonido = document.getElementById("sonidoFlorecer");

    document.body.addEventListener("click", function iniciarAudio() {
        sonido.play().catch((err) => console.log("Error al reproducir audio:", err));
        // Quitar el listener para que no se reproduzca en cada clic
        document.body.removeEventListener("click", iniciarAudio);
    });

    function crearFlor(x, y, esAmarilla = false) {
        const flor = document.createElement("img");
        flor.src = "flor.svg";
        flor.classList.add("flor");
        if (esAmarilla) flor.classList.add("flor-amarilla");

        flor.style.left = `${x}vw`;
        flor.style.bottom = `${y}vw`;
        flor.style.animationDelay = `${Math.random() * 3}s`;

        document.body.appendChild(flor);
        sonido.play();
    }

    // Ajustamos la posición de las flores según el ancho de pantalla
    let posicionesFlores;
    const anchoPantalla = window.innerWidth;
    if (anchoPantalla < 600) {
        posicionesFlores = [
            { x: 5, y: 10 }, { x: 20, y: 12 }, { x: 75, y: 10 }, { x: 90, y: 8 }
        ];
    } else {
        posicionesFlores = [
            { x: 10, y: 5 }, { x: 20, y: 8 }, { x: 80, y: 7 }, { x: 90, y: 6 }
        ];
    }

    // Crear flores laterales
    posicionesFlores.forEach(pos => crearFlor(pos.x, pos.y));

    function crearPetalo(x, y) {
        const petalo = document.createElement("img");
        petalo.src = "petalo.svg";
        petalo.classList.add("petalo");

        petalo.style.left = `${x}%`;
        petalo.style.top = `${y}%`;
        petalo.style.animationDelay = `${Math.random() * 3}s`;

        document.body.appendChild(petalo);
    }

    // 🌻 Flores amarillas en el centro, separadas:
    setTimeout(() => {
        crearFlor(12, 5, true); // Más a la izquierda
        crearFlor(37, 6, true); // Centro
    }, 1000);

    // 🌸 Pétalos flotando
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            crearPetalo(Math.random() * 100, Math.random() * 50);
        }, i * 500);
    }

    const mensajes = [
        "En este día importante para ti",
        "Quisiera entregarte estas flores amarillas",
        "Estas flores son muy especiales ya que nunca marchitan",
        "Espero las valores y aprecies",
        "Ya que fueron hechas con mucho cariño",
        "Para ti <3",
        "PDS: Cuando te sientas abrumada,",
        "Escucha esta canción para relajarte :3",
        "Te quiero mucho !",
        ""
    ];

    // Elemento en el HTML donde se mostrará el mensaje
    const mensajeElemento = document.querySelector(".mensaje");
    let indiceMensaje = 0;

    // Función para mostrar cada mensaje por 3 segundos y luego pasar al siguiente
    function mostrarMensaje() {
        // Mostrar el mensaje actual
        mensajeElemento.textContent = mensajes[indiceMensaje];
        mensajeElemento.classList.add("visible");  // La clase 'visible' se encargará de hacer fade-in (definido en CSS)

        // Después de 3 segundos, ocultar el mensaje y pasar al siguiente
        setTimeout(() => {
            mensajeElemento.classList.remove("visible"); // Se activa el fade-out
            indiceMensaje++;
            if (indiceMensaje < mensajes.length) {
                // Esperamos un pequeño retraso (por ejemplo, 500ms) y mostramos el siguiente mensaje
                setTimeout(mostrarMensaje, 2000);
            }
        }, 3000);
    }

    // Iniciar la secuencia de mensajes
    mostrarMensaje();
});
