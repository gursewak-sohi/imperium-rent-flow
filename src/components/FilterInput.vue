<template>
    <div data-trip="round" id="roundTripBlock" :class="{'step-3' : buttonType == '', 'step-1' : buttonType != '', 'single-trip':props.tripType != 'multi-trip' , 'mutiple-search-block':props.tripType != 'multi-trip'}" >
        <div :class="{'mutiple-trips':props.tripType == 'multi-trip', 'step-1' : true}" v-for="(row, index) in allTrip"  :key="row">
            <h2 v-if="props.tripType == 'multi-trip'">Trip {{index + 1}}</h2>
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


                    <DatePicker v-if="props.tripType !== 'one-way'" is-range class="single-input"   v-model="range" :columns="1" :min-date="new Date()" @dayclick="onDayClick(event)" :is-required="true" ref="calendar" >
                        <template #default="{ range ,togglePopover, updateValue }">
                            
                            <input @click="togglePopover()" id="datepicker" readonly  :value="range" />
                        </template>
                    </DatePicker>
                
                    <DatePicker v-if="props.tripType === 'one-way'" class="single-input"   v-model="date" :columns="1" :min-date="new Date()" @dayclick="onDayClick(event)" :is-required="true" ref="calendar" >
                        <template #default="{ date ,togglePopover }">
                            
                            <input @click="togglePopover()" id="datepicker" readonly  :value="date" />
                        </template>
                    </DatePicker>
                </div>
                <div class="search-field">
                    <div class="field-title">
                        <img src="/assets/images/svg/travelers.svg" alt="icon"/>Passengers
                    </div>
                    <div class="dropdown-block">
                        <button
                            class="btn-dropdown"
                            @focusout.self="handleFocusOut"
                            @click="togglePassangerCountFun()">{{ passangerCount }}
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
                <button data-btn="remove" class="btn btn-remove" type="button" v-if="props.tripType == 'multi-trip'" @click="removeTrip(index)">
                    <img src="/assets/images/svg/delete-row.svg" alt="remove"/>
                </button>
                <div class="search-button" v-if="props.tripType != 'multi-trip'">
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
        <div class="mutiple-search-button" v-if="props.tripType == 'multi-trip'">
            <button class="btn btn-md btn-dark-outline btn-iconed-lg" @click="addTrip()"><img src="/assets/images/svg/plus.svg" alt="icon"  > Add trip</button>
            <button id="searchMultiTrip" class="btn btn-md btn-primary btn-iconed-lg">Next <img src="/assets/images/svg/next.svg" alt="icon"/></button>
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

    const props = defineProps({
            tripType: String,
    })
    const picked = ref(new Date())
    let allTrip = ref([1]);

    
    const togglePassangerCount = ref(false);
    const passangerCount = ref(1);
    const date = ref(new Date());
    let lastDay = date.value;
    const defaultData = ref([]);
    const buttonType = ref('next');
    const calendar = ref(null);

    let defaultDest = ref('');
    let defaultOrigin = ref('');
    let toggleIcon = ref(false);

    let incredecre = ref(false);
    let range = ref({
      start: new Date(),
      end: new Date()
    });

    function addTrip(){
        let arr = allTrip.value;
        let last = arr[arr.length -1];
        arr.push(++last);
    }

    function removeTrip(index){
        let arr = allTrip.value;
        arr.splice(index, 1);
    }

    let searchRequest = {
        origin: '',
        dest: '',
        date: picked.value,
        pax: passangerCount.value,
        origin_details :{},
        destination_details :{},
    };
    let copySearchRequest =  {
        origin: '',
        dest: '',
        date: picked.value,
        pax: passangerCount.value,
        origin_details :{},
        destination_details :{},
    };;

    function forceRender1() {
    }
    let timeoutVar;
    function togglePassangerCountFun(){

         if(clearTimeout)
            clearTimeout(timeoutVar);
        togglePassangerCount.value = !togglePassangerCount.value;
        timeoutVar = setTimeout(function(){
            togglePassangerCount.value = false
            },1500);
    }

    emitter
    .on('dateRest', function () {
         setTimeout(function(){
            if(props.tripType === 'one-way'){
                document.getElementById('datepicker').placeholder = dateToYMD(new Date());
                date.value = new Date();
        }else{
                range.value ={start : new Date(), end : new Date()};
                // range.value.end = new Date();
                document.getElementById('datepicker').placeholder = dateToYMD(new Date()) + '-'+ dateToYMD(new Date());             
                date.value = dateToYMD(new Date()) + '-'+ dateToYMD(new Date());
        }
        },400);
       buttonType.value = 'next';
    });

    emitter
    .on('reset', function () {
       date.value = new Date();
       searchRequest = {
        origin: '',
        dest: '',
        date: picked.value,
        pax: passangerCount.value,
        origin_details :{},
        destination_details :{},
    };
       passangerCount.value = 1;
       buttonType.value = 'next';
    });

    function dateToYMD(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return ''+ (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/'   + y ;
    }

    setTimeout(function(){
        if(props.tripType === 'one-way'){
            document.getElementById('datepicker').placeholder = dateToYMD( new Date());
            date.value = dateToYMD( new Date());
       }else{
            document.getElementById('datepicker').placeholder = dateToYMD( new Date()) + '-'+ dateToYMD( new Date());
             date.value = dateToYMD( new Date()) + '-'+ dateToYMD( new Date());

       }

    },200);
    


    function onDayClick(e){


       if(props.tripType === 'one-way'){
            // if(!date.value)
                
            emitter.emit('focuInput', {type : 'passengerCount'});
            document.getElementById('datepicker').placeholder = dateToYMD(date.value);
            date.value = dateToYMD(date.value);
       }else{
            document.getElementById('datepicker').placeholder = dateToYMD(range.value.start) + '-'+ dateToYMD(range.value.end);
            date.value = dateToYMD(range.value.start) +'-'+ dateToYMD(range.value.end);

       }
    }
    // 
    

    emitter
    .on('focuInput', function (value) {

        if(value.type == 'dateTimePicker'){
            setTimeout(function(){document.getElementById("datepicker").click()},200);
            // this.togglePopover();
            //  calendar.move(5)
           
        }else if(value.type == 'passengerCount'){
            togglePassangerCount.value = true;

            timeoutVar = setTimeout(function(){
                togglePassangerCount.value = false;
            },1500)
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
        if(clearTimeout)
            clearTimeout(timeoutVar);
        incredecre.value = true;
        if(type == 'decrement'){
            if(passangerCount.value > 1)
                passangerCount.value = passangerCount.value -1;
        } else {
            passangerCount.value = passangerCount.value + 1;
        }

        timeoutVar = setTimeout(function(){
                togglePassangerCount.value = false;
            },1500)
        setTimeout(function(){
            incredecre.value = false;
        },300)
    }

    function search() {

        console.log(searchRequest, 'Search Result');
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
            
            setTimeout(function(){
                document.getElementById('chooseJetType').scrollIntoView({behavior: "smooth", block: "start"});
            },500);
             
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