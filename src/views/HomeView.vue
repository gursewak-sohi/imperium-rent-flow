<script setup>
import QuoteModel from '../components/QuoteModel.vue'
import ConfirmModel from '../components/ConfirmModel.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Search from '../components/Search.vue'
</script>

<template>
  <main>
    <!-- Get Qoute Modal Section -->
    <QuoteModel/>
    

    <!-- Confirm Modal Section -->
    <ConfirmModel/>
    

    <!-- Header Home Section -->
    <Header/>
    
    <!-- Main Section -->
    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-block">
                    <div class="hero-text">
                        <h6>Rent your private flight</h6>
                        <h1>Get Immediate Quotes Today!</h1>
                    </div>
                </div>
            </div>
        </section>

        <!-- Search Section -->
       <Search/>

        <!-- Support Section -->
        <section class="support-section">
            <div class="container">
                <div class="support-block">
                    <!-- <div class="support-unit">
                        <h5>Call us:</h5>
                        <a class="support-content" href="tel:+13108172621">
                            <img src="/assets/images/svg/phone.svg" alt="icon" />+1.310.817.2621
                        </a>
                    </div> -->
                    <div class="support-unit">
                        <h5>Contact us:</h5>
                        <a class="support-content" href="mailto:support@impjets.com">
                            <img src="/assets/images/svg/emailsvg.svg" alt="icon" />support@impjets.com
                        </a>
                        
                    </div>
                    <div class="support-unit">
                        <h5>Our office:</h5>
                        <a class="support-content" target="_blank" href="https://www.google.com/maps/place/3705+W+Pico+Blvd,+Los+Angeles,+CA+90019,+USA/@34.0475447,-118.3237152,17z">
                            <img src="/assets/images/svg/place.svg" alt="icon" />
                            <p>3705 W Pico Blvd (#591), Los Angeles, CA, 90019-3451</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <Footer/>
    


  </main>
</template>

 



