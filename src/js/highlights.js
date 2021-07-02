let pagePath = window.location.pathname.slice(1);

switch (pagePath) {
  default:
    document.getElementById("home").style.color = "rgba(67, 56, 202, 1)";
    break;
  case "popular":
    document.getElementById("popular").style.color = "rgba(67, 56, 202, 1)";
    break;

  case "upcoming":
    document.getElementById("upcoming").style.color = "rgba(67, 56, 202, 1)";
    break;

  case "search":
    document.getElementById("search").style.color = "rgba(67, 56, 202, 1)";
    break;
}
