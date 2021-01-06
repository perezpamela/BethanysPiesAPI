let fs = require('fs');
const FILE_NAME = './assets/pies.json';

let pieRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    }, //fin de método get()
    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pie = JSON.parse(data).find(p=> p.id=id);
                resolve(pie);
            }
        })

    }, //fin de método getById()
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                //Perform search
                if(searchObject){
                    //Example search object
                    //let searchObject = {
                    //  "id":1,
                    //  "name":"A"
                    // };
                pies = pies.filter(
                    p => (searchObject.id ? p.id == searchObject.id : true) && 
                    (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name)>=0 : true)
                );
                resolve(pies);
                }
            }
        });
    }, //fin de método search()
    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                pies.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                    if(err){
                        reject(err);
                    } 
                    else {
                        resolve(newData);
                    }
                });//Fin fs.writeFile()
            }
        }); //fin de fs.readfile()

    },//fin de método insert()
    update: function(newData, id, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                let pie = pies.find(p => p.id == id);
                if(pie){
                    Object.assign(pie, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(newData);
                        }
                    });
                }
            }
        }

        );//fin readfile()
    },//fin del método update()
    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err,data){
            if(err){
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                let index = pies.findIndex(p=> p.id==id);
                if(index!=-1){
                    pies.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(index);
                        }
                    });
                }
            }
        });
    }//fin del método delete()
};

module.exports = pieRepo;