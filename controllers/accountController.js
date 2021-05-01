const account = require("../models/account");
const task = require("../models/task");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;



//get requests

exports.index_get = async (req, res) => {
    const cookie = req.cookies.user;
    let data = await task.model.findAll({
        
        where: {
            code: cookie
            
        }
        
    });
    res.locals.tasks = data;
    res.render('index');

}

exports.login_get = (req, res)=>{
    res.render('login');
}

exports.register_get = (req,res)=>{
    res.render('register');
}

exports.create_get = (req,res)=>{
    res.render('create');
}

exports.logout_get = (req,res) =>{
    res.cookie('user', '', {maxAge: 1});
    res.redirect('/');
}

//end of get requests

exports.register_post = async (req, res) => {

    if(req.body.password === req.body.confirmpassword){

    //encryption of password
    var salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    //end of encryption
 
    req.body.code = generateCode(); //I think the code is cookies

    let data = await account.model.create(
        req.body
    )
    
    res.cookie('user', req.body.code, {httpOnly: true, maxAge: maxAge*1000});
    console.log(data);
    res.redirect('/');

    }

}

exports.login_post = async(req,res) => {
    let data = await account.model.findOne({
        where: {
            username: req.body.username
        },
        raw: true
    });

    if (bcrypt.compareSync(req.body.password, data.password) && data.password != ""){
        res.cookie('user', data.code, {httpOnly: true, maxAge: maxAge*1000});
        console.log(data);
        res.redirect("/");
    }else{
        res.send({code: 400});
    }

    console.log(data)
}

exports.create_post = async (req, res) => {

    req.body.code = req.cookies.user;

    if(req.body.code){
        console.log(req.body);
        const data = await task.model.create(
            req.body
        )
        console.log(data);
    }

    
    res.redirect('/');

    

}


exports.deleteTask = async (req,res) => {
    let data = await task.model.destroy({
        where: {
            id: req.params.id
        }
    })

    console.log(data);
    res.redirect('/');
}



//additional code (No use yet)
exports.readAccount = async (req,res) => {
    let data = await account.model.findByPk(
        req.body.id,
        {raw :true} //passes just the raw data
    )

   res.send(data);
}

exports.updateAccount = async (req, res)=>{
    let data = await account.model.update(
        {password: "P@SSW0RD"},

        {
            where: {
                id: req.body.id
            }
        }
    )

    res.send(data)
}

exports.deleteAccount = async (req,res) => {
    let data = await account.model.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send({value:data});
}
//additional Code (no use yet)





//middleware functions
generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}