const Dragon = require("./dragon");

const fooey = new Dragon({
  birthdate: new Date(),
  nickname: "fooey",
});
const baloo = new Dragon({
  birthdate: new Date(),
  nickname: "baloo",
});
const mimar = new Dragon({});

setTimeout(() => {
  const gooby = new Dragon({});
  console.table({
    gooby,
  });
}, 1500);

console.table({
  fooey,
  baloo,
  mimar,
});
