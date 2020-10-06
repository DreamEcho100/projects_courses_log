const Dragon = require("./dragon");

const fooey = new Dragon({
  birthdate: new Date(),
  nickname: "fooey",
});
const baloo = new Dragon({
  birthdate: new Date(),
  nickname: "baloo",
  traits: [{ traitType: "backgroundColor", traitValue: "green" }],
});
const mimar = new Dragon({});

setTimeout(() => {
  const gooby = new Dragon({});
  // console.table({
  //   gooby,
  // });
  // console.table(gooby.traits.map((i) => i));
}, 1500);

console.table({
  fooey,
  baloo,
  mimar,
});

// console.table(fooey.traits.map((i) => i));
// console.table(baloo.traits.map((i) => i));
// console.table(mimar.traits.map((i) => i));
