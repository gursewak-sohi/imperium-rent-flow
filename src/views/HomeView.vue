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
                        <h1>Get Immediate Qutes Today!</h1>
                        <a href="javascript:;" class="btn btn-primary btn-sm btn-iconed">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 2.67908C6.986 2.67908 2.5 7.16508 2.5 12.6791V16.8221C2.5 17.8461 3.397 18.6791 4.5 18.6791H5.5C5.76522 18.6791 6.01957 18.5737 6.20711 18.3862C6.39464 18.1986 6.5 17.9443 6.5 17.6791V12.5361C6.5 12.2709 6.39464 12.0165 6.20711 11.829C6.01957 11.6414 5.76522 11.5361 5.5 11.5361H4.592C5.148 7.66608 8.478 4.67908 12.5 4.67908C16.522 4.67908 19.852 7.66608 20.408 11.5361H19.5C19.2348 11.5361 18.9804 11.6414 18.7929 11.829C18.6054 12.0165 18.5 12.2709 18.5 12.5361V18.6791C18.5 19.7821 17.603 20.6791 16.5 20.6791H14.5V19.6791H10.5V22.6791H16.5C18.706 22.6791 20.5 20.8851 20.5 18.6791C21.603 18.6791 22.5 17.8461 22.5 16.8221V12.6791C22.5 7.16508 18.014 2.67908 12.5 2.67908Z" fill="white"/>
                            </svg> Call support center
                        </a>
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
                    <div class="support-unit">
                        <h5>Need help?</h5>
                        <a class="support-content" href="javascript:;">
                            <img src="/assets/images/svg/support.svg" alt="icon" />Support Center
                        </a>
                    </div>
                    <div class="support-unit">
                        <h5>Contact us:</h5>
                        <a class="support-content" href="mailto:Support@bytheseat.com">
                            <img src="/assets/images/svg/emailsvg.svg" alt="icon" />Support@bytheseat.com
                        </a>
                        <a class="support-content space-16" href="mailto:Support@bytheseat.com">
                            <img src="/assets/images/svg/phone.svg" alt="icon" />+1.310.817.2621
                        </a>
                    </div>
                    <div class="support-unit">
                        <h5>Our office:</h5>
                        <a class="support-content" href="mailto:Support@bytheseat.com">
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




