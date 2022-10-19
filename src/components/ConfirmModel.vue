<template>
    <section id="confirmModal" class="modal" :class="{'active': toggleModel}">
        <div class="modal-block">
            <button data-close="confirm-modal" class="btn btn-close"  @click="closeModal()">
                <img src="/assets/images/svg/close.svg" alt="icon">
            </button>
            <h4>Quote has been Sent!</h4>
            <div class="modal-icon">
                <img width="135" height="135" src="/assets/images/svg/sms.svg" alt="icon" />
            </div>
            <p>Please check your phone to review your estimated quote (text message from Charter-IMP). <br/> A representative will contact you shortly to provide any additional help needed!</p>
            <div class="contact-info">
                <p>You can always contact us</p>
                <!-- <a href="tel: +1.310.817.2621 ">+1.310.817.2621 </a> -->
                <a href="mailto:support@impjets.com">support@impjets.com</a>
            </div>
            <div class="modal-btns">
                <button type="button" class="btn btn-primary btn-md" @click="goHome($event)">
                    Close
                </button>
            </div>
        </div>
    </section>
</template>
<script setup>
    import emitter from 'tiny-emitter/instance'
    import {ref} from 'vue'
    let toggleModel = ref(false);
    emitter.on('openConfirmModel', function (val) {
        toggleModel.value = val;       
    });
    function closeModal(){
         toggleModel.value = false;
    }
    
    setTimeout(function(){
        const iframe = document.createElement("iframe");
        iframe.style.height = "1px";
        iframe.src = 'thankyou.html';
        document.body.appendChild(iframe);
    },500)

    function goHome(event){
        event.preventDefault();
         toggleModel.value = false;
        emitter.emit('updateSearch', {data : {}, path : 'initial', from : '--'});
    }
</script>
