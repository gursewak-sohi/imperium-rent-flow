<template>
<div class="overlay">
  <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle"></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
      <div class="modal-body">
        <download-excel
        @click="closeModal"
            ref="myBtn"
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="filename.xls"
            >
           <a> Your Excel is ready!
            Would you like to Download</a>
        </download-excel>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import JsonExcel from "vue-json-excel";
export default {
    data () {
       return {
         json_fields: {
                     "Business CPV" : 'field',
                     "Remark" : 'value',
                },
                json_data: [
                   
                ],          
       }
    },
    components:{
      JsonExcel
    },
    props:{
        currenSelectedCase:{
            type: Number
        }
    },
    created(){
      this.getMyCaseDetails();
    },
    methods:{
        closeModal(){
            this.$emit('closeModal', 'Value if required')
        },
        getMyCaseDetails(){
         this.$loading.show({delay:0}) 
         let vm = this;
         axios.get('https://severify.com/api/cases/get-my-case-excel?id='+this.currenSelectedCase)
            .then(function (response) {
              vm.$loading.hide();
              vm.json_data = response.data.data;
              console.log('case data', vm.case_data);
         })
         .catch(function (error) {
            console.log(error);
         });

      },
    }

}
</script>