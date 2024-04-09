class Profile {

  constructor(id, name, image = `https://drive.google.com/file/d/19JmXy87vw1Igq9HNhgP3vcEauKdum2cm/view`) {
    this.id = id;
    this.name = name;
    this.description = "Adolph Larrue Martinez III.";
    this.mbti = "ISFJ";
    this.enneagram = "9w3";
    this.variant = "sp/so";
    this.tritype = 725;
    this.socionics = "SEE";
    this.sloan = "RCOEN";
    this.psyche = "FEVL";
    this.image = image;
  }


}

module.exports = Profile;


