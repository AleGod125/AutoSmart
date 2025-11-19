let iframe = document.getElementById('dashboardFrame');   
const container = document.getElementById('person');
const btnPerson = document.getElementById('btnperson');
const btnLoguin = document.getElementById('btnLoguin');
const btnSingup = document.getElementById('btnSingup');
const btnhome = document.getElementById('btnhome');


let currentResizeObserver = null;
let currentObservedBody = null;

function ajusteIframe(url) {

  if (currentResizeObserver) {
    try { currentResizeObserver.disconnect(); } catch {}
    currentResizeObserver = null;
  }

  if (currentObservedBody) {
    try { currentResizeObserver?.unobserve(currentObservedBody); } catch {}
    currentObservedBody = null;
  }

  const newIframe = iframe.cloneNode(true);
  iframe.replaceWith(newIframe);
  iframe = newIframe;

  iframe.src = url;

  iframe.addEventListener("load", () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) {
        iframe.style.height = "600px";
        return;
      }

      const ajustarAltura = () => {
        requestAnimationFrame(() => {
          const body = doc.body;
          const html = doc.documentElement;

          const altura = Math.max(
            body?.scrollHeight || 0,
            html?.scrollHeight || 0
          );

          iframe.style.height = Math.max(altura, 400) + "px";
        });
      };

      ajustarAltura();

      currentResizeObserver = new ResizeObserver(ajustarAltura);
      currentObservedBody = doc.body;
      currentResizeObserver.observe(currentObservedBody);

    } catch {
      iframe.style.height = "600px";
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  
  iframe.addEventListener("load", () => ajusteIframe(iframe.src));


    btnLoguin.addEventListener('click', () => ajusteIframe("UI/loguin/loguin.html"));
    btnSingup.addEventListener('click', () => ajusteIframe("Regis/regis.html"));
    btnhome.addEventListener('click', () => ajusteIframe("UI/dasboard/dasboard.html"));
});

btnPerson.addEventListener('click', () => {
  container.style.display =
    container.style.display === 'none' || container.style.display === ''
      ? 'flex'
      : 'none';
});
