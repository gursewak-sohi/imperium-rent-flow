<template>
    <input
        type="text"
        placeholder="Ben Gurion Intl (TLV)"
        v-model="searchTerm"
        @keyup="searchOrigin()"/>
        <ul class="airport-listing" v-if="typeof list != 'undefined' && list.length">
            <li v-for="org in list" :key="org.name" @click="selectOrigin(org)">
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

    const props = defineProps({type: String})

    const vm = ref(this);

    let origin = ref('')
    let searchTerm = ref('')
    let destination = ref('')
    let list = ref([]);

    const selectOrigin = (country) => {
        origin.value = country.name
        searchTerm.value = country.name;
        list.value = [];
        let val = `${country.name}  [${country.code}]`;
        emitter.emit('updateInput', props.type, val);

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
                    list.value = [];
                }
            }, (error) => {
                console.log(error);
            });
        } else {
            list.value = [];
        }
    };
</script>