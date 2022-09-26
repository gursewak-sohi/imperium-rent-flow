<template>
    <input
    @focus="handleFocus"
    @focusout="handleFocusOut"
    :ref="props.type"
        type="text"
        placeholder="Ben Gurion Intl (TLV)"
        v-model="searchTerm"
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
    const defaultData = ref([]);
    const props = defineProps({type: String, defaultData : Array, defaultValue:String})

    console.log(props, 'props');
    

    const vm = ref(this);

    let origin = ref('')
    let searchTerm = ref(props.defaultValue)
    let destination = ref('')
    let list = ref(props.defaultData);
    let firstClick = true;
    let copy = list;
    let showList = ref(false)

    // Start
    axios.post('https://test.api.impjets.com/v1/ext.charter/airport', {
            srcterms: 'aa'
        },
        {
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            defaultData.value = response.data.error;
        }, (error) => {
            console.log(error);
    });
    // End

    emitter
    .on('exchangeInputField', function (value) {
        if(value.type == props.type){
              searchTerm.value = value.value;
        }
    });

    const selectOrigin = (event, country) => {
        origin.value = country.name
        searchTerm.value = country.name;
        // list.value = [];
         showList.value = false;
        let val = `${country.name}  [${country.code}]`;
        emitter.emit('updateInput', props.type, {name : val, details : country});
    }

    const initialize = async() => {
        if(firstClick){
            console.log('First Click');
            list.value = defaultData.value;
            firstClick = false;
        }

    }

    const  searchOrigin = async() => {
        if (searchTerm.value != '') {
           await axios.post('https://test.api.impjets.com/v1/ext.charter/airport', {
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
        },500);
        
    }

    function handleFocus(){
        setTimeout(function(){
            showList.value = true;
        },500);
    }
</script>