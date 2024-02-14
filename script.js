// grabbing all the relevant elements usingthe DOM
const welcomePara = document.getElementById("paraOne");
const button = document.getElementById("button");
const creditPara = document.getElementById("paraTwo");
const containerTwo = document.getElementById("containerTwo");
const optionInput = document.getElementById
  // creates a array for each individual symptom.
const symptomsArray = [
    "Fever",
    "Fatigue",
    "Swollen lymph nodes",
    "Rash",
    "Sore throat",
    "Muscle aches and joint pain",
    "Night sweats",
    "Diarrhea",
    "Weight loss",
    "Oral thrush (white patches in the mouth)",
    "Recurrent infections",
    "Painless sore (chancre)",
    "Rash on the palms of the hands or soles of the feet",
    "Headaches",
    "Patchy hair loss",
    "Abdominal pain or discomfort",
    "Loss of appetite",
    "Nausea and vomiting",
    "Jaundice (yellowing of the skin and eyes)",
    "Rectal pain",
    "Rectal discharge",
    "Rectal bleeding",
    "Itching or irritation in the anal area",
    "Penile discharge (clear, white, or greenish)",
    "Pain or burning sensation during urination",
    "Difficulty swallowing",
    "Redness or swelling in the throat",
    "Painful sores or blisters on the genital or anal area",
    "Itching or tingling sensations",
    "Flu-like symptoms"
]

// create a checklist function outside the sympton function as arrow functions cannot be hoisted.
// However, the function will be called in the symptom function when clicked./
const checkList = () => {
     
// loops through each array index to create a checkbox for each option.
    for (let i = 0; i < symptomsArray.length; i++) {
        const optionLabel = document.createElement("label");
        optionLabel.innerText = symptomsArray[i];
        optionLabel.setAttribute("for", "option" + i);
        optionLabel.setAttribute("id", "optionLabel");
       
        let optionInput = document.createElement("input");
        optionInput.setAttribute("type", "checkbox");
        optionInput.setAttribute("id", "option" + i);
        optionInput.setAttribute("class", "optionInput");
        
        // creating a div container element.
        const divContainer = document.createElement("div");
        // appending the div container to containerTwo
        containerTwo.append(divContainer);
        // appending the Option input and label to the div
        divContainer.append(optionInput); 
        divContainer.append(optionLabel);
        divContainer.setAttribute("id", "divContainer");
       }


}

const displaySymptomFunction = () => {
    // Removing all the beginning elements
    welcomePara.remove();
    creditPara.remove();
    button.remove();

    // Creating a heading that tells the user to select relevant symptoms 
    const headingTwo = document.createElement("h2");
    headingTwo.innerText = "Please Select Any Symptoms You Have Below";
    containerTwo.appendChild(headingTwo); // Append the heading to containerTwo
    headingTwo.setAttribute("id", "headingTwo");
   

    // creates another heading. 
    const headingThree = document.createElement("h3");
    headingThree.innerText = "This is a symptom checker for the 8 most prevelant STIs contracted by Gay and Bisexual Men";
    containerTwo.appendChild(headingThree); // Append the heading to containerTwo
    headingThree.setAttribute("id", "headingThree");
    
// creating a submit button and appending this to the container.
const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.innerText = "Submit";
containerTwo.append(submitButton);
submitButton.setAttribute("id", "submitButton");
// creating a function to iterate through each checkbox and store the value in the userData Variable


const collectUserData = () => {
//    clears the user data so that it generates only one value each time the 
    userData = [];

    for (let i = 0; i < symptomsArray.length; i++) {
        let optionInput = document.getElementById("option" + i);
        if (optionInput.checked === true) {
            userData.push(symptomsArray[i]);
        }
    }
       // logging the userData outside of the loop so it doesnt repeat.
    let newUserData = userData.toString();
    

if (newUserData === "Rash") {
    optionInput.checked === false;
    let rashElement = document.createElement("h3");
    rashElement.innerText = "hello world";
    containerTwo.append(rashElement);
} else
console.log("null");

}


// event listener added to submit button.
submitButton.addEventListener("click", collectUserData);
 
// calling the checklist function.
    checkList();
}
button.addEventListener("click", displaySymptomFunction);







