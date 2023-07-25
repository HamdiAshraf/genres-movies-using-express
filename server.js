
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`We are now listening to port ${port}`);
});
