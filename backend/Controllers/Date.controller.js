const db = require('../Models/db_connection');

// var t1 = '2010';
// var t2 = 'Spring';

function DateTime() {
    return new Promise((resolve, reject) => {



        db.query('SELECT * FROM reg_dates order by start_time desc ;', (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            // console.log(result.rows);
            if (result.rows.length > 0) {
                var i = 0;
                var dateObj = Date.now();

                for (i = 0; i < result.rows.length; i++) {

                    console.log(result.rows[i].start_time)
                    if (dateObj >= Date.parse(result.rows[i].start_time)) {
                        break;
                    }
                }

                console.log(i);
                const semester = result.rows[i].semester;
                const year = result.rows[i].year;
                t1 = year;
                t2 = semester;
                console.log(semester + " " + year);
                resolve({ semester, year });
            }
        });
    });

}

// db.query('SELECT * FROM reg_dates order by start_time desc ', (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     // console.log(result.rows);
//     if (result.rows.length > 0) {
//         const semester = result.rows[0].semester;
//         const year = result.rows[0].year;
//         console.log(t1 + ' ' + t2);
//     }
// });

// console.log('in date controller: ' + t1 + ' ' + t2);



module.exports = {
    DateTime
}

