require("dotenv").config();
const {EMAIL_ADMIN, PASSWORD} = process.env;
const nodemailer = require("nodemailer");
// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADMIN,
    pass: PASSWORD,
  },
});

// const sendEmailController = async (req, res) => {
const sendEmailController = async (message) => {
    const mailOptions = {
      from: "technookpfinal@gmail.com",
      to: "cristian200127@gmail.com", // ingresar correo ya que esta harcodeado 
      subject: "Information about your purchase 🛒",
      html: `<!DOCTYPE html>
      <html xmlns=http://www.w3.org/1999/xhtml xmlns:v=urn:schemas-microsoft-com:vml xmlns:o=urn:schemas-microsoft-com:office:office lang="en">
      <head>
      <meta name=x-apple-disable-message-reformatting>
      <meta http-equiv=X-UA-Compatible>
      <meta charset=utf-8>
      <meta name=viewport content=target-densitydpi=device-dpi>
      <meta content=true name=HandheldFriendly>
      <meta content=width=device-width name=viewport>
      <style type="text/css">
      table {
      border-collapse: separate;
      table-layout: fixed;
      }
      table td {
      border-collapse: collapse
      }
      .ExternalClass {
      width: 100%
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
      line-height: 100%
      }
      * {
      line-height: inherit;
      text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -o-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
      }
      html {
      -webkit-text-size-adjust: none !important
      }
      img+div {
      display: none;
      display: none !important
      }
      img {
      Margin: 0;
      padding: 0;
      -ms-interpolation-mode: bicubic
      }
      h1, h2, h3, p, a {
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
      line-height: 1;
      color: inherit;
      background: none;
      overflow-wrap: normal;
      white-space: normal;
      word-break: break-word
      }
      a {
      color: inherit;
      text-decoration: none
      }
      h1, h2, h3, p {
      min-width: 100%!important;
      width: 100%!important;
      max-width: 100%!important;
      display: inline-block!important;
      border: 0;
      padding: 0;
      margin: 0
      }
      a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important
      }
    //   a[href^="mailto"],
    //   a[href^="tel"],
    //   a[href^="sms"] {
      color: inherit !important;
      text-decoration: none !important
      }
      @media only screen and (min-width: 481px) {
      .hd { display: none!important }
      }
      @media only screen and (max-width: 480px) {
      .hm { display: none!important }
      }
      [style*="Fira Sans"] {font-family: 'Fira Sans', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;} [style*="Montserrat"] {font-family: 'Montserrat', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;}
      @media only screen and (min-width: 481px) {.t11,.t9{padding-bottom:100px!important}.t22{line-height:40px!important}.t24{padding-bottom:40px!important;border-top-left-radius:inherit!important;border-top-right-radius:inherit!important}.t29{border-top-left-radius:inherit!important;border-top-right-radius:inherit!important;padding-bottom:40px!important}.t30{line-height:52px!important;font-size:48px!important}.t32{line-height:28px!important}.t40{line-height:28px!important;font-size:18px!important}.t42{line-height:50px!important}.t50{line-height:28px!important;font-size:18px!important}.t54,.t59{line-height:48px!important}.t60{line-height:48px!important;font-size:13px!important;}.t62{line-height:48px!important}.t69,.t71{padding-top:80px!important;padding-bottom:80px!important}.t82{line-height:40px!important}.t84{padding-bottom:60px!important;border-top-left-radius:inherit!important;border-top-right-radius:inherit!important}.t89{border-top-left-radius:inherit!important;border-top-right-radius:inherit!important;padding-bottom:60px!important}}
      </style>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600;700&family=Montserrat:wght@800&display=swap" rel="stylesheet" type="text/css">
 
      </head>
      <body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#EDEDED;"><div class=t1 style="background-color:#EDEDED;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t111 style="font-size:0;line-height:0" valign=top align=center>
   
      <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td>
      <table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
      <!--[if !mso]><!--><td class=t11 style="background-color:#FFFFFF;width:620px;padding:60px 30px 70px 30px;">

      <table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
      <table class=t19 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t20 style="background-color:unset;width:475px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
      <table class=t103 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
      <!--[if !mso]><!--><td class=t104 style="width:65px;padding:0 411px 46px 0;">
      <!--<![endif]-->
      <!--[if mso]><td style="width:476px;padding:0 411px 46px 0;"><![endif]-->
      <div style="font-size:0px;"><img class=t110 style="display:block;border:0;height:auto;width:300%;Margin:0;max-width:200%;" width=550 src="https://res.cloudinary.com/dy2ekajhi/image/upload/v1702349238/technook/hue9xoh6fyv22iuzebws.png" /></div></td>
      </tr></table>
      </td></tr><tr><td>
      <table class=t23 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t24 style="border-bottom:1px solid #E1E2E6;width:475px;padding:0 0 30px 0;"><h1 class=t30 style="text-decoration:none;text-transform:none;direction:ltr;color:#000000;text-align:left;font:normal 700 28px/38px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';">HI THERE!</h1></td>
      </tr></table>
      </td></tr><tr><td><div class=t22 style=line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class=t33 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t34 style="width:475px;"><p class=t40 style="text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;font:normal 400 16px/26px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';">${message}</p></td>
      </tr></table>
      </td></tr><tr><td><div class=t32 style=line-height:18px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class=t43 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t44 style="width:475px;"><p class=t50 style="text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;font:normal 400 16px/26px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';">FINAL PROJECT - SOY HENRY 43"A"</p></td>
      </tr></table>
      </td></tr><tr><td><div class=t42 style=line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class=t53 role=presentation cellpadding=0 cellspacing=0 align=left><tr><td class=t54 style="background-color:#18bec1;width:200px;text-align:center;line-height:46px;border-radius:20px 20px 20px 20px;"><a class=t60 
      href="https://technookstore.up.railway.app/"
      style="display:block;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;direction:ltr;color:#000000;text-align:center;font:normal 800 12px/46px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Montserrat';" target=_blank>TECHNOOK.COM.AR</a></td>
      </tr></table>
</td></tr></table></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </td></tr><tr><td>
      <table class=t70 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
      <!--[if !mso]><!--><td class=t71 style="background-color:#005f73;width:620px;padding:30px 30px 30px 30px;">
      <!--<![endif]-->
      <!--[if mso]><td style="background-color:#000000;width:680px;padding:60px 30px 60px 30px;"><![endif]-->
      <table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
      <table class=t79 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t80 style="background-color:unset;width:475px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
      <table class=t83 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t84 style="border-bottom:1px solid #262626;width:600px;padding:0 0 40px 0;"><h1 class=t90 style="text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:left;font:normal 600 32px/32px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';">TECHNOOK</h1></td>
      </tr></table>
      </td></tr><tr><td><div class=t82 style="line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
      <table class=t93 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t94 style="width:600px;"><p class=t100 style="text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:left;font:normal 400 14px/22px BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';">E-commerce TechNook Store - All rights reserved</p></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </td></tr></table></td></tr></table></div></body>
      </html>`
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado: " + info.response);
    //   res.status(200).json({ message: "Correo electrónico enviado exitosamente" });
    } catch (error) {
      console.error({ error: "Error al enviar el correo electrónico" });
    //   res.status(500).json({ error: "Error al enviar el correo electrónico" });
    }
  };

module.exports = sendEmailController;
