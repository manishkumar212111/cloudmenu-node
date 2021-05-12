var cron = require('node-cron');
const moment = require('moment')
const User = require("../models/user.model")

const removeInActiveUser = () => {
    // cron.schedule('0 0 0 * * *', () => {
    //     console.log('It will run cron every night');
    //     // perform user action
    //   });

    // cron.schedule('* * * * * * *', async () => {
    //     console.log('It will run cron every seconds');
    //     // perform user action
    //     // console.log(moment().subtract(36, 'months').toISOString())
    //     let dayThreeYearsBack = moment().subtract(36, 'months').toISOString();
    //     try {
    //         await User.deleteMany( { last_action :  { "$lte" : dayThreeYearsBack } } );
    //      } catch (e) {
    //         console.log(e);
    //      }
    // });
      
}

module.exports = removeInActiveUser
