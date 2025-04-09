// artists.js - script that scrapes "Top Rap and Hip-Hop Songs April 2025" 
// and sends an email with songs by specified artists via CLI

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const nodemailer = require("nodemailer");

// capture cli artists
const artistsToSearch = process.argv.slice(2);
if (artistsToSearch.length === 0) {
  console.log("No artists specified. Exiting without sending email.");
  process.exit(0);
}

let credentials;
try {
  const data = fs.readFileSync("credentials.json");
  credentials = JSON.parse(data);
} catch (err) {
  console.error("Failed to read credentials.json:", err);
  process.exit(1);
}

const { from, to, senderEmail, senderPassword } = credentials;

const url = "https://www.popvortex.com/music/charts/top-rap-songs.php";

axios.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const matches = [];

    $(".chart-content").each((i, el) => {
      if (i >= 25) return false;   

      const song = $(el).find(".title").text().trim();
      const artist = $(el).find(".artist").text().trim();

      for (let artistToSearch of artistsToSearch) {
        if (artist.includes(artistToSearch)) {
          matches.push({ artist, song });
          break; 
        }
      }
    });

    if (matches.length === 0) {
      console.log("No matching artists found. No email sent.");
      return;
    }

    // subject 
    let subject = "Your artists are: ";
    if (artistsToSearch.length === 1) {
      subject += artistsToSearch[0];
    } else {
      subject += artistsToSearch.slice(0, -1).join(", ") + ", and " + artistsToSearch.slice(-1);
    }

    // email body
    const htmlBody = matches.map(({ artist, song }) =>
      `<strong>${artist}</strong>: <em>${song}</em>`
    ).join("<br>");

    // send the guy
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword
      }
    });

    const mailOptions = {
      from,
      to,
      subject,
      html: htmlBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);  // pray it works correctly
      }
    });
  })
  .catch((err) => {
    console.error("Error fetching page:", err);
  });
