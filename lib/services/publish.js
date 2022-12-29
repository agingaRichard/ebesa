import axios from "axios";
export default function publishArticle(f, x) {
  f.preventDefault();
    const serverResponse = axios
      .post("http://localhost:5000/api/client/articles/new", x)
      .then(alert("Your post was published successfully."))
      .then((window.location.href = "/"))
      .catch((err) => {
        alert(err);
      });
}
