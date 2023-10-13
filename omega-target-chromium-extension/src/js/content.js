document.getElementById("importProxy").addEventListener("click", function () {
  // Check if extension is installed
  var extensionId = "padekgcemlokbadohgkifijomclgjgif"; // Replace with your extension's ID
  var proxies = [
    {
      name: "test",
      host: "rp.proxyscrape.com",
      port: 6060,
      protocol: "http",
      username: "bk4gz27r597mi53",
      password: "v5cnml5lvribce2",
    },
  ];

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

  var args = proxies.map((proxy) => {
    var res = {};
    res[`+${proxy.name}`] = [
      {
        auth: {
          fallbackProxy: {
            password: proxy.password,
            username: proxy.username,
          },
        },
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
      },
    ];

    return res;
  });

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
          args: proxies[0].name,
        });

        alert(
          `Proxy ${proxies
            .map((proxy) => proxy.name)
            .join(", ")} is installed but not activated.`
        );
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
