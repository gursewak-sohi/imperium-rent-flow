<template>
<div class="overlay">
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Verify Case</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="SearchFilterTable">
                           <span id="cph1_Label6">FeedBack Status</span>
                        </td>
                        <td style="border: 0px;">
                           <select name="feedback_status" class="form-control" v-model="feedback_status" @change="changeSubOptions">
                              <option value="all">All</option>
                              <option value="recommended">Recommended</option>
                              <option value="not_recomended">Not Recommended</option>
                              <option value="referal">Referral</option>
                           </select>
                            <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('feedback_status') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="SearchFilterTable">
                           <span id="cph1_Label11">Sub Status</span>
                        </td>
                        <td style="border: 0px;">
                           <select name="feedback_sub_status" class="form-control" v-model="feedback_sub_status">
                              <option value="0">Select</option>
                              <option v-for="(value, propertyName) in feedback_sub_status_op" :key="propertyName" :value="propertyName"> {{ getFormatedOption(value) }}</option>
                           </select>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('feedback_sub_status') }}</small>
                           
                        </td>
                     </tr>
                     <tr>
                        <td class="SearchFilterTable" style="border: 0px;">&nbsp;
                           <span>Remarks</span>
                        </td>
                        <td style="border: 0px;">&nbsp;
                            <textarea name="remark" rows="2" cols="20" class="form-control" v-model="feedback_remark"></textarea>
                            <small class="form-text text-muted w-100 err-msg">{{  validation.firstError('feedback_remark') }}</small>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="processRequest">Save</button>
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
             feedback_status:'all',
             feedback_remark:'',
             fb_options:{
                all:{
                     Address_and_Details_Confirmed:'Address_and_Details_Confirmed',
                     Address_confirmed_s_Other_details_not_confirmed:'Address_confirmed_s_Other_details_not_confirmed',
                     Address_not_Traceable_s_Does_Not_exists:'Address_not_Traceable_s_Does_Not_exists',
                     Any_Other_Reason__ob_Not_covered_by_above_cb_:'Any_Other_Reason__ob_Not_covered_by_above_cb_',
                     Applicant_not_applied__s__not_interested__s__cancel_Request__s__Refuse_to_give_Details:'Applicant_not_applied__s__not_interested__s__cancel_Request__s__Refuse_to_give_Details',
                     Applicant_or_Family_member_not_met:'Applicant_or_Family_member_not_met',
                     bachelor_Accommodation:'bachelor_Accommodation',
                     Business_board_available:'Business_board_available',
                     Business_Board_not_valuable:'Business_Board_not_valuable',
                     Customer_Denied:'Customer_Denied',
                     Customer_out_of_station:'Customer_out_of_station',
                     Defaulter_s_Bad_Market_Reputation:'Defaulter_s_Bad_Market_Reputation',
                     Demolished:'Demolished',
                     Detail_Refuse_s_Applicant_Not_intersted:'Detail_Refuse_s_Applicant_Not_intersted',
                     Details_Confirmed:'Details_Confirmed',
                     Details_Mismatch:'Details_Mismatch',
                     Details_not_confirmed:'Details_not_confirmed',
                     DNCA:'DNCA',
                     Door_Locked:'Door_Locked',
                     Door_locked_s_Few_details_confirmed:'Door_locked_s_Few_details_confirmed',
                     Door_No_missing:'Door_No_missing',
                     Entry_Not_Allowed:'Entry_Not_Allowed',
                     Entry_Restricted_s_Not_allowed:'Entry_Restricted_s_Not_allowed',
                     High_Risk_Customer:'High_Risk_Customer',
                     incomplete_Address:'incomplete_Address',
                     Incomplete_Address:'Incomplete_Address',
                     Incomplete_Document_s_Original_Document_Not_Shown:'Incomplete_Document_s_Original_Document_Not_Shown',
                     Information_mismatch:'Information_mismatch',
                     Issues:'Issues',
                     Kuccha_house:'Kuccha_house',
                     Left_the_job:'Left_the_job',
                     LMC_Area:'LMC_Area',
                     Locality_is_chawl_s_community_sensitive_s_kuccha_house:'Locality_is_chawl_s_community_sensitive_s_kuccha_house',
                     Low_Stability__s__Low_Setup__s__Low_Activities:'Low_Stability__s__Low_Setup__s__Low_Activities',
                     Negative_Area:'Negative_Area',
                     Negative_Neighbourhood_Check:'Negative_Neighbourhood_Check',
                     No_setup_s_Business_activity_seen:'No_setup_s_Business_activity_seen',
                     No_such_company_s_Office:'No_such_company_s_Office',
                     No_such_Person:'No_such_Person',
                     Non_targeted_Area:'Non_targeted_Area',
                     Not_Contactable_s__staying_s_working_not_Confirmed:'Not_Contactable_s__staying_s_working_not_Confirmed',
                     Out_of_Station_Less_than_1_day:'Out_of_Station_Less_than_1_day',
                     Out_of_Station_more_than_1_day:'Out_of_Station_more_than_1_day',
                     Outside_geographical_Limits:'Outside_geographical_Limits',
                     Person_does_not_exist:'Person_does_not_exist',
                     PickUp_Done:'PickUp_Done',
                     Poor_Living_Conditions:'Poor_Living_Conditions',
                     Purely_office_Address_s_no_such_resi:'Purely_office_Address_s_no_such_resi',
                     Purely_resi_Address_s_no_such_office:'Purely_resi_Address_s_no_such_office',
                     Purely_Resi_Address_s_No_such_Office:'Purely_Resi_Address_s_No_such_Office',
                     Refer_to_credit_decision:'Refer_to_credit_decision',
                     Resi_Cum_Office:'Resi_Cum_Office',
                     Residence_Cum_Office:'Residence_Cum_Office',
                     Shared_s_Bachelor_Accommodation:'Shared_s_Bachelor_Accommodation',
                     Shifted_to_new_location:'Shifted_to_new_location',
                     Untraceable:'Untraceable',
                     Verification_extended_by_applicant:'Verification_extended_by_applicant',
                     working_Confirmed_s_Other_details_not_available:'working_Confirmed_s_Other_details_not_available',
                     Working_on_other_Location:'Working_on_other_Location',
                     Wrong_Address:'Wrong_Address',
                     wrong_Address_s_Localities_clubbed:'wrong_Address_s_Localities_clubbed',
                },
                recommended:{
                   address_details_confirmed:'address_details_confirmed',
                   pickup_done:'pickup_done'
                },
                not_recomended:{
                  Address_not_Traceable_s_Does_Not_exists:'Address_not_Traceable_s_Does_Not_exists',
                  Any_Other_Reason__bo_Not_covered_by_above_bc_:'Any_Other_Reason__bo_Not_covered_by_above_bc_',
                  Applicant_or_Family_member_not_met:'Applicant_or_Family_member_not_met',
                  Customer_Denied:'Customer_Denied',
                  Defaulter_s_Bad_Market_Reputation:'Defaulter_s_Bad_Market_Reputation',
                  Detail_Refuse_s_Applicant_Not_intersted:'Detail_Refuse_s_Applicant_Not_intersted',
                  Details_Mismatch:'Details_Mismatch',
                  Door_Locked:'Door_Locked',
                  Entry_Not_Allowed:'Entry_Not_Allowed',
                  Incomplete_Address:'Incomplete_Address',
                  Incomplete_Document_s_Original_Document_Not_Shown:'Incomplete_Document_s_Original_Document_Not_Shown',
                  Issues:'Issues',
                  Negative_Neighbourhood_Check:'Negative_Neighbourhood_Check',
                  Non_targeted_Area:'Non_targeted_Area',
                  Out_of_Station_Less_than_1_day:'Out_of_Station_Less_than_1_day',
                  Out_of_Station_more_than_1_day:'Out_of_Station_more_than_1_day',
                  Outside_geographical_Limits:'Outside_geographical_Limits',
                  Person_does_not_exist:'Person_does_not_exist',
                  Poor_Living_Conditions:'Poor_Living_Conditions',
                  Residence_Cum_Office:'Residence_Cum_Office',
                  Shared_s_Bachelor_Accommodation:'Shared_s_Bachelor_Accommodation',
                  Wrong_Address:'Wrong_Address'
                },
                referal:{
                  Address_confirmed_a_Other_details_not_confirmed:'Address_confirmed_a_Other_details_not_confirmed',
                  Applicant_not_applied__s__not_interested__s__cancel_Request__s__Refuse_to_give_Details:'Applicant_not_applied__s__not_interested__s__cancel_Request__s__Refuse_to_give_Details',
                  bachelor_Accommodation:'bachelor_Accommodation',
                  Business_board_available:'Business_board_available',
                  Business_Board_not_valuable:'Business_Board_not_valuable',
                  Customer_out_of_station:'Customer_out_of_station',
                  Demolished:'Demolished',
                  Details_Confirmed:'Details_Confirmed',
                  Details_not_confirmed:'Details_not_confirmed',
                  DNCA:'DNCA',
                  Door_locked_a_Few_details_confirmed:'Door_locked_a_Few_details_confirmed',
                  Door_No_missing:'Door_No_missing',
                  Entry_Restricted_a_Not_allowed:'Entry_Restricted_a_Not_allowed',
                  High_Risk_Customer:'High_Risk_Customer',
                  incomplete_Address:'incomplete_Address',
                  Information_mismatch:'Information_mismatch',
                  Kuccha_house:'Kuccha_house',
                  Left_the_job:'Left_the_job',
                  LMC_Area:'LMC_Area',
                  Locality_is_chawl_a_community_sensitive_a_kuccha_house:'Locality_is_chawl_a_community_sensitive_a_kuccha_house',
                  Low_Stability__s__Low_Setup__s__Low_Activities:'Low_Stability__s__Low_Setup__s__Low_Activities',
                  Negative_Area:'Negative_Area',
                  No_setup_a_Business_activity_seen:'No_setup_a_Business_activity_seen',
                  No_such_company_a_Office:'No_such_company_a_Office',
                  No_such_Person:'No_such_Person',
                  Not_Contactable_a__staying_a_working_not_Confirmed:'Not_Contactable_a__staying_a_working_not_Confirmed',
                  Purely_office_Address_a_no_such_resi:'Purely_office_Address_a_no_such_resi',
                  Purely_resi_Address_a_no_such_office:'Purely_resi_Address_a_no_such_office',
                  Purely_Resi_Address_a_No_such_Office:'Purely_Resi_Address_a_No_such_Office',
                  Refer_to_credit_decision:'Refer_to_credit_decision',
                  Resi_Cum_Office:'Resi_Cum_Office',
                  Shifted_to_new_location:'Shifted_to_new_location',
                  Untraceable:'Untraceable',
                  Verification_extended_by_applicant:'Verification_extended_by_applicant',
                  working_Confirmed_a_Other_details_not_available:'working_Confirmed_a_Other_details_not_available',
                  Working_on_other_Location:'Working_on_other_Location',
                  wrong_Address_a_Localities_clubbed:'wrong_Address_a_Localities_clubbed'
                }
             },
             feedback_sub_status: '',       
             feedback_sub_status_op: '',       
          }
       },
       validators: {
   
         feedback_status: function(value) {
            return Validator.custom(function () {
               if (Validator.isEmpty(value) || value == 0 ) {
                  
                  return 'Please select valid option.';
               }
            });
         },
         feedback_sub_status: function(value) {
            return Validator.custom(function () {
               if (Validator.isEmpty(value) || value == 0 ) {
                  
                  return 'Please select valid option.';
               }
            });
         },
         feedback_remark: function(value) {
            return Validator.value(value).required('This field is required.');
         }
      },
       props:{
           currenSelectedCase:{
               type: Number
           }
       },
        mounted(){
          this.getMyCaseDetails();

       },
       methods:{
                    getMyCaseDetails(){
         let vm = this;
         
         axios.get('https://severify.com/api/cases/get-my-case?id='+ this.currenSelectedCase)
            .then(function (response) {
               let case_data = response.data.data[0];

              
               if(case_data.fb_status){
                   vm.feedback_status = case_data.fb_status;
                  vm.feedback_sub_status = case_data.fb_sub_status;
                  vm.feedback_remark = case_data.remarks;
                  vm.changeSubOptions();

               }

              
         })
         .catch(function (error) {
            console.log(error);
         });

      },
          changeSubOptions(){
             console.log(this.feedback_status);
             console.log();
             if(this.feedback_status == 'all'){
                this.feedback_sub_status_op = this.fb_options['all'];
             }else if(this.feedback_status == 'recommended'){
                this.feedback_sub_status_op = this.fb_options['recommended'];
             }else if(this.feedback_status == 'not_recommended'){
                this.feedback_sub_status_op = this.fb_options['not_recommended'];
             }else{
                this.feedback_sub_status_op = this.fb_options['referal'];
             }

             console.log(this.feedback_sub_status);
          },
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           resetForm(){
               this.feedback_status = 'all';
               this.feedback_sub_status = '';
               this.feedback_remark = '';
               this.validation.reset();
           },
           processRequest(){
              let vm = this;
               this.$validate()
                  .then(function(success) {
                     if (success) {
                        vm.updateCase();
                     }
               });
           },
           updateCase(){
               this.$loading.show({delay:0})
              let vm  = this;              
              let formData = new FormData();              
               formData.append('fb_status', this.feedback_status);
               formData.append('fb_sub_status', this.feedback_sub_status);
               formData.append('admin_comment', this.feedback_remark);
               formData.append('case_id', this.currenSelectedCase);
               axios.post('https://severify.com/api/cases/verify-case', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  let msg = 'Case updated successfully.';
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
           },
           getFormatedOption(value){
              let mystr = value.replaceAll('__s__', '/');
              mystr = value.replaceAll('__bo__', '(');
              mystr = value.replaceAll('__bc__', ')');
              mystr = value.replaceAll('_', ' ');
              return mystr;

           }
       }
   
   }
</script>