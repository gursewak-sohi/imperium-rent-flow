<template>
    <div data-trip="round" id="roundTripBlock" :class="{'step-3' : buttonType == '', 'step-1' : buttonType != ''}" class="single-trip">
        <div class="search-box">
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/origin.svg" alt="icon"/>Origin
                </div>
                <SearchPlaceinput type="origin" :defaultData="defaultOrigin"   />
            </div>
            <div class="field-swap" :class="{ 'swapped' : toggleIcon}">
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
               
                <DatePicker class="single-input"   v-model="date" :columns="1" :min-date="new Date()" @dayclick="onDayClick" ref="calendar" >
                    <template #default="{ inputValue ,togglePopover }">
                          
                        <input @click="togglePopover()" id="datepicker" readonly  :value="inputValue" />
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
                    <img src="/assets/images/svg/travelers.svg" alt="icon"/>Passengers
                </div>
                <div class="dropdown-block">
                    <button
                        class="btn-dropdown"
                        @focusout.self="handleFocusOut"
                        @click="togglePassangerCount = !togglePassangerCount">{{ passangerCount }}
                        {{ passangerCount > 1 ? 'Passengers' : 'Passenger'}}
                    </button>
                    <div
                        v-bind:class="['dropdown', { 'active' : togglePassangerCount }]"
                        class="">
                        <div class="counter">
                            <button
                                class="btn btn-counter"
                                @focusout.self="handleFocusOut"
                                @click.stop.prevent="changeCount($event,'decrement')">-</button>
                            <div class="count">{{  passangerCount }}</div>
                            <button class="btn btn-counter" @focusout.self="handleFocusOut" @click.stop.prevent="changeCount($event,'increment')">+</button>
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
    const calendar = ref(null);

    console.log()

    let defaultDest = ref('');
    let defaultOrigin = ref('');
    let toggleIcon = ref(false);

    let incredecre = ref(false);


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

    function onDayClick(){
        emitter.emit('focuInput', {type : 'passengerCount'});

    }
    // 

    emitter
    .on('focuInput', function (value) {

        console.log(value, 'from input')
        if(value.type == 'dateTimePicker'){
            setTimeout(function(){document.getElementById("datepicker").click()},200);
            // this.togglePopover();
            //  calendar.move(5)
           
        }else if(value.type == 'passengerCount'){
            togglePassangerCount.value = true;
        }
    });

    function exchangeOriDest(){
        toggleIcon.value = !toggleIcon.value;
        let org = searchRequest.origin;
        searchRequest.origin = searchRequest.dest;
        searchRequest.dest = org;
        emitter.emit('exchangeInputField', {type : 'origin', value :searchRequest.origin} );
        emitter.emit('exchangeInputField', {type : 'destination', value :searchRequest.dest} );
         emitter.emit('exchangeInput');
    }

    emitter
        .on('updateInput', function (type, value) {

            console.log(type, value, '-----');
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

    function changeCount(event, type){
        incredecre.value = true;
        if(type == 'decrement'){
            if(passangerCount.value > 1)
                passangerCount.value = passangerCount.value -1;
        } else {
            passangerCount.value = passangerCount.value + 1;
        }
        setTimeout(function(){
            incredecre.value = false;
        },300)
    }

    function search() {
        if(searchRequest.origin == ''){
             emitter.emit('focuInput', {type : 'origin'});
        }else if(searchRequest.dest == ''){
             emitter.emit('focuInput', {type : 'destination'});
        }else{
            searchRequest.pax = passangerCount.value;
            searchRequest.date = date.value;
            togglePassangerCount.value = false;
            buttonType.value = 'change';
            emitter.emit('updateSearch', {data : searchRequest, path : 'filter-result', from: 'search'});
            window.scrollBy(0, 100);
        }
    } 

    function changeStep(){
    }

    function handleFocusOut(){
        setTimeout(function(){
            if(!incredecre.value){
                togglePassangerCount.value = false;
            }
        },200);
        
    }
    
</script>