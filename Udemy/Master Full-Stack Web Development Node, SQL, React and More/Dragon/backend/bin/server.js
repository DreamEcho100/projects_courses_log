const app = require("../app/index");

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port localhost:${PORT}`));
