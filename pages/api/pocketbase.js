import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
//var exports = {};
/*...*/
//Auth
const register = (profile) => {
  pb.collection("users").create(data);
};

const login = (data) => {
  pb.collection("users").authWithPassword(data.email, data.password);
};

//Create

//Refresh
const allArticles = pb
  .collection("articles")
  .getFullList(200 /* batch size */, { sort: "-created" });

const allProjects = pb
  .collection("projects")
  .getFullList(200 /* batch size */, { sort: "-created" });

const allUsers = pb
  .collection("users")
  .getFullList(200 /* batch size */, { sort: "-created" });

const searchProjects = (pjt) => {
  pb.collection("projects").getFirstListItem('someField="' + pjt + '"', {
    expand: "relField1,relField2.subRelField",
  });
};

const searchArticles = (query) => {
  pb.collection("articles").getFirstListItem('someField="' + query + '"', {
    expand: "relField1,relField2.subRelField",
  });
};

const searchUsers = (usr) => {
  pb.collection("users").getFirstListItem('someField="' + usr + '"', {
    expand: "relField1,relField2.subRelField",
  });
};

/*
// or fetch only the first record that matches the specified filter
const record = await pb
  .collection("users")
  .getFirstListItem('someField="test"', {
    expand: "relField1,relField2.subRelField",
  });
*/
/*const sampleQuery = pb
  .collection("users")
  .getFullList(200, {
    sort: "-created",
  })
  .then((response) => {
    console.log("TEST: " + JSON.stringify(response));
  })
  .catch((error) => {
    console.log("TEST: " + error);
  });
console.log(sampleQuery);  => this worked.*/
//export default pb
