<template>
    <section id="confirmModal" class="modal" :class="{'active': toggleModel}">
        <div class="modal-block">
            <button data-close="confirm-modal" class="btn btn-close"  @click="closeModal()">
                <img src="/assets/images/svg/close.svg" alt="icon">
            </button>
            <h4>Thank you for choosing ByTheSeat.</h4>
            <div class="modal-icon">
                <img src="/assets/images/svg/confirm.svg" alt="icon" />
            </div>
            <p>An estimated quote is waiting for you in the email inbox you provided. Our representative will contact you by phone with a detailed quote.</p>
            <div class="contact-info">
                <p>You can always contact us</p>
                <a href="tel: +1.310.817.2621 ">+1.310.817.2621 </a>
                <a href="mailto:support@bytheseat.com">Support@bytheseat.com</a>
                <p>By The Seat Team.</p>
            </div>
            <div class="modal-btns">
                <a href="#" class="btn btn-primary btn-md" @click="goHome($event)">
                    Home page
                </a>
                <button data-close="confirm-modal" type="button" class="btn btn-light btn-md">
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


    function goHome(event){
        event.preventDefault();
         toggleModel.value = false;
        emitter.emit('updateSearch', {data : {}, path : 'initial', from : '--'});
    }
</script>
