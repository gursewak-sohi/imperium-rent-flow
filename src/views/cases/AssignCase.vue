<template>
<div class="overlay">
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Assign Case</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="label">Assign To :
                        </td>
                        <td class="value">
                           <select name="ctl00$cph1$ddlUserList" id="cph1_ddlUserList"  class="form-control" v-model="selectedAgent">
                              <option value="0">Select</option>
                              <option :value="row.id" v-for="(row, index ) in agent_list" :key="index">{{ row.first_name +' '+ row.last_name}}</option>
                           </select>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('selectedAgent') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="label">
                           <span id="cph1_lblscshdate">Assignment Time :</span>
                        </td>
                        <td valign="top" class="NoMargin">
                           <input  name="now" type="text" v-model="nowTime" disabled="disabled" class="aspNetDisabled form-control" >
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-success" data-dismiss="modal" v-on:click="verifyAndProceed">Assign</button>
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="resetForm">Reset</button>
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
             agent_list:[],
             selectedAgent: 0 ,
             nowTime: new Date()     
          }
      },      
      validators: {
         selectedAgent: function(value) {
            return Validator.custom(function () {
               if (Validator.isEmpty(value) || value == 0 ) {                  
                  return 'Please select valid option.';
               }
            });
         },         
      },
       props:{
         currenSelectedCase:{
            type: Number
         }
       },
       created(){
         axios.get("https://severify.com/api/user/list-all").then(response => {
             this.agent_list = response.data.data;
             console.log(this.agent_list);
         });
       },
       methods:{
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           resetForm(){
              this.selectedAgent = 0;
              this.nowTime = new Date();
              this.validation.reset();
           },
           verifyAndProceed(){
               let vm = this;
               this.$validate()
                  .then(function(success) {
                     if (success) {
                        vm.updateAgent();
                     }
               });
           },
           updateAgent(){
              console.log('Ready To Go.');              
              this.$loading.show({delay:0})
              let vm  = this;              
              let formData = new FormData();              
               formData.append('employee_id', this.selectedAgent);
               formData.append('case_id', this.currenSelectedCase);
               axios.post('https://severify.com/api/cases/assign-case', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  let msg = 'Case reassigned successfully.';
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