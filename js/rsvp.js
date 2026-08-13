let rsvpPasoActual = 1;
let rsvpAsistencia = null;
let rsvpBoletosSeleccionados = 1;
let rsvpImagenBase64 = null;

function initRsvp() {
  const btnAbrir = document.getElementById("rsvp-abrir");
  const btnCerrar = document.getElementById("rsvp-cerrar");
  const modal = document.getElementById("rsvp-modal");
  const nombreInvitado = document.getElementById("rsvp-nombre-invitado");
  const opciones = document.querySelectorAll(".rsvp-opcion");
  const selectBoletos = document.getElementById("rsvp-boletos");
  const btnSiguiente = document.getElementById("rsvp-siguiente");
  const btnAtras = document.getElementById("rsvp-atras");
  const btnEnviar = document.getElementById("rsvp-enviar");
  const nav = document.getElementById("rsvp-nav");

  nombreInvitado.textContent = invitadoData ? invitadoData.nombre : "";

  for (
    let i = 1;
    i <= (invitadoData ? invitadoData.boletosAsignados : 1);
    i++
  ) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i === 1 ? "1 persona" : `${i} personas`;
    selectBoletos.appendChild(opt);
  }

  function abrirModal() {
    modal.classList.add("rsvp-modal-activo");
    irAPaso(1);
  }

  function cerrarModal() {
    modal.classList.remove("rsvp-modal-activo");
  }

  function irAPaso(numero) {
    const pasoAnterior = document.querySelector(".rsvp-paso.rsvp-paso-activo");
    const pasoNuevo = document.querySelector(
      `.rsvp-paso[data-paso="${numero}"]`,
    );
    const direccion =
      numero === "exito" ||
      (typeof numero === "number" &&
        typeof rsvpPasoActual === "number" &&
        numero > rsvpPasoActual)
        ? 1
        : -1;

    rsvpPasoActual = numero;

    if (pasoAnterior && pasoAnterior !== pasoNuevo) {
      gsap.to(pasoAnterior, {
        opacity: 0,
        x: -20 * direccion,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          pasoAnterior.classList.remove("rsvp-paso-activo");
          mostrarPasoNuevo();
        },
      });
    } else {
      mostrarPasoNuevo();
    }

    function mostrarPasoNuevo() {
      pasoNuevo.classList.add("rsvp-paso-activo");
      gsap.fromTo(
        pasoNuevo,
        {
          opacity: 0,
          x: 20 * direccion,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
        },
      );
    }

    document.querySelectorAll(".rsvp-dot").forEach((d) => {
      d.classList.toggle("activo", parseInt(d.dataset.paso) === numero);
    });

    btnAtras.disabled = numero === 1;
    nav.classList.toggle("rsvp-nav-oculto", numero === 4 || numero === "exito");

    if (numero === 1 && rsvpAsistencia === "No") {
      btnSiguiente.textContent = "Enviar";
    } else {
      btnSiguiente.textContent = "Siguiente";
    }
  }

  opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => {
      opciones.forEach((o) => o.classList.remove("seleccionado"));
      opcion.classList.add("seleccionado");
      rsvpAsistencia = opcion.dataset.asistencia;
      btnSiguiente.textContent =
        rsvpAsistencia === "No" ? "Enviar" : "Siguiente";
    });
  });

  function generarAcompanantes(cantidad) {
    const contenedor = document.getElementById("rsvp-acompanantes");
    contenedor.innerHTML = "";
    const numAcompanantes = Math.min(cantidad - 1, 3);

    for (let i = 1; i <= numAcompanantes; i++) {
      const campo = document.createElement("div");
      campo.className = "rsvp-campo";
      campo.innerHTML = `
                <label class="rsvp-label">Acompañante ${i}</label>
                <input type="text" class="rsvp-input rsvp-acompanante" placeholder="Nombre completo">
            `;
      contenedor.appendChild(campo);
    }
  }

  selectBoletos.addEventListener("change", () => {
    rsvpBoletosSeleccionados = parseInt(selectBoletos.value);
    generarAcompanantes(rsvpBoletosSeleccionados);
  });

  function construirResumen() {
    const resumen = document.getElementById("rsvp-resumen");
    const telefono = document.getElementById("rsvp-telefono").value;
    const dedicatoria = document.getElementById("rsvp-dedicatoria").value;
    const cancion = document.getElementById("rsvp-cancion").value;

    let html = `
            <div class="rsvp-resumen-linea"><span>Asistencia</span><span>${rsvpAsistencia === "Sí" ? "Confirmada" : "No podrá asistir"}</span></div>
        `;

    if (rsvpAsistencia === "Sí") {
      html += `
                <div class="rsvp-resumen-linea"><span>Boletos</span><span>${rsvpBoletosSeleccionados}</span></div>
                <div class="rsvp-resumen-linea"><span>Teléfono</span><span>${telefono || "—"}</span></div>
                <div class="rsvp-resumen-linea"><span>Dedicatoria</span><span>${dedicatoria || "—"}</span></div>
                <div class="rsvp-resumen-linea"><span>Canción</span><span>${cancion || "—"}</span></div>
            `;
    }

    resumen.innerHTML = html;
  }

  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function verificarConfirmacionReal(token, intentos = 5) {
    for (let i = 0; i < intentos; i++) {
      await esperar(1200);
      try {
        const res = await fetch(
          `${API_URL}?action=getInvitado&token=${token}&key=${API_KEY_PUBLIC}&_=${Date.now()}`,
          {
            cache: "no-store",
          },
        );
        const resultado = await res.json();
        if (
          resultado.ok &&
          (resultado.data.estado === "Confirmado" ||
            resultado.data.estado === "Declinó")
        ) {
          return true;
        }
      } catch (e) {
        // seguimos intentando
      }
    }
    return false;
  }

  const inputFoto = document.getElementById("rsvp-foto");
  const previewFoto = document.getElementById("rsvp-file-preview");
  const labelFoto = document.getElementById("rsvp-file-label");

  inputFoto.addEventListener("change", () => {
    const archivo = inputFoto.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const anchoMax = 1200;
        const escala = Math.min(1, anchoMax / img.width);
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        rsvpImagenBase64 = dataUrl.split(",")[1];
        previewFoto.src = dataUrl;
        previewFoto.hidden = false;
        labelFoto.textContent = "Cambiar foto";
      };
      img.src = e.target.result;
    };
    lector.readAsDataURL(archivo);
  });

  async function enviarRsvp() {
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    const acompanantesInputs = document.querySelectorAll(".rsvp-acompanante");
    const acompanantes = Array.from(acompanantesInputs).map(
      (input) => input.value,
    );

    const token = getTokenFromURL();
    const body = {
      key: API_KEY_PUBLIC,
      action: "confirmarRSVP",
      token: token,
      telefono: document.getElementById("rsvp-telefono").value,
      asistencia: rsvpAsistencia,
      boletos: rsvpAsistencia === "Sí" ? rsvpBoletosSeleccionados : 0,
      acompanantes: acompanantes,
      dedicatoria: document.getElementById("rsvp-dedicatoria").value,
      cancion: document.getElementById("rsvp-cancion").value,
      imagenBase64: rsvpImagenBase64,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(body),
      });

      document.getElementById("rsvp-exito-texto").textContent =
        rsvpAsistencia === "Sí"
          ? "Tu asistencia ha sido confirmada. ¡Nos vemos el 4 de diciembre!"
          : "Gracias por avisarnos. Te extrañaremos ese día.";
      irAPaso("exito");

      verificarConfirmacionReal(token, 5).then((confirmado) => {
        if (!confirmado) {
          console.warn(
            "No se pudo verificar la confirmación automáticamente, pero la petición se envió sin errores de red.",
          );
        }
      });
    } catch (error) {
      alert(
        "No se pudo enviar tu confirmación. Verifica tu conexión e intenta de nuevo.",
      );
      btnEnviar.disabled = false;
      btnEnviar.textContent = "Confirmar";
    }
  }

  btnSiguiente.addEventListener("click", () => {
    if (rsvpPasoActual === 1) {
      if (!rsvpAsistencia) return;
      if (rsvpAsistencia === "No") {
        enviarRsvp();
        return;
      }
      generarAcompanantes(rsvpBoletosSeleccionados);
      irAPaso(2);
    } else if (rsvpPasoActual === 2) {
      irAPaso(3);
    } else if (rsvpPasoActual === 3) {
      construirResumen();
      irAPaso(4);
    }
  });

  btnAtras.addEventListener("click", () => {
    if (typeof rsvpPasoActual === "number" && rsvpPasoActual > 1)
      irAPaso(rsvpPasoActual - 1);
  });

  btnEnviar.addEventListener("click", enviarRsvp);

  btnAbrir.addEventListener("click", abrirModal);
  btnCerrar.addEventListener("click", cerrarModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  gsap.to(".rsvp-marco", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#rsvp",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });
}

function revealRsvp() {
  const rsvp = document.getElementById("rsvp");
  rsvp.classList.add("rsvp-visible");
  initRsvp();
  initFooter();
}
