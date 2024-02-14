//The script that will help me solve all my problems cause I can't bare to eddit 3 html files to add the same thing

document.addEventListener("DOMContentLoaded", function () {
  let br = document.createElement("br");

  let footer = document.createElement("footer");
  footer.className = "footer";

  let footerLinksDiv = document.createElement("div");
  footerLinksDiv.className = "footer-links";

  let links = [
    { id: "Youtube", icon: "fab fa-youtube", href: "https://www.youtube.com/channel/UC_ey0FNtdHaFJCQjSqN-wLQ", text: "Youtube" },
    { id: "Github", icon: "fab fa-github", href: "https://github.com/NachitheProtogen", text: "Github" },
    { id: "Reddit", icon: "fab fa-reddit", href: "https://www.reddit.com/user/Affectionate-Pain229", text: "Reddit" },
    { id: "Twitter", icon: "fab fa-twitter", href: "https://twitter.com/Musicprotogen", text: "Twitter" },
    { id: "Discord", icon: "fab fa-discord", href: "https://discord.com/users/324313743796207641", text: "Discord" },
    { id: "Steam", icon: "fab fa-steam", href: "https://steamcommunity.com/id/Nanachi_OwO/", text: "Steam"},
    { id: "Home", icon: "fas fa-home", href: "index.html", text: "Home" }, 
  ];

  links.forEach(function (linkInfo) {
    let link = document.createElement("p");
    link.className = "link";
    link.id = linkInfo.id;
    link.innerHTML = '<a href="' + linkInfo.href + '" ><i class="' + linkInfo.icon + '"></i> ' + linkInfo.text + '</a>';
    footerLinksDiv.appendChild(link);
  });

  let versionDiv = document.createElement("div");
  versionDiv.className = "div";

  let version = document.createElement("p");
  version.className = "version";
  version.textContent = "Version 1.0.4";
  versionDiv.appendChild(version);

  let clock = document.createElement("div");
  clock.className = "clock";
  clock.id = "clock";

  function updateClock() {
    const localTime = new Date();

    const targetTimezone = "Europe/Berlin";
    const options = { timeZone: targetTimezone };
    const targetTime = localTime.toLocaleTimeString('en-US', options);

    clock.textContent = `Current time for me: ${targetTime}`;
  };

  setInterval(updateClock, 1000);

  updateClock();


  footer.appendChild(footerLinksDiv);
  footer.appendChild(versionDiv);
  footer.appendChild(clock);

  document.body.appendChild(br);
  document.body.appendChild(footer);
});
