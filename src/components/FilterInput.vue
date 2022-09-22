<template>
    <div data-trip="round" id="roundTripBlock" class="single-trip step-1">
        <div class="search-box">
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/origin.svg" alt="icon"/>Origin
                </div>
                <SearchPlaceinput type="origin" />
            </div>
            <div class="field-swap">
                <button>
                    <img src="/assets/images/svg/left-right.svg" alt="icon"/>
                </button>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/destination.svg" alt="icon"/>Destination
                </div>
                <SearchPlaceinput type="destination"/>
            </div>
            <div class="search-field">
                <div class="field-title">
                    <img src="/assets/images/svg/depart.svg" alt="icon"/>Depart
                </div>
                <DatePicker class="single-input" v-model="date" :columns="1" title-position="left" >
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
            <div data-btn="next" class="search-button">
                <button id="searchRoundTrip" class="btn btn-primary" @click="search()">
                    Next
                    <img src="/assets/images/svg/next.svg" alt="icon"/>
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
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/dist/style.css';
    import {ref, reactive} from 'vue'
    const picked = ref(new Date())
    const togglePassangerCount = ref(false);
    const passangerCount = ref(1);
    const date = ref(new Date());

    let searchRequest = {
        origin: '',
        dest: '',
        date: picked.value,
        pax: passangerCount.value
    };

    function forceRender1() {
        console.log('ref');
    }

    emitter
        .on('updateInput', function (type, value) {
            if (type === 'origin') {
                searchRequest.origin = value;
            } else {
                searchRequest.dest = value;
            }
        });

    function search() {
        // if(searchRequest.origin == ''){
        //     alert('Orgin is required');
        // }else if(searchRequest.dest == ''){
        //     alert('dest is required');
        // }else{
            searchRequest.pax = passangerCount.value;
            searchRequest.date = date.value;
            emitter.emit('updateSearch', {data : searchRequest, path : 'filter-result', from: 'search'});
        // }
    }
    
</script>