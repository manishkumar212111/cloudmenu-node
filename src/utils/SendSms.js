const axios =require('axios');

const headers = {
    'Content-Type': 'application/json'
  }

const SendSms = async (mobile, msg) => {
    return new Promise((accept, reject) => {
        let data = {
            "userName":"saif2021",
            "numbers": mobile,
            "userSender":"OTP",
            "apiKey":"e24287786567549949d8837432972217",
            "msg":msg
          }
          console.log(data)
        try{
            axios.post('https://www.msegat.com/gw/sendsms.php', data,  headers )
            .then(response => {
                console.log(response)
                accept(response)

            }
                );
        } catch(error){
            console.log(error);
            reject(error);
        }
    })
}

module.exports = SendSms;