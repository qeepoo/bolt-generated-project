import Quagga from 'quagga2';

const video = document.getElementById('camera');
const resultDiv = document.getElementById('result');

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: video,
    constraints: {
      facingMode: "environment"
    }
  },
  decoder: {
    readers: ["code_128_reader", "ean_reader", "upc_reader"]
  }
}, function(err) {
  if (err) {
    console.error(err);
    resultDiv.textContent = "Error initializing scanner";
    return;
  }
  Quagga.start();
});

Quagga.onDetected((data) => {
  const code = data.codeResult.code;
  resultDiv.textContent = `Scanned: ${code}`;
});
