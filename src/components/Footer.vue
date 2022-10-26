<template>
    <footer>
        <div class="container">
            <div class="footer-top">
                <div class="footer-unit">
                    <h4>DISCLAIMER</h4>
                    <p>Imperium Jets Inc is not an Air Carrier nor an Operator. Imperium Jets does not own or operate any aircraft. Operational control of all charter flights is provided by FAR Part 135 or 121 air carriers or the foreign equivalent. All
                        services are subject to the <a target="_blank" href="https://bytheseat.com/terms">terms of use</a>.</p>
                </div>
                <div class="footer-unit">
                    <h4>SUPPORT</h4>
                    <p><a href="mailto:support@impjets.com">support@impjets.com</a> <br/> <a href="tel:+18443325701">+1.844.332.5701</a> <br>  6390 De Longpre Ave,<br> Los Angeles, CA 90028,<br> United States<br/> <a href="https://www.google.com/maps/place/6390+De+Longpre+Ave,+Los+Angeles,+CA+90028,+USA/@34.0960972,-118.3304818,17z" target="_blank">Map</a></p>
                </div>
                <div class="footer-content">
                    <a class="logo" target="_blank" href="https://www.bytheseat.com/">
                        <img src="/assets/images/svg/logo-blue.svg" alt="logo" />
                    </a>
                    <p>Get the latest on By The Seat private Jet Flights.</p>
                    <form class="footer-subscribe" v-if="!mailSent">
                        <input type="email" placeholder="Email address" v-model="email" :class="{'error' : email_error != '' ? true:false }" @keyup="checkError($event)">
                        <button class="btn btn-dark btn-sm"  type="button" @click="subscribe(event)">{{ inProgress ? 'Subscribing..' : 'Subscribe'}}</button>
                    </form>
                    <div class="success-content" v-else>
                        <h5>WELCOME ABOARD!</h5>
                        <p>Thank you for joinging our Newsletter.</p>
                    </div>
                    <div class="footer-social">
                        <h5>Follow us</h5>
                        <ul>
                            <li>
                                <a href="https://facebook.com/ImperiumJets/" target="_blank" nofollow="" noindex="">
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.502 12.2073C24.502 5.57985 19.1294 0.207275 12.502 0.207275C5.87453 0.207275 0.501953 5.57985 0.501953 12.2073C0.501953 18.1967 4.89016 23.1613 10.627 24.0615V15.676H7.58008V12.2073H10.627V9.56353C10.627 6.55603 12.4185 4.89478 15.1595 4.89478C16.472 4.89478 17.8457 5.12915 17.8457 5.12915V8.08228H16.3326C14.842 8.08228 14.377 9.00735 14.377 9.95728V12.2073H17.7051L17.173 15.676H14.377V24.0615C20.1138 23.1613 24.502 18.1967 24.502 12.2073Z" fill="#9CA3AF"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/imperium_jets" target="_blank" nofollow="" noindex="">
                                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.05211 19.9573C17.1065 19.9573 22.0602 12.454 22.0602 5.94914C22.0602 5.7382 22.0555 5.52257 22.0462 5.31164C23.0098 4.61474 23.8414 3.75153 24.502 2.76257C23.6045 3.16188 22.6516 3.42266 21.6759 3.53601C22.7032 2.92018 23.4725 1.95275 23.841 0.813042C22.8745 1.38583 21.8175 1.78989 20.7154 2.00789C19.9728 1.21884 18.9909 0.696392 17.9216 0.521326C16.8523 0.346261 15.7551 0.528326 14.7997 1.03937C13.8442 1.55042 13.0838 2.36198 12.6358 3.34859C12.1878 4.33519 12.0774 5.44189 12.3215 6.49757C10.3644 6.39937 8.44989 5.89098 6.70193 5.00537C4.95398 4.11977 3.41165 2.87671 2.17492 1.35679C1.54635 2.44052 1.35401 3.72292 1.63698 4.94337C1.91996 6.16381 2.65702 7.23072 3.69836 7.92726C2.91658 7.90244 2.15193 7.69196 1.46758 7.3132V7.37414C1.46688 8.51143 1.86005 9.61386 2.58026 10.494C3.30047 11.3742 4.30328 11.9778 5.4182 12.2023C4.69401 12.4004 3.93394 12.4293 3.1968 12.2866C3.51141 13.2647 4.12353 14.1202 4.94772 14.7336C5.77192 15.3471 6.76707 15.6879 7.7943 15.7085C6.05038 17.0784 3.89613 17.8214 1.67852 17.8179C1.28524 17.8173 0.892352 17.7932 0.501953 17.7457C2.75481 19.191 5.37548 19.9587 8.05211 19.9573Z" fill="#9CA3AF"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/by_the_seat/" target="_blank" nofollow="" noindex="">
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1_12341)">
                                    <path d="M24.2691 7.22711C24.2557 6.22429 24.068 5.23143 23.7143 4.29296C23.4076 3.50136 22.9391 2.78245 22.3388 2.18216C21.7385 1.58187 21.0196 1.11339 20.228 0.80667C19.3016 0.458911 18.3229 0.270872 17.3336 0.250559C16.0598 0.193623 15.656 0.177734 12.4226 0.177734C9.18921 0.177734 8.77477 0.177734 7.51028 0.250559C6.52141 0.271021 5.54317 0.459058 4.61718 0.80667C3.82546 1.11318 3.10644 1.58158 2.50612 2.1819C1.9058 2.78222 1.4374 3.50124 1.13089 4.29296C0.782433 5.21866 0.594801 6.19712 0.576101 7.18606C0.519166 8.46115 0.501953 8.86499 0.501953 12.0984C0.501953 15.3318 0.501953 15.7449 0.576101 17.0107C0.595962 18.0011 0.782657 18.9783 1.13089 19.9065C1.43791 20.6979 1.90666 21.4167 2.50718 22.0167C3.1077 22.6168 3.82679 23.085 4.6185 23.3914C5.54196 23.7532 6.52037 23.9546 7.51161 23.9872C8.78669 24.0442 9.19053 24.0614 12.4239 24.0614C15.6573 24.0614 16.0718 24.0614 17.3362 23.9872C18.3255 23.9678 19.3043 23.7802 20.2307 23.4325C21.0221 23.1254 21.7408 22.6568 22.341 22.0565C22.9413 21.4563 23.4099 20.7376 23.717 19.9462C24.0652 19.0193 24.2519 18.0422 24.2717 17.0504C24.3287 15.7767 24.3459 15.3728 24.3459 12.1381C24.3432 8.90471 24.3432 8.49425 24.2691 7.22711ZM12.4147 18.213C9.03297 18.213 6.29346 15.4734 6.29346 12.0918C6.29346 8.71007 9.03297 5.97056 12.4147 5.97056C14.0381 5.97056 15.595 6.61547 16.743 7.76342C17.8909 8.91137 18.5359 10.4683 18.5359 12.0918C18.5359 13.7152 17.8909 15.2722 16.743 16.4201C15.595 17.568 14.0381 18.213 12.4147 18.213ZM18.7795 7.1715C18.592 7.17167 18.4063 7.13487 18.2331 7.0632C18.0598 6.99153 17.9024 6.8864 17.7698 6.75382C17.6372 6.62125 17.5321 6.46383 17.4604 6.29058C17.3888 6.11732 17.352 5.93164 17.3521 5.74414C17.3521 5.55679 17.389 5.37127 17.4607 5.19817C17.5324 5.02508 17.6375 4.8678 17.77 4.73532C17.9025 4.60284 18.0598 4.49775 18.2329 4.42605C18.4059 4.35436 18.5915 4.31745 18.7788 4.31745C18.9662 4.31745 19.1517 4.35436 19.3248 4.42605C19.4979 4.49775 19.6552 4.60284 19.7876 4.73532C19.9201 4.8678 20.0252 5.02508 20.0969 5.19817C20.1686 5.37127 20.2055 5.55679 20.2055 5.74414C20.2055 6.53329 19.5673 7.1715 18.7795 7.1715Z" fill="#9CA3AF"/>
                                    <path d="M12.4147 16.0681C14.6107 16.0681 16.3909 14.2879 16.3909 12.0919C16.3909 9.89593 14.6107 8.11572 12.4147 8.11572C10.2187 8.11572 8.43848 9.89593 8.43848 12.0919C8.43848 14.2879 10.2187 16.0681 12.4147 16.0681Z" fill="#9CA3AF"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1_12341">
                                    <rect width="24" height="24" fill="white" transform="translate(0.501953 0.207275)"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                </a>
                            </li>
                            <li>
                            <a href="https://www.tiktok.com/@bytheseat" target="_blank" nofollow="" noindex="" title="TikTok">
                            	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            		<path d="M 20.125 5.792969 C 19.96875 5.710938 19.8125 5.621094 19.664062 5.527344 C 19.230469 5.238281 18.832031 4.902344 18.480469 4.519531 C 17.597656 3.507812 17.265625 2.480469 17.144531 1.761719 L 17.148438 1.761719 C 17.046875 1.167969 17.089844 0.78125 17.097656 0.78125 L 13.070312 0.78125 L 13.070312 16.347656 C 13.070312 16.554688 13.070312 16.761719 13.0625 16.964844 C 13.0625 16.992188 13.058594 17.015625 13.058594 17.042969 C 13.058594 17.054688 13.058594 17.066406 13.054688 17.078125 C 13.054688 17.078125 13.054688 17.082031 13.054688 17.085938 C 12.96875 18.21875 12.324219 19.238281 11.335938 19.796875 C 10.828125 20.085938 10.253906 20.238281 9.671875 20.238281 C 7.796875 20.238281 6.273438 18.710938 6.273438 16.820312 C 6.273438 14.929688 7.792969 13.402344 9.671875 13.402344 C 10.027344 13.402344 10.378906 13.457031 10.714844 13.566406 L 10.71875 9.46875 C 8.648438 9.203125 6.558594 9.8125 4.960938 11.15625 C 4.265625 11.757812 3.683594 12.476562 3.234375 13.28125 C 3.066406 13.574219 2.425781 14.75 2.347656 16.660156 C 2.296875 17.746094 2.625 18.867188 2.777344 19.332031 L 2.777344 19.34375 C 2.875 19.617188 3.253906 20.550781 3.871094 21.335938 C 4.367188 21.96875 4.957031 22.523438 5.613281 22.980469 L 5.617188 22.972656 L 5.625 22.980469 C 7.574219 24.304688 9.734375 24.21875 9.734375 24.21875 C 10.109375 24.203125 11.359375 24.21875 12.785156 23.542969 C 14.363281 22.796875 15.261719 21.683594 15.261719 21.683594 C 15.835938 21.019531 16.292969 20.257812 16.609375 19.441406 C 16.976562 18.484375 17.097656 17.335938 17.097656 16.875 L 17.097656 8.617188 C 17.144531 8.648438 17.796875 9.078125 17.796875 9.078125 C 17.796875 9.078125 18.734375 9.679688 20.195312 10.070312 C 21.242188 10.347656 22.65625 10.40625 22.65625 10.40625 L 22.65625 6.410156 C 22.160156 6.464844 21.15625 6.308594 20.125 5.792969 Z M 20.125 5.792969 " fill="#9CA3AF"></path>
                            	</svg>
                            </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/imperium-jets/" target="_blank" nofollow="" noindex="">
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.7254 0.207275H2.27383C1.29414 0.207275 0.501953 0.980713 0.501953 1.93696V22.4729C0.501953 23.4291 1.29414 24.2073 2.27383 24.2073H22.7254C23.7051 24.2073 24.502 23.4292 24.502 22.4776V1.93696C24.502 0.980713 23.7051 0.207275 22.7254 0.207275ZM7.62227 20.6588H4.05977V9.20259H7.62227V20.6588ZM5.84102 7.64165C4.69727 7.64165 3.77383 6.71821 3.77383 5.57915C3.77383 4.44009 4.69727 3.51665 5.84102 3.51665C6.98008 3.51665 7.90352 4.44009 7.90352 5.57915C7.90352 6.71353 6.98008 7.64165 5.84102 7.64165ZM20.9535 20.6588H17.3957V15.0901C17.3957 13.7635 17.3723 12.0526 15.5441 12.0526C13.6926 12.0526 13.4113 13.501 13.4113 14.9963V20.6588H9.8582V9.20259H13.2707V10.7682H13.3176C13.791 9.86821 14.9535 8.91665 16.6832 8.91665C20.2879 8.91665 20.9535 11.2885 20.9535 14.3729V20.6588Z" fill="#9CA3AF"/>
                                </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-payments">
                        <h5>Payments methods</h5>
                        <ul>
                            <li><img src="/assets/images/home/cards/master.svg" alt="master"></li>
                            <li><img src="/assets/images/home/cards/visa.svg" alt="visa"></li>
                            <li><img src="/assets/images/home/cards/amex.svg" alt="amex"></li>
                            <li><img src="/assets/images/home/cards/paypal.svg" alt="paypal"></li>
                            <li><img src="/assets/images/home/cards/bitcoin.svg" alt="bitcoin"></li>
                            <li><img src="/assets/images/home/cards/discover.svg" alt="discover"></li>
                        </ul>
                    </div>
                </div>
                <ul class="footer-companies">
                    <li>
                        <a class="frhzbus" target="_blank"
                            href="https://www.bbb.org/us/ca/los-angeles/profile/aviation-services/imperium-jets-inc-1216-
                            1293605#bbbseal" title="Imperium Jets, Inc. is a BBB Accredited Aviation Service in Los
                            Angeles, CA" style="position: relative;overflow: hidden; width: 200px; height: 42px; margin:
                            0px; padding: 0px;" ><img style="padding: 0px; border: none;"
                            src="https://seal-sanjose.bbb.org/logo/frhzbus/imperium-jets-1293605.png" width="200"
                            height="42" alt="Imperium Jets, Inc. is a BBB Accredited Aviation Service in Los Angeles,
                            CA" /></a>
                    </li>
                    <li><img src="/assets/images/home/companies/nbaa.png" width="129" height="30" alt="nbaa"></li>
                    <li><img src="/assets/images/home/companies/dot.svg" width="194" height="57" alt="dot"></li>
                    <li><img src="/assets/images/home/companies/excellece.svg" width="127" height="32" alt="review"></li>
                </ul>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <div class="footer-bottom">
                    <ul>
                        <li><a href="https://bytheseat.com/terms" target="_blank">Terms of Use</a></li>
                        <!-- <li><a href="https://bytheseat.com/terms-flight" target="_blank">Terms of Flight</a></li> -->
                        <li><a href="https://bytheseat.com/privacy" target="_blank">Privacy</a></li>
                        <li><a href="https://bytheseat.com/cookies" target="_blank">Cookies</a></li>
                        <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" rel="nofollow noopener" target="_blank">Covid-19 Guidelines</a></li>
                    </ul>
                    <div class="external-links">
                        <p>© 2022 Imperiun jets. All rights reserved.</p>
                        <div>
                            <a href="https://tcrcinfo.org/" target="_blank">TCRC</a> ID: #708461 / <a href="https://oag.ca.gov/travel" target="_blank">Seller of Travel</a> ID: #2146363-40
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    import {ref, reactive} from 'vue'
    import axios from 'axios'
    let email = ref('');
    let email_error = ref('');
    let mailSent = ref(false);
    let inProgress = ref(false);

    const base_url = import.meta.env.VITE_BASE_URL;
    let subscribe = (e) => {
        // e.preventDefault();
        if(email.value != '' && validateEmail(email.value)){
        //    Send Mail
        inProgress.value = true;
        let detail = {
            name : 'not provided',
            email : email.value,
            msg : 'User has subscribed to email.'
        };
            axios.post(base_url + 'ext.charter/contact', detail, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                inProgress.value = false;
                if(response.data.result){
                    email.value = '';
                    mailSent.value = true;

                }else{

                }
            }, (error) => {
                console.log(error);
            });
        } else{
            if(email.value == '')
                email_error.value = 'Please enter this field';
        }
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    };

    function checkError(e){
        if(e.target.value ==''  ){
            if(e.target.name == 'email'){
                email_error.value = 'Please enter this field';
            }
        }else{
            if(validateEmail(e.target.value)){
                email_error.value = '';
            }else{
                email_error.value = 'Please enter this field';
            }
        }
    }
    
</script>

 
 