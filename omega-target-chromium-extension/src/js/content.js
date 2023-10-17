document.getElementById("importProxy").addEventListener("click", function () {
  var name = document.getElementById("proxy-name").value;
  var host = document.getElementById("host").value;
  var port = document.getElementById("port").value;
  var protocol = document.getElementById("protocol").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (!name || !host || !port || !protocol) return;

  function generateRandomColor() {
    // Generate random values for the red, green, and blue components
    var r = Math.floor(Math.random() * 256); // 0 to 255
    var g = Math.floor(Math.random() * 256); // 0 to 255
    var b = Math.floor(Math.random() * 256); // 0 to 255

    // Convert the decimal values to hexadecimal and format the color string
    var color = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return color;
  }

  function generateProxyProfile(proxy) {
    var res = {};

    var profile = {
      bypassList: [
        {
          conditionType: "BypassCondition",
          pattern: "127.0.0.1",
        },
        {
          conditionType: "BypassCondition",
          pattern: "[::1]",
        },
        {
          conditionType: "BypassCondition",
          pattern: "localhost",
        },
      ],
      color: generateRandomColor(),
      fallbackProxy: {
        host: proxy.host,
        port: proxy.port,
        scheme: proxy.protocol,
      },
      name: proxy.name,
      profileType: "FixedProfile",
      revision: "18b1a77659c",
    };

    if (proxy.username && proxy.password) {
      profile["auth"] = {
        fallbackProxy: {
          password: proxy.password,
          username: proxy.username,
        },
      };
    }
    res[`+${proxy.name}`] = [profile];

    return res;
  }

  var proxy = {
    name,
    host,
    port: parseInt(port),
    protocol,
    username,
    password,
  };

  var args = [generateProxyProfile(proxy)];

  try {
    chrome.runtime.sendMessage(
      {
        method: "patch",
        args: args,
      },
      function (response) {
        console.log(response);

        chrome.runtime.sendMessage({
          method: "openProfile",
          args: proxy.name,
        });

        alert(`Proxy ${proxy.name} is installed but not activated.`);
      }
    );
  } catch (e) {
    var divElement = document.getElementById("switchy-omga-extension");

    if (divElement) divElement.remove();

    console.log("SwitchyOmega is not installed");
    window.open(
      "https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif/overview"
    );
  }
});

var divElement = document.createElement("div");
divElement.setAttribute("id", "switchy-omga-extension");
document.body.appendChild(divElement);
