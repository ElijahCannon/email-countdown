// Creates ReadableStream that emits PNG-encoded data.

const { createCanvas } = require("canvas");

function pad(num) {
  const text = num.toString().substr(1);
  if (Number(text) < 10) {
    if (Number(text) < 1) return "00";
    return "0" + text;
  }
  return text;
}

const draw = (difference) => {
  console.log(
    pad(difference.days()) +
      ":" +
      pad(difference.hours()) +
      ":" +
      pad(difference.minutes()) +
      ":" +
      pad(difference.seconds())
  );

  const canvas = createCanvas(580, 120);
  const ctx = canvas.getContext("2d");
  ctx.font = "26px Impact";
  ctx.strokeStyle = "rgba(0,0,0,0.5)";

  ctx.beginPath();
  ctx.fillText("Days", 50, 105);
  ctx.fillText("Hours", 180, 105);
  ctx.fillText("Minutes", 310, 105);
  ctx.fillText("Seconds", 445, 105);

  ctx.font = "bold 84px Impact";
  // Days
  ctx.fillText(pad(difference.days()), 30, 75);
  ctx.fillText(":", 130, 70);
  // Hours
  ctx.fillText(pad(difference.hours()), 170, 75);
  ctx.fillText(":", 270, 70);
  // Minutes
  ctx.fillText(pad(difference.minutes()), 310, 75);
  ctx.fillText(":", 410, 70);
  // Seconds
  ctx.fillText(pad(difference.seconds()), 450, 75);
  return canvas.createPNGStream({
    quality: 0.75,
    compressionLevel: 6,
  });
};

module.exports = { draw };
