const app = require('./src/app');
const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server start port:${PORT}... `);
});