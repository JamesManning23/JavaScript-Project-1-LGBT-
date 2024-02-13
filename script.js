// grabbing all the relevant elements usingthe DOM
const welcomePara = document.getElementById("paraOne");
const button = document.getElementById("button");
const creditPara = document.getElementById("paraTwo");
const containerTwo = document.getElementById("containerTwo");

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
        optionLabel.style.fontSize = "1.75rem";
        optionLabel.setAttribute("for", "option" + i);
        optionLabel.style.position = "relative";
        optionLabel.style.bottom = "100px";
        optionLabel.style.fontFamily = "Times New Roman";
        optionLabel.style.textAlign = "left "; 
        
        
        
        const optionInput = document.createElement("input");
        optionInput.setAttribute("type", "checkbox");
        optionInput.setAttribute("id", "option" + i);
        optionInput.style.width = "40px";
        optionInput.style.position = "relative";
        optionInput.style.bottom = "100px"; 
        optionInput.style.transform = "scale(2.5)";


        // creating a div container element.
        const divContainer = document.createElement("div");
        // appending the div container to containerTwo
        containerTwo.append(divContainer);
        // appending the Option input and label to the div
        divContainer.append(optionInput); 
        divContainer.append(optionLabel);
        // setting a display of flex to the div container;
        divContainer.style.display = "flex"; 
        divContainer.style.flexDirection = "column";
        divContainer.style.flexWrap = "wrap";
        divContainer.style.justifyContent = "space-evenly";

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
    headingTwo.style.gridColumn = "1/13";
    headingTwo.style.textAlign = "center";
    headingTwo.style.fontSize = "3rem";
    headingTwo.style.marginTop = "25px";

    // creates another heading. 
    const headingThree = document.createElement("h3");
    headingThree.innerText = "This is a symptom checker for the 8 most prevelant STIs contracted by Gay and Bisexual Men";
    containerTwo.appendChild(headingThree); // Append the heading to containerTwo
    headingThree.style.textAlign = "center";
    headingThree.style.gridColumn = "1/13";
    headingThree.style.fontSize = "2.5rem";
   

// creating a submit button and appending this to the container.
const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.innerText = "Submit";
containerTwo.append(submitButton);
// styling the submit button.
submitButton.style.position = "relative";
submitButton.style.top = "35vh";
submitButton.style.transform = "scale(3.5)";


submitButton.addEventListener("click", () => {
const userStoredData = symptomsArray(i);
console.log(userStoredData);
})



    // Call the checkList function to create the checkboxes
    checkList();
    

    
}




button.addEventListener("click", displaySymptomFunction);


