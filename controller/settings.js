const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./sqliteDB/settings.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the settings database.');
  });

export async function all(req, res) {
    try{
        res.status(200).json({
            "maxPercentageLoadDrop" : 30
        });
    }catch(err){
        console.log('error occured: '+err);
        res.status(500).json({
            statusCode: 500,
            message: 'error occured: '+err
        });
    }
}

