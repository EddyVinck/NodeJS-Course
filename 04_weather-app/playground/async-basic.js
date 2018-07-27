console.log("Starting app");

setTimeout(() => {
  console.log("delayed");
}, 1000);

setTimeout(() => {
  console.log("Second callback (0ms)");
}, 0);

console.log("Finishing up");
