
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('.form-wizard');
    const progress = document.querySelector(".progress");
    const stepsContainer = document.querySelector(".steps-container");
    const steps = document.querySelectorAll(".step");
    const stepIndicators = document.querySelectorAll(".progress-container li")
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const submitButton = document.querySelector(".submit-btn");
    document.documentElement.style.setProperty("--steps",stepIndicators.length);

    let currentStep=0;
  const updateProgress = ()=>{
    let width = currentStep/(steps.length-1);
    // console.log("width ===>",steps.length-1)
        progress.style.transform = `scaleX(${width})`;
        stepsContainer.style.height = steps[currentStep].offsetHeight + "px";
        stepIndicators.forEach((indicator,index)=>{
            indicator.classList.toggle('current',currentStep === index);
            indicator.classList.toggle('done',currentStep>index);
        })
        
        steps.forEach((step,index)=>{
          //  console.log("first-name===>",currentStep)
            step.style.transform=`translateX(-${currentStep*100}%)`
            step.classList.toggle('current',currentStep === index);
        })
        updateButtons()
        
  }
  const updateButtons = ()=>{
    prevButton.hidden = currentStep===0;
    nextButton.hidden = currentStep>= steps.length-1;
    submitButton.hidden = !nextButton.hidden;
  }
  const isValidStep = ()=>{
    const fields=steps[currentStep].querySelectorAll('input,textarea');
    return [...fields].every(field=>field.reportValidity())
  }

//  event listeners

const inputs = form.querySelectorAll('input,textarea');
inputs.forEach(input=>input.addEventListener('focus',(e)=>{
    const focusedElement=e.target;
    // console.log("focusedElement===>",focusedElement)
    // get the step where the focused element belongs
    const focusedStep = [...steps].findIndex(step=>step.contains(focusedElement));
    console.log("focusedStep===>",focusedStep)
    if(focusedStep !==-1 && focusedStep!==currentStep){
       if(!isValidStep()) return; 

        currentStep=focusedStep;
        updateProgress()
    }
    stepsContainer.scrollTop=0;
    stepsContainer.scrollLeft=0;
}))

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form submission

    // if (!form.checkValidity()) return;
    
    const formData = new FormData(form);
    // console.log("form ===>",formData)
    // send the data somewhere
    console.log(Object.fromEntries(formData));

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // mimic a server request
    setTimeout(() => {
      form.querySelector(".completed").hidden = false;
    }, 3000);
  });


   prevButton.addEventListener('click',(e)=>{
    e.preventDefault();
     if(currentStep>0){
        currentStep--;
        updateProgress();
     }
   })
  
   nextButton.addEventListener('click',(e)=>{
    e.preventDefault();
     if(!isValidStep()) return ;
     if(currentStep<steps.length-1){
      
        currentStep++;
        updateProgress();
     }
   })
   updateProgress();
})
