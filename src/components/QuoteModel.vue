<template>
  <section id="getQouteModal" class="modal" :class="{'active': toggleModel}">
        <div class="modal-block">
            <button data-close="qoute-modal" class="btn btn-close" @click="closeModal()">
                <img src="/assets/images/svg/close.svg" alt="icon">
            </button>
            <h4>Get a Quote</h4>
            <p>Fill in your details, and get an immediate quote to your email inbox. </p>

            <form class="modal-form" action="">
                <div class="modal-field">
                    <label>*Full name</label>                     
                    <input type="text" autocomplete="off" placeholder="e.g. John" v-model="name" name="name" :class="{ 'error' : name_error != '' ? true:false }" required @keyup="checkError($event)"/>
                    
                </div>
               
                <div class="modal-field">
                    <label>*Email address</label>
                    <input type="text" autocomplete="off" placeholder="e.g. john.dowry@example.com" :class="{'error' : email_error != '' ? true:false }" name="email" v-model="email" required  @keyup="checkError($event)"/>
                   
                </div>
                <div class="modal-field">
                    <label>*Phone number</label>
                    <input type="text" autocomplete="off" placeholder="+972" name="phone_number" :class="{'error' : phone_number_error != '' ? true:false }" v-model="phone_number" required  @keyup="checkError($event)"/>
                    
                </div>
                <div class="modal-field">
                    <label>Additional message (optional)</label>
                    <textarea maxlength="300" class="count-area" name="message" id="" v-model="message" cols="30" rows="10" placeholder="Type a message here..."  ></textarea>
                    <div class="counter">
                        <span class="count">0</span>/300
                    </div>

                </div>
                <button id="submitQouteBtn" type="button" class="btn btn-primary btn-md btn-iconed-lg" @click="submitForm()">Send <img src="/assets/images/svg/next.svg" alt="icon"/></button>
                <div class="agree-mails">
                    <div class="checkbox-unit">
                        <input id="agreeMails" type="checkbox" />
                        <label for="agreeMails">
                            <span>
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7851 0.980672C10.9568 1.13811 10.9684 1.40498 10.811 1.57673L4.62349 8.32673C4.54573 8.41155 4.43671 8.46094 4.32166 8.46344C4.20662 8.46594 4.09555 8.42134 4.01419 8.33997L1.20169 5.52747C1.03694 5.36272 1.03694 5.0956 1.20169 4.93085C1.36644 4.7661 1.63356 4.7661 1.79831 4.93085L4.29925 7.43179L10.189 1.00659C10.3465 0.834834 10.6133 0.823232 10.7851 0.980672Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>    
                                </span>
                                By checking this box I agree to receive emails, telephone calls, SMS, marketing materials, promotional offers and other communications form. 
                        </label>
                    </div>
                </div>

            </form>
        </div>
    </section>
</template>

<script setup>
    import emitter from 'tiny-emitter/instance'
    import {ref} from 'vue'
    let name = ref('');
    let email = ref('');
    let phone_number = ref('');
    let message = ref('');
    let toggleModel = ref(false);
    let gError = ref('');


    let name_error = ref('');
    let email_error = ref('');
    let phone_number_error = ref('');
    let message_error = ref('');

    

    emitter.on('openQuoteMOdel', function (val) {
        toggleModel.value = val;       
    });
    function closeModal(){
         toggleModel.value = false;
    }
    function submitForm(){
        gError.value = "";
        if(name.value != '' && email.value != '' && validateEmail(email.value) && phone_number.value != ''){
            emitter.emit('updateSearch', {data : {name : name.value, email : email.value, phone_number : phone_number.value, message : message.value }, path : '', from : 'quoteModel'});
        } else{
            if(name.value == '')
                name_error.value = 'Please enter this field';
            if(email.value == '')
                email_error.value = 'Please enter this field';
            if(phone_number.value == '')
                phone_number_error.value = 'Please enter this field';
        }
    }

    const  phonenumber = (inputtxt)=>
    {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

        return re.test(inputtxt);    
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        };
    function checkError(e){
      
        if(e.target.value ==''  ){
            if(e.target.name == 'name')
                name_error.value = 'Please enter this field';
            if(e.target.name == 'email'){
                email_error.value = 'Please enter this field';
            }
            if(e.target.name == 'phone_number')
                phone_number_error.value = 'Please enter this field';
// 
        }else{

            if(e.target.name == 'name')
                name_error.value = '';
            if(e.target.name == 'email'){
                if(validateEmail(e.target.value)){
                    email_error.value = '';
                }else{
                    email_error.value = 'Please enter this field';
                }
            }
            if(e.target.name == 'phone_number')
                phone_number_error.value = '';
            

        }
        
    }
</script>
