const nodeMailer = require("../config/nodemailer");

//this is another way to exporting a method
exports.newComment = (comment) => {
  console.log("inside newComment mailer", comment);
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  nodeMailer.transporter.sendMail(
    {
      from: "citycornor07@gmail.com",
      to: comment.user.email,
      subject: "New Comment PUblished!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
