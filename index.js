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

function f_to_num(str) {
  // Split the string into numbers and operators, keeping operators as individual elements
  const parts = str.split(/([+-])/);

  // Initialize the sum and handle potential leading plus or minus signs
  let sum = parts[0] === "-" ? -Number(parts[1]) : Number(parts[0]);

  // Iterate through the remaining parts, adding or subtracting numbers as needed
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const num = Number(parts[i + 1]);
    sum = operator === "+" ? sum + num : sum - num;
  }

  return sum;
}

function encrypt() {
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

// exec(chr(11+11+11+11+11+11+11+11+11+11+1+1+1+1+1+1+1+1+1+1)+chr(11+11+1+1+1+1+1+1+1+1+1+1)+chr(11+11+11+11+11+1+1+1+1+1+1)+chr(11+11+1+1+1+1+1+1+1+1+1+1)+chr(11+11+11+1+1+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+1+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+1+1+1+1+1+1)+chr(11+11+11+1+1+1+1+1+1)+chr(1+1+1+1+1+1+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+11+1+1)+chr(11+11+11+11+11+11+11+11+11+11+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+1+1+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+11)+chr(11+11+11+11+11+11+11+11+11+11+1+1+1+1+1+1)+chr(11+11+11+1+1+1+1+1+1+1)+chr(11+11+11+11+11+11+11+11+11+11+1+1+1+1+1+1+1+1+1+1)+chr(11+11+11+1+1+1+1+1+1+1+1))

function decrypt() {
  let converted = document.getElementById("pyf").value.replace(/\s/g, "");
  if (converted.slice(0, 5) !== "exec(" || converted.slice(-1) !== ")") {
    document.getElementById("converted").value = "Invalid input!";
    return;
  }

  let unconverted = "";
  let converted_list = converted.slice(5, -1).split(")+chr(");

  // remove chr( from first element and ) from last element
  converted_list[0] = converted_list[0].slice(4);
  converted_list[converted_list.length - 1] = converted_list[
    converted_list.length - 1
  ].slice(0, -1);

  for (let i = 0; i < converted_list.length; i++) {
    unconverted += String.fromCharCode(f_to_num(converted_list[i]));
  }

  document.getElementById("converted").value = unconverted;
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
