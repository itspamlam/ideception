class Idea {
  constructor(data) {
    this.title = data.title;
    this.idea = data.idea;
    this.tag = data.tag;
    this.user_id = Number(data.user_id);
  }
}

module.exports = Idea;
