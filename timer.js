const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const { draw } = require("./stream.js");
const { PassThrough } = require("stream");
const stream = new PassThrough({ allowHalfOpen: false });

function update(time) {
  const difference = dayjs.duration(dayjs().diff(time));
  const canvasStream = draw(difference);

  stream.on("data", (data) => {
    console.log(data);
  });

  canvasStream.on("data", (data) => {
    console.log("data");
    stream.write(data);
  });

  canvasStream.on("close", () => {
    console.log("closed");
    setTimeout(() => {
      update(time);
    }, 1000);
  });
}

const startTimer = (target) => {
  let time;
  if (!target) {
    time = dayjs();
    time.add(1, "day");
  } else {
    time = dayjs(target).format("YYYY-MM-DDTHH:mm:ss");
  }
  update(time);
};

module.exports = { stream, startTimer };
