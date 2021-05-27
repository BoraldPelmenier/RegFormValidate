const regName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,16}$/;
const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

let errMessage;
let inputs = document.querySelectorAll('input[data-rule]');

console.log(inputs);

for(let input of inputs) {
   // валидация по потере фокуса
   input.addEventListener('blur', function() {
      let rule = this.dataset.rule;
      let value = this.value;
      let check = false;           
      let kostil = false;
      
      if(value === '') {
         setErrorFor(this, 'Input cant be blank!')
      } else {
         if(rule === 'name') {
            check = regName.test(value);
            errMessage = 'Cant contain numbers or special characters!';
            kostil = true;            
         }
         if(rule === 'email') {
            check = regEmail.test(value);
            errMessage = 'Invalid Email!';
            kostil = true;
         }
         if(rule === 'password') {
            check = regPassword.test(value);
            if(check) {              
            } else {
               errMessage = 'Password must contain one uppercase letter.';              
            } 
            kostil = true;           
         }
         if(rule === 'passwordConfirm') {              
            check = regPassword.test(value);            
            if(check) {
               if(!confirmPassword(passwordInput.value, confirmPasswordInput.value)) {                  
                  setErrorFor(passwordInput, errMessage);
                  setErrorFor(this, errMessage);                                                  
               } else {    
                  kostil = true;
                  setSeccessFor(passwordInput);
               }   
            } else {               
               kostil = true;
               errMessage = 'Password must contain one uppercase letter.';
            }                         
         }
         if(rule === 'date') {
            let adult = calculationYear(this);
            kostil = true;
            if(adult > 18) {
               check = true;               
            } else {               
               errMessage = 'Registration from 18 years old !';
            }
         }
         if(kostil) {
            if(check) {
               setSeccessFor(this);
            } else {
               setErrorFor(this, errMessage);
            }
         }
      }      
   });
}

function confirmPassword(pasInputFirst, pasInputSecond) {
   if(pasInputFirst === pasInputSecond) {
      return true;
   } else {
      errMessage = 'Password mismatch!';      
      return false;
   }   
}

function calculationYear(input) {
   var now = new Date(); //Текущя дата
   var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
   var dob = new Date(input.value); //Дата рождения
   var dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
   var age; //Возраст
//Возраст = текущий год - год рождения
   age = today.getFullYear() - dob.getFullYear();
//Если ДР в этом году ещё предстоит, то вычитаем из age один год
   if (today < dobnow) {
      age = age-1;
   }
   return age;
}

function setErrorFor(input, message) {
   const formControl = input.parentElement;
   const small = formControl.querySelector('.error-mes');
   small.innerText = message;
   formControl.className = 'form-control error';
}

function setSeccessFor(input) {
   const formControl = input.parentElement;
   formControl.className = 'form-control success';
}


