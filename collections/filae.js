function parseFilaeMain(htmlstring, familymembers, relation) {
  relation = relation || "";

  var parsed = $(htmlstring.replace(/<img/ig, "<gmi"));

  var infosection = parsed.find(".tree-information")
  var fichesection = infosection.find(".informations-fiche-arbre");

  var focusperson = fichesection.find("h1").text()

  var genderval = "unknown";
  if (infosection.hasClass("homme")) {
    genderval = "male";
  } else if (infosection.hasClass("femme")) {
    genderval = "female";
  }

  console.log(genderval);

  var profiledata = {name: focusperson, gender: genderval, status: relation.title};
  var burialdtflag = false;
  var buriallcflag = false;
  var deathdtflag = false;
  var aboutdata = "";
  var focusdaterange = "";

  // ---------------------- Profile Data --------------------
  // Get birth info without <span> tags
  profiledata["birth"] = fichesection.find("ul").find("li").first().clone().children().remove().end().text().trim();
  profiledata["death"] = fichesection.find("ul").find("li").first().next().clone().children().remove().end().text().trim();

  if (relation === "") {
    focusgender = genderval;
  }

  if (familymembers) {
    loadGeniData();
    var famid = 0;
  }

  // ---------------------- Family Data --------------------
  if (familymembers) {
    // TODO
  }

  // ---------------------- Profile Data --------------------
  if (focusdaterange !== "") {
    profiledata["daterange"] = focusdaterange;
  }

  if (aboutdata.trim() !== "") {
    profiledata["about"] = cleanHTML(aboutdata);
    // "\n--------------------\n"  Merge separator
  }

  if (familymembers) {
    alldata["profile"] = profiledata;
    alldata["scorefactors"] = smscorefactors;
    updateGeo();
  }
  
  console.log(profiledata);
  return profiledata;
}
