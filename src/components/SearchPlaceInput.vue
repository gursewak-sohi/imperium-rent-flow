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

    function searchOrigin() {
        if (searchTerm.value != '') {
            axios.post('https://test.api.impjets.com/v1/ext.charter/airport', {
                srcterms: searchTerm.value
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data.error);
                if (response.data.result) {
                    this.list = response.data.error;
                } else {
                    this.list = [];
                }
            }, (error) => {
                console.log(error);
            });
        } else {
            this.list = [];
        }
    };
</script>