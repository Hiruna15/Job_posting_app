const bcrypt = require("bcrypt");

const plainPassword = "hiruna1234";

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});
