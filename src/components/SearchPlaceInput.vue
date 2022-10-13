<template>
    <input
    :id="props.type "
    ref="searchInput"
    autocomplete="off"
    @focus="handleFocus"
    @focusout="handleFocusOut"
        type="text"
        placeholder="Select or search airport"
        :value="searchTerm" 
        @input="e => searchTerm = e.target.value"
        @click="initialize()"
        @keyup="searchOrigin()"/>
        <ul class="airport-listing" v-if="typeof list != 'undefined' && list.length  && showList">
            <li v-for="org in list" :key="org.name" @click="selectOrigin($event, org)">
                <div class="airtport-block">
                    <div>
                        <h5>{{org.name}}</h5>
                        <p>{{org.address}}</p>
                    </div>
                    <h4>{{org.code}}</h4>
                </div>
            </li>
        </ul>
</template>

<script setup>

    import axios from 'axios'
    import {ref} from "vue";
    import emitter from 'tiny-emitter/instance'
    const base_url = import.meta.env.VITE_BASE_URL;
    
    const props = defineProps({type: String, defaultData : Array, defaultValue:String})

    import { default_list } from "./DefaultData"

    const defaultData = ref(default_list);

    const vm = ref(this);

    let origin = ref('')
    let searchTerm = ref(props.defaultValue)
    let destination = ref('')
    let list = ref(props.defaultData);
    let firstClick = true;
    let copy = list;
    let showList = ref(false)


    emitter
    .on('exchangeInputField', function (value) {
        if(value.type == props.type){
              searchTerm.value = value.value;
        }
    });


    emitter
    .on('reset', function () {
       searchTerm.value = '';
       list.value = defaultData.value;
    });

    emitter
    .on('focuInput', function (value) {
        if(value.type == 'origin'){
            //   vm.$refs.searchInput.$el.focus();
            document.getElementById("origin").focus();
            initialize();
        }else if(value.type == 'destination'){
            document.getElementById("destination").focus();
            initialize(); 
        }
    });

    const selectOrigin = (event, country) => {
        origin.value = country.name
        searchTerm.value = `${country.name}  [${country.code}]`
        // list.value = [];
         showList.value = false;
        let val = `${country.name}  [${country.code}]`;

        
        emitter.emit('updateInput', props.type, {name : val, details : country});

        if(props.type == 'origin')
            emitter.emit('focuInput', {type : 'destination'});

        if(props.type == 'destination')
            emitter.emit('focuInput', {type : 'dateTimePicker'});
    }

    const initialize = async() => {
        if(firstClick){
            list.value = defaultData.value;
            firstClick = false;
        }

    }

    const  searchOrigin = async() => {
        if (searchTerm.value != '') {

            if(searchTerm.value.length < 2)
             return;

           await axios.post(base_url+'ext.charter/airport', {
                srcterms: searchTerm.value
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {

                if (response.data.result) {
                    list.value = response.data.error;
                } else {
                    list.value =[];
                }
            }, (error) => {
                console.log(error);
            });
        } else {
            list.value = defaultData.value;
        }
    };

    function handleFocusOut(){
        setTimeout(function(){
            showList.value = false;
        },200);
        
    }

    function handleFocus(){
        setTimeout(function(){
            showList.value = true;
        },200);
    }
</script>