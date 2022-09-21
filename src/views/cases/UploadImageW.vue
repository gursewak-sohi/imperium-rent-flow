<template>
<div class="overlay">
   <div class="modal  show bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Upload Image</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="SearchFilterTable" style="width:200px">
                           <span id="cph1_Label15">Image Category</span>
                        </td>
                        <td :class="{error: validation.hasError('image_type')}">
                           <select name="ctl00$cph1$ddlImageCategory" class="form-control" v-model="image_type">
                              <option value="Select">Select</option>
                              <option value="applicant_photo">Applicant photo</option>
                              <option value="customer_signature">Customer signature</option>
                              <option value="agent_signature">Agent signature</option>
                           </select>
                            <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('image_type') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="SearchFilterTable" style="width:200px">
                           <span id="cph1_lbluploadImages">Upload Images</span>
                        </td>
                        <td :class="{error: validation.hasError('upload_file')}">

                           
                           <input type="file" class="form-control" ref="file" multiple="multiple" @change="showImage">
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('upload_file') }}</small>
                           <div class="main-con">
                              <div class="img_upload"  v-for="(image, key) in upload_file" :key="key">
                                 <img :src="image" />
                              </div>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="validateAndProcessRequest">Upload</button>
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
             image_type:'',
             upload_file:[] ,
             loading: false,            
          }
       },
       props:{
           currenSelectedCase:{
               type: Number
           }
       },
       validators: {
         image_type: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         upload_file: function(value) {
            return Validator.value(value).required('File is required.');
         }
      },
       methods:{
          showImage(){
              this.upload_file = [];
               for( var i = 0; i < this.$refs.file.files.length; i++ ){
                  let file = this.$refs.file.files[i];
                  this.upload_file.push( URL.createObjectURL(this.$refs.file.files[i]));
                 console.log(this.upload_file);
               }
          },
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           validateAndProcessRequest(){
              let vm = this;
             this.$validate()
               .then(function(success) {
                  if (success) {
                     vm.saveFile();
                  }
               });
           },
           resetForm(){
              let vm  = this;
               vm.image_type = '';
               vm.upload_file = [];
               vm.loading = false;
               vm.validation.reset();
           },
           saveFile(){
              this.$loading.show({delay:0})   //delay 0ms, default is 300ms
              let vm  = this;              
              let formData = new FormData();               
               for( var i = 0; i < this.$refs.file.files.length; i++ ){
                  let file = this.$refs.file.files[i];
                  console.log(file);
                  formData.append('files[' + i + ']', file);
               }               
               formData.append('type', this.image_type);
               formData.append('case_id', this.currenSelectedCase);
               axios.post('https://severify.com/api/cases/upload-images', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  let msg = 'Files were successfully uploaded.';
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
