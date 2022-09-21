
<template>
    <div data-trip="round" id="roundTripBlock" class="single-trip step-1">
        <div class="search-box">
            <div class="search-field">
                <div class="field-title">
                    <img src="assets/images/svg/origin.svg" alt="icon" />Origin 
                </div>
                <SearchPlaceinput type="origin"/>
            </div>
            <div class="field-swap">
                <button>
                <img src="assets/images/svg/left-right.svg" alt="icon"/>
            </button>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="assets/images/svg/destination.svg" alt="icon" />Destination
                </div>
                <!-- <input type="text" placeholder="Ben Gurion Intl (TLV)" /> -->
                <SearchPlaceinput type="destination"/>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="assets/images/svg/depart.svg" alt="icon" />Depart
                </div>
                <!-- <input type="text" placeholder="14/07/2022-19/07/2022" /> -->
                  <datepicker v-model="picked"  inputFormat="MM/dd/yyyy"/>

            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="assets/images/svg/travelers.svg" alt="icon" />Travelers
                </div>
                <div class="dropdown-block">
                    <button class="btn-dropdown" data-dropdown="travelers" @click="togglePassangerCount = !togglePassangerCount">{{ passangerCount }} Passanger <img src="assets/images/svg/dropdown.svg" alt="icon"></button>
                    <div id="travelers" v-bind:class="['dropdown', { 'active' : togglePassangerCount }]" class="">
                        <div class="counter">
                            <button class="btn btn-counter" @click="passangerCount > 1 ? passangerCount-- :''">-</button>
                            <div class="count">{{  passangerCount }}</div>
                            <button class="btn btn-counter" @click="passangerCount++ ">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div data-btn="next" class="search-button">
                <button id="searchRoundTrip" class="btn btn-primary" @click="search()">
                    Next <img src="assets/images/svg/next.svg" alt="icon"/>
                </button>
            </div>
            <div data-btn="change" class="search-button">
                <button id="searchRoundTrip" class="btn btn-primary">Change</button>
            </div>
        </div>
    </div>

</template>

<script setup>

import SearchPlaceinput from './SearchPlaceInput.vue'
import emitter from 'tiny-emitter/instance'



import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())
const togglePassangerCount = ref(false);
const passangerCount = ref(1);
let searchRequest = {
                        name : 'roni ron',
                        email : 'ron.bentata@gmail.com',
                        phone : '050-1234567',
                        msg:'testing this',
                        aircraft:1,
                        origin:'',
                        dest : '',
                        date:picked.value,
                        pax:passangerCount.value
                    };

function forceRender1(){
    console.log('ref');
}

emitter.on('updateInput', function (type,value) {
    if(type === 'origin'){
        searchRequest.origin = value;
    } else {
        searchRequest.dest.value = value;
    }
});



function search(){
            emitter.emit('updateSearch', searchRequest);


}
    
</script>

