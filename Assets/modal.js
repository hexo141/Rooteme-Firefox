function customAlert(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = '<div class="modal-card"><div class="modal-msg">' + String(message).replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</div><div class="modal-btns"><button class="modal-btn modal-btn-primary" id="modal-ok">确定</button></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector("#modal-ok").onclick = () => { closeOverlay(overlay, () => resolve()); };
  });
}
function customConfirm(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = '<div class="modal-card"><div class="modal-msg">' + String(message).replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</div><div class="modal-btns"><button class="modal-btn" id="modal-cancel">取消</button><button class="modal-btn modal-btn-primary" id="modal-ok">确定</button></div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector("#modal-ok").onclick = () => { closeOverlay(overlay, () => resolve(true)); };
    overlay.querySelector("#modal-cancel").onclick = () => { closeOverlay(overlay, () => resolve(false)); };
  });
}
function customVersionSelect(message, options) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    let btnsHtml = "";
    const btnIds = [];
    options.forEach((opt, i) => {
      const id = "modal-opt-" + i;
      btnIds.push({ id, value: opt.value });
      btnsHtml += '<button class="modal-btn modal-btn-primary" style="width:100%" id="' + id + '">' + String(opt.label).replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</button>';
    });
    overlay.innerHTML = '<div class="modal-card"><div class="modal-msg">' + String(message).replace(/</g,"&lt;").replace(/>/g,"&gt;") + '</div><div class="modal-btns" style="flex-direction:column">' + btnsHtml + '</div></div>';
    document.body.appendChild(overlay);
    btnIds.forEach(({ id, value }) => {
      overlay.querySelector("#" + id).onclick = () => { closeOverlay(overlay, () => resolve(value)); };
    });
  });
}
function closeOverlay(overlay, cb) {
  overlay.style.animation = "modalFadeOut 0.2s ease forwards";
  const card = overlay.querySelector(".modal-card");
  if (card) card.style.animation = "modalSlideOut 0.2s ease forwards";
  setTimeout(() => { overlay.remove(); if (cb) cb(); }, 200);
}