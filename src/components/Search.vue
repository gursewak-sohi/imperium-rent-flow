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
                    <SelectedJet v-if="step === 'selected-result'" :data="data_copy"/>
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
        allDetails.dest = allDetails.origin;
        allDetails.origin = temp;
     });
    emitter.on('updateSearch', function (value) {
        if(value.path){
            step.value = value.path;
        }
        
        if(value.from == 'search'){
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

        console.log(allDetails.origin_details, 'allDetails final')
        data_copy.value = allDetails;


        // Make Api Call....

        
            
    });   

    function calcCrow(lat1, lon1, lat2, lon2) 
    {

        console.log(lat1, lon1, lat2, lon2);
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = (R * c) * 0.621371;
      distance.value = d.toFixed(2);
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
    
</script>