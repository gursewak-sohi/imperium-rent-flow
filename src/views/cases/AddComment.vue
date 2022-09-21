<template>
<div class="overlay">
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Add Comment</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="label">Add Comment :
                        </td>
                        <td class="value">
                           <textarea class="form-control" name="comment" rows="2" cols="20" v-model="comment"></textarea>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('comment') }}</small>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="verifyAndProceed">Submit</button>
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Cancel</button>
               <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
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
             comment:''
              
          }
       },
       props:{
           currenSelectedCase:{
               type: Number
           }
       },
       validators: {
         comment: function(value) {
            return Validator.value(value).required('This field is required.');
         }
      },
       methods:{
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           verifyAndProceed(){
               let vm = this;
               this.$validate()
                  .then(function(success) {
                     if (success) {
                        vm.updateComment();
                     }
               });
           },
           resetForm(){
              this.comment = '';
              this.validation.reset();

           },
           updateComment(){
              this.$loading.show({delay:0})
              let vm  = this;              
              let formData = new FormData();              
               formData.append('admin_comment', this.comment);
               formData.append('case_id', this.currenSelectedCase);
               axios.post('https://severify.com/api/cases/add-comment', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  let msg = 'Comment added successfully.';
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