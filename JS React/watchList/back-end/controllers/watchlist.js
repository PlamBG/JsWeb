const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const author = req.query.author
        if (author) {
            models.Watchlist.find({ author: author })
                .then((watchlist) => {
                    res.send(watchlist);
                })
                .catch(next);
        } else {
            models.Watchlist.find()
                .then((watchlists) => {
                    res.send(watchlists);
                })
                .catch(next);
        }
    },

    post: (req, res, next) => {
        const { description, title } = req.body;
        const { _id } = req.user;
        if(req.user.haveList){
            res.send('User already have a watchlist');
        }else{
            updateUser(_id);
            models.Watchlist.create({ description, title, author: _id })
            .then((createdWatchlist) => {
                res.send(createdWatchlist);
            })
            .catch(next);

        }
    },

    put: (req, res, next) => {
        const id = req.params.id; // watchlist id 
        const newMovie = req.body; // req.body=movie data
        newMovie.length? models.Watchlist.findByIdAndUpdate({ _id: id }, { movies: newMovie  },{new: true})
        .then((updatedMovies) => res.send(updatedMovies))
        .catch(next) 
        : models.Watchlist.findByIdAndUpdate({ _id: id }, { '$push': { movies: newMovie } },{new: true})
        .then((updatedMovies) => res.send(updatedMovies))
        .catch(next) ;

    }

    // delete: (req, res, next) => {
    //     const id = req.params.id;
    //     models.Movie.deleteOne({ _id: id })
    //         .then((removedMovie) => res.send(removedMovie))
    //         .catch(next)
    // }
};

const updateUser=(_id)=>{
    console.log('updatinggggggg')
    models.User.findByIdAndUpdate({_id:_id},{haveList:true}).then((res)=>{
        return res;
    });

}