const fs = require("fs");

const genres = JSON.parse(fs.readFileSync("./dev-data/data.js"));

exports.getAllGenres=(req, res) => {
    return res.status(200).json({
        status: "success",
        results: genres.length,
        data: {
            genres,
        },
    });
}



exports.getGenres=(req, res) => {
    const id = req.params.id*1;

    const genre = genres.find((el) => el.id === id);

    if (id > genres.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
    }

    res.status(200).json({
        status: "success",

        data: {
            genre,
        },
    });
}

exports.createGenres=(req, res) => {
    const newId = genres.length + 1;
    console.log(newId);

    const newGenre = Object.assign({ id: newId }, req.body);

    genres.push(newGenre);
    if (!req.body.title) {
        res.status(400).json({
            status: "fail",
            message: "title is required",
        });
    }
    if (!req.body.genres) {
        res.status(400).json({
            status: "fail",
            message: "genres is required",
        });
    }
    fs.writeFile("./dev-data/data.js", JSON.stringify(genres), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                genres: newGenre,
            },
        });
    });
}

exports.updateGenres=(req, res) => {
    const id = req.params.id*1;
    const genre = genres.find((el) => el.id === id);

    if (parseInt(id) > genres.length) {
        res.status(400).json({
            status: "fail",
            message: "Invalid ID",
        });
    }
    if (req.body.title) {
        genre.title = req.body.title;
    }

    if (req.body.genres) {
        genre.genres = req.body.genres;
    }
    res.status(200).json({
        status: "success",
        data: {
            genre,
        },
    });
}

exports.deleteGenres=(req, res) => {
    const id = req.params.id * 1;
    const genreIndex = genres.findIndex((el) => el.id === id);

    if (genreIndex === -1) {
        
        return res.status(404).json({
            status: 'fail',
            message: 'Genre not found',
        });
    }

    
    genres.splice(genreIndex, 1);

    fs.writeFile('./dev-data/data.js', JSON.stringify(genres), (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error deleting genre',
            });
        }

        return res.status(204).json({
            status: 'success',
            data: null,
        });
    });
}