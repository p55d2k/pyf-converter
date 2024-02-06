function num_to_f(num) {
  // Input validation
  if (num < 0 || num > Math.pow(10, 3)) {
    throw new Error("Invalid input: Number must be between 0 and 10^3");
  }

  // Handle base cases
  if (num === 0) {
    return "";
  } else if (num === 1) {
    return "1";
  }

  // Recursively build the string
  let result = "";
  while (num > 0) {
    if (num >= 11) {
      result += "11+";
      num -= 11;
    } else {
      result += "1+";
      num -= 1;
    }
  }

  // Remove trailing "+"
  return result.slice(0, -1);
}

function convert() {
  let unconverted = document.getElementById("unconverted").value;
  let unconverted_list = unconverted.split("");
  let converted = "";

  for (let i = 0; i < unconverted_list.length; i++) {
    converted +=
      "chr(" + num_to_f(unconverted_list[i].charCodeAt(0).toString()) + ")+";
  }
  converted = converted.slice(0, -1);

  document.getElementById("converted").value = "exec(" + converted + ")";
}

function copy() {
  let copyText = document.getElementById("converted");
  copyText.select();
  copyText.setSelectionRange(0, 99999999);
  navigator.clipboard.writeText(copyText.value);

  let copyButton = document.getElementById("c");
  copyButton.innerHTML = "Copied!";

  setTimeout(function () {
    copyButton.innerHTML = "Copy";
  }, 2000);
}
