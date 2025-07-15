const malla = [
  {
    semestre: "1° Semestre",
    ramos: [
      { nombre: "Biología Celular" },
      { nombre: "Bases de la Comunicación Humana" },
      { nombre: "Habilidades Comunicativas" }
    ]
  },
  {
    semestre: "2° Semestre",
    ramos: [
      { nombre: "Fonética, Fonología y Morfosintaxis", prerequisitos: ["Bases de la Comunicación Humana"] },
      { nombre: "Psicología Aplicada a la Salud" }
    ]
  }
];

// Cargar aprobados desde localStorage (si existe)
const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados")) || []);

const container = document.getElementById("malla-container");

function renderMalla() {
  container.innerHTML = "";

  malla.forEach((sem) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h3>${sem.semestre}</h3>`;

    sem.ramos.forEach((ramo) => {
      const btn = document.createElement("div");
      btn.className = "ramo";

      const prereq = ramo.prerequisitos || [];
      const bloqueado = prereq.some(p => !aprobados.has(p));
      if (bloqueado) {
        btn.classList.add("bloqueado");
      }

      if (aprobados.has(ramo.nombre)) {
        btn.classList.add("aprobado");
      }

      btn.textContent = ramo.nombre;

      if (!bloqueado) {
        btn.onclick = () => {
          if (aprobados.has(ramo.nombre)) {
            aprobados.delete(ramo.nombre);
          } else {
            aprobados.add(ramo.nombre);
          }
          localStorage.setItem("aprobados", JSON.stringify(Array.from(aprobados)));
          renderMalla();
        };
      }

      semDiv.appendChild(btn);
    });

    container.appendChild(semDiv);
  });
}

renderMalla();
