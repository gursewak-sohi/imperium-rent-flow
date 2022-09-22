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
                    <JetType v-if="step == 'filter-result'"/>
                    <!-- Selected Jet  -->
                    <SelectedJet v-if="step === 'selected-result'"/>
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
    emitter.on('updateSearch', function (value) {
        step.value = value.path;
        console.log(value, 'Value');

        // Make Api Call....

         axios.post('https://test.api.impjets.com/v1/ext.charter/request', {
                name : 'roni ron' ,
                email :'ron.bentata@gmail.com',
                phone:'050-1234567',
                msg:'testing this',
                aircraft:'1',
                origin:'San Diego [KSAN]',
                dest:'Las Vegas [KLAS]',
                date:'10/19/2022',
                pax:'2'
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response, '123');
                // if (response.data.result) {
                //     this.list = response.data.error;
                // } else {
                //     this.list = [];
                // }
            }, (error) => {
                console.log(error);
            });
            
    });   
    
</script>