//The script that will help me solve all my problems cause I can't bare to eddit 3 html files to add the same thing

document.addEventListener("DOMContentLoaded", function () {
    let footer = document.createElement("footer");
    footer.className = "footer";
  
    let footerLinksDiv = document.createElement("div");
    footerLinksDiv.className = "footer-links";
  
    let links = [
      { id: "Youtube", href: "https://www.youtube.com/channel/UC_ey0FNtdHaFJCQjSqN-wLQ", text: "Youtube" },
      { id: "Github", href: "https://github.com/NachitheProtogen", text: "Github" },
      { id: "Reddit", href: "https://www.reddit.com/user/Affectionate-Pain229", text: "Reddit" },
      { id: "Twitter", href: "https://twitter.com/Musicprotogen", text: "Twitter" },
      { id: "Discord", href: "https://discord.com/users/324313743796207641", text: "Discord" },
      { id: "Steam", href: "https://steamcommunity.com/id/Nanachi_OwO/", text: "Steam"},
    ];
  
    links.forEach(function (linkInfo) {
      let link = document.createElement("p");
      link.className = "link";
      link.id = linkInfo.id;
      link.innerHTML = '<a href="' + linkInfo.href + '" target="_blank">' + linkInfo.text + '</a>';
      footerLinksDiv.appendChild(link);
    });
  
    let versionDiv = document.createElement("div");
    versionDiv.className = "div";
  
    let version = document.createElement("p");
    version.className = "version";
    version.textContent = "Version 0.2.1";
    versionDiv.appendChild(version);
  
    footer.appendChild(footerLinksDiv);
    footer.appendChild(versionDiv);
  
    document.body.appendChild(footer);
  });