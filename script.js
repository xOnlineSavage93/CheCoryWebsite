document.getElementById("year").textContent = new Date().getFullYear();

const currentUrl = window.location.href.split("#")[0];
const qrUrlText = document.getElementById("qr-url");
const qrContainer = document.getElementById("qrcode");
const downloadButton = document.getElementById("download-qr");

qrUrlText.textContent = currentUrl;

if (typeof QRCode !== "undefined") {
  new QRCode(qrContainer, {
    text: currentUrl,
    width: 230,
    height: 230,
    correctLevel: QRCode.CorrectLevel.H
  });
} else {
  qrContainer.innerHTML = "<p>QR code could not load. Check your internet connection.</p>";
}

downloadButton.addEventListener("click", () => {
  const canvas = qrContainer.querySelector("canvas");
  const image = qrContainer.querySelector("img");
  let imageUrl = "";

  if (canvas) {
    imageUrl = canvas.toDataURL("image/png");
  } else if (image) {
    imageUrl = image.src;
  }

  if (!imageUrl) {
    alert("The QR code is not ready yet.");
    return;
  }

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "che-cory-qr-code.png";
  link.click();
});
