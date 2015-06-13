// GET /author

exports.creditos = function(req, res){
    res.render('author', {title: 'Quiz', nameAuthor: 'Marcos Navarro', photo: '/images/photo.png', video: ''});
};
