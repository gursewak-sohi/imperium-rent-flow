<template>
    <div data-trip="round" id="roundTripBlock" :class="{'step-3' : buttonType == '', 'step-1' : buttonType != ''}" class="single-trip step-1">
        <div class="search-box">
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/origin.svg" alt="icon"/>Origin
                </div>
                <SearchPlaceinput type="origin" :defaultData="defaultOrigin"   />
            </div>
            <div class="field-swap">
                <button @click="exchangeOriDest()">
                    <img src="/assets/images/svg/left-right.svg" alt="icon"/>
                </button>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/destination.svg" alt="icon"/>Destination
                </div>
                <SearchPlaceinput type="destination"  :defaultValue="defaultDest"/>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/depart.svg" alt="icon"/>Depart
                </div>
                <DatePicker class="single-input" v-model="date" :columns="1" >
                    <template #default="{ inputValue ,togglePopover }">
                        <input @click="togglePopover()" readonly  :value="inputValue" />
                    </template>
                </DatePicker>
                
                <!-- Code for dater range picker -->
                <!-- <DatePicker v-model="range" :columns="2" is-range> 
                    <template v-slot="{ inputValue, inputEvents}">
                        <div>
                            <input type="text" id="start" :value="inputValue.start" v-on="inputEvents.start">
                            <input type="text" id="end" :value="inputValue.end" v-on="inputEvents.end">
                        </div>
                    </template>
                </DatePicker> -->
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/travelers.svg" alt="icon"/>Travelers
                </div>
                <div class="dropdown-block">
                    <button
                        class="btn-dropdown"
                        data-dropdown="travelers"
                        @focusout="handleFocusOut"
                        @click="togglePassangerCount = !togglePassangerCount">{{ passangerCount }}
                        Passanger
                        <img src="/assets/images/svg/dropdown.svg" alt="icon"/></button>
                    <div
                        id="travelers"
                        v-bind:class="['dropdown', { 'active' : togglePassangerCount }]"
                        class="">
                        <div class="counter">
                            <button
                                class="btn btn-counter"
                                @click="passangerCount > 1 ? passangerCount-- :''">-</button>
                            <div class="count">{{  passangerCount }}</div>
                            <button class="btn btn-counter" @click="passangerCount++ ">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-button">
                <button class="btn btn-primary" @click="search()" v-if="buttonType === 'next'">
                    Next
                    <img src="/assets/images/svg/next.svg" alt="icon"/>
                </button>
                <button class="btn btn-primary" @click="search()" v-if="buttonType === 'change'">
                    Change
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import SearchPlaceinput from './SearchPlaceInput.vue'
    import emitter from 'tiny-emitter/instance'
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/dist/style.css';
    import {ref, reactive} from 'vue'
    const picked = ref(new Date())
    const togglePassangerCount = ref(false);
    const passangerCount = ref(1);
    const date = ref(new Date());
    const defaultData = ref([]);
    const buttonType = ref('next');

    let defaultDest = ref('');
    let defaultOrigin = ref('');


    let searchRequest = {
        origin: '',
        dest: '',
        date: picked.value,
        pax: passangerCount.value,
        origin_details :{},
        destination_details :{},
    };

    function forceRender1() {
        console.log('ref');
    }

    function exchangeOriDest(){
        let org = searchRequest.origin;
        searchRequest.origin = searchRequest.dest;
        searchRequest.dest = org;
        emitter.emit('exchangeInputField', {type : 'origin', value :searchRequest.origin} );
        emitter.emit('exchangeInputField', {type : 'destination', value :searchRequest.dest} );
         emitter.emit('exchangeInput');
    }

    emitter
        .on('updateInput', function (type, value) {
            if (type === 'origin') {
                // this.$refs.origin.$el.focus()
                searchRequest.origin = value.name;
                searchRequest.origin_details = value.details;
            } else {
                searchRequest.dest = value.name;
                searchRequest.destination_details = value.details;
            }
        });

    emitter
    .on('updateButtonType', function (data) {
        buttonType.value = data.value;
    });

    function search() {
        // if(searchRequest.origin == ''){
        //     alert('Orgin is required');
        // }else if(searchRequest.dest == ''){
        //     alert('dest is required');
        // }else{
            searchRequest.pax = passangerCount.value;
            searchRequest.date = date.value;
            togglePassangerCount.value = false;
            buttonType.value = 'change';
            emitter.emit('updateSearch', {data : searchRequest, path : 'filter-result', from: 'search'});
        // }
    } 

    function changeStep(){
        // buttonType.value = 'next';
        //  emitter.emit('updateSearch', {data : searchRequest, path : 'initial', from: ''});
    }

    function handleFocusOut(){
        togglePassangerCount.value = false;
    }
    
</script>