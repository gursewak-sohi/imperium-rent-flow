<template>
     <section class="search-section">
            <div class="container">
                <div class="mega-search">
                    <div id="searchTypeBlock" class="radio-options">
                        <div class="radio-unit">
                            <input id="oneWay" type="radio" value="one-way" name="flight-type" checked />
                            <label for="oneWay">
                                <span></span>One way
                        </label>
                        </div>
                        <div class="radio-unit">
                            <input id="roundTrip" type="radio" value="round-trip" name="flight-type" />
                            <label for="roundTrip">
                                <span></span>Round trip
                            </label>
                        </div>
                        <div class="radio-unit">
                            <input id="multiTrip" type="radio" value="multi-trip" name="flight-type" />
                            <label for="multiTrip">
                                <span></span>Multi trip
                            </label>
                        </div>
                    </div>
                    <!-- Round Trip -->
                    <FilterInput />
                    <!-- Jet Type -->
                    <JetType v-if="step == 'filter-result'" :distance="distance"/>
                    <!-- Selected Jet  -->
                    <SelectedJet v-if="step === 'selected-result'" :data="data_copy" :distance="distance"/>
                </div>
            </div>
        </section>
</template>


<script setup>

    import FilterInput from './FilterInput.vue'
    import JetType from './JetType.vue'
    import SelectedJet from './SelectedJet.vue'
    import emitter from 'tiny-emitter/instance'
    import {ref} from "vue";
    import axios from 'axios'

    let step = ref('initial');  
    let distance = ref('Not Found.');
    
    let allDetails = {
        name : '' ,
        email :'',
        phone:'',
        msg:'',
        aircraft:'',
        origin:'',
        dest:'',
        date:'',
        pax:'',
        at:'',
        dt:'',
        origin_details :{},
        destination_details :{},

    };
    let data_copy = ref(allDetails);

     emitter.on('exchangeInput', function () {
        let temp = allDetails.origin;
        allDetails.origin = allDetails.dest;
        allDetails.dest = origin;

         let temp_d = allDetails.origin_details;
        allDetails.origin_details = allDetails.destination_details;
        allDetails.destination_details = temp_d;
     });
    emitter.on('updateSearch', function (value) {
        if(value.path){
            step.value = value.path;
        }
        
        if(value.from == 'search'){

            step.value = 'initial';
            allDetails.origin = value.data.origin;
            allDetails.dest = value.data.dest;
            allDetails.pax = value.data.pax;
            allDetails.origin_details = value.data.origin_details;
            allDetails.destination_details = value.data.destination_details;
            let d = new Date(value.data.date);
            let datestring = (d.getMonth()+1)  + "/" + d.getDate() + "/" + d.getFullYear();
            allDetails.date = datestring;

            calcCrow(
                allDetails.origin_details.coords_lat, 
                allDetails.origin_details.coords_long, 
                allDetails.destination_details.coords_lat, 
                allDetails.destination_details.coords_long);
            setTimeout(function(){step.value = value.path;},400)

        }else if(value.from == 'jettype'){
            allDetails.aircraft = value.data.join(',');
        }else if(value.from == 'quoteModel'){
            allDetails.name = value.data.name;
            allDetails.email = value.data.email;
            allDetails.phone = value.data.phone_number;
            allDetails.msg = value.data.message;

             axios.post('https://test.api.impjets.com/v1/ext.charter/request', allDetails, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                emitter.emit('openQuoteMOdel', false);
                emitter.emit('openConfirmModel', true);
            }, (error) => {
                console.log(error);
            });

        }else if(value.from =='selected-jet-data'){
            allDetails.at = value.data.at;
            allDetails.dt = value.data.dt;

        }

        data_copy.value = allDetails;


        // Make Api Call....

        
            
    });   

    function calcCrow(lat1, lon1, lat2, lon2) 
    {

        let d = calc_distance(lat1, lon1, lat2, lon2);
        distance.value = d.toFixed(2);
    }

    function calc_distance(lat1, lat2, lng1, lng2){
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (
            lat1 - lat2) * Math.PI/180;
        const Δλ = (lng2 - lng1) * Math.PI/180;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (c * R * 0.000621371);
    }


    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    
    
</script>