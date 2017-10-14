class userModel {
  constructor(data) {
      this.firstname = data.firstname;
      this.username = data.username;
      this.password = data.password;
      this.email = data.email;
  }
}

module.exports = userModel;
