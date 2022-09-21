<template>
<div class="overlay">
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Add Final Status</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="SearchFilterTable">
                           <span id="cph1_Label5">Final Status<label style="color:red">*</label>:</span>
                        </td>
                        <td style="border: 0px;">
                           <select name="final_status" v-model="final_status"  class="form-control" >
                              <option value="0" selected="selected">--Select--</option>
                              <option value="positive" >Positive</option>
                              <option value="rejected">Rejected</option>
                              <option value="fail">Fail</option>
                           </select>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('final_status') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="SearchFilterTable">
                           <span id="cph1_Label7">Remarks :</span>
                        </td>
                        <td style="border: 0px;">
                           <textarea name="remark"  class="form-control" rows="3" cols="20" v-model="remark" ></textarea>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('remark') }}</small>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="checkAndProcess">Submit</button>
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Cancel</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
<script>
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   export default {
       data () {
          return {
             final_status:0,
             remark:''              
          }
       },
       props:{
           currenSelectedCase:{
               type: Number
           }
       },
       validators: {
         final_status: function(value) {
            return Validator.custom(function () {
               if (Validator.isEmpty(value) || value == 0 ) {                  
                  return 'Please select valid option.';
               }
            });
         },  
         remark: function(value) {
            return Validator.value(value).required('This field is required.');
         },       
      },
       methods:{
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           checkAndProcess(){
              let vm = this;
               this.$validate()
                  .then(function(success) {
                     if (success) {
                        vm.updateFinalStatus();
                     }
               });
           },
           resetForm(){
              this.final_status = 0;
               this.remark = '';
               this.validation.reset();
           },
           updateFinalStatus(){
              this.$loading.show({delay:0})   //delay 0ms, default is 300ms
              let vm  = this;              
              let formData = new FormData();                      
               formData.append('case_status', this.final_status);
               formData.append('case_id', this.currenSelectedCase);
               formData.append('remark', this.remark);
               axios.post('https://severify.com/api/cases/final-status', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  let msg = 'Status successfully updated.';
                  if(response.data.status){
                     vm.resetForm();
                     vm.closeModal();
                  }else{
                     msg = 'Some error occured, please try again.';
                  }
                  vm.$toast.open({
                     message:msg,
                     type:response.data.status?'success':'error',
                     position:'top-right',
                     duration:3000,
                     dismissible:true
                  });
               })
               .catch(function(){
               });
           }
       }
   
   }
</script>