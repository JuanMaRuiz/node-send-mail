var template = require('email-templates').EmailTemplate,
    async = require('async'),
    nodemailer = require('nodemailer');

var user = {
  nick: "JuanMa Ruiz",
  title: "Bazinga is the new black"
}

var send = function(to, subject, templ, data) {
  /**
   * @description This method recives and array of functions and execute in a waterfall way
   */
  async.waterfall([
    /**
     * @param  {Function} next next function to execute
     * @return {[type]}        [description]
     */
    function(next) {
      var motor = new template(templ);
      console.log(motor);
      motor.render(data, function(error, result) {
        if (error) {
          console.log("Ups! There was an error", error);
        } else {
          next(result.html);
        }
      });
    }
  ], function(html) {
    var connection = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "johndoe@email.com", // email account
        pass: "coolPassword" // your pass
      }
    });

    var email = {
      from: "johndoe@email.com",  // this email account should be the same as before auth.user
      to: to, // recipient, passed as parameter to the function
      subject: subject, // subject, passed as parameter to the function
      html: html // template, passed as parameter to the function
    };

    connection.sendMail(email);
  });
};

/**
 * @type {String} - Recipient
 * @type {String} - Subject
 * @type {String} - Path to folder which contains the template to render
 * @type {Variable} - Variable which holds the data you want to render in the template
 */
send("mailTo@email.com", "Bazinga: This is the subject of the mail", "./tmp/", user);