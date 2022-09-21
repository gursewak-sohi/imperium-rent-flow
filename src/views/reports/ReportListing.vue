<template>
<div class="overlay">
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Report Listing</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">

               <CDataTable
               :hover="false"
               striped
               fixed
               :items="json_data"
               :fields="['bank_name','product_name','channel' ,'reference_number' ,'applicant_name' ,'created_at' ,'file_type' ,'resi_address' ,'residence_city' ,'business_resi','business_city','rv_agent_name','bv_agent_name','mileage','geo_limit','status_rv','status_bv','rate' ,'loan_amount','vehicle','negative_rv_status' ,'negative_bv_status' ,'rv_image_available','bv_image_available' ,'rv_final_status' ,'rv_final_comment' ,'bv_final_status','bv_final_comment' ,'distance_from_office','pin_code_as_per_agent_location']"
               :items-per-page="10"
               pagination
               >

               
              
            </CDataTable>
               
              
            </div>
            <div class="modal-footer">

               <download-excel
               Download Excel
                
                 
                  ref="usernameInput"
                  class="btn btn-default"
                  :data="json_data"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  name="report.xls"
                  >
                <font color="green" style="float:right">  Download Excel.</font>
               </download-excel>
               <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" >Download Excel</button> -->
               <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeModal">Cancel</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
<script>
   import downloadexcel from "vue-json-excel";
   import SimpleVueValidation from 'simple-vue-validator';
import Table from '../base/Table.vue';
   const Validator = SimpleVueValidation.Validator;
   export default {
  components: { Table , downloadexcel,},
       data () {
          return {
             final_status:0,
             remark:''              
          }
       },
       props:{
           json_data:{
               type: Array,
               default: () => []
            }
       },
       
       methods:{
          closeModal(){
            this.$emit('closeModal', 'Value if required')
         },
           
       }
   
   }
</script>