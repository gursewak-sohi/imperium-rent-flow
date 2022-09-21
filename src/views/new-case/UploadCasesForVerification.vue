<template>

         <div class="modal-content">
            <!-- <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Assign Case</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
               </div> -->
            <div class="modal-body">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="label">Bank :
                        </td>
                        <td class="value">
                           <select id="bank" class="form-control" v-model="bank" @change="updateChildRoles($event)">
                              <option value="0" > Select Bank </option>
                              <option :value="row.id" v-for="(row, index) in this.bankList" :key="index"> {{ row.name}} </option>
                             
                           </select>
                            <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('bank') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="label">
                           <span id="cph1_lblscshdate">Product :</span>
                        </td>
                        <td valign="top" class="NoMargin">
                           <select id="product" class="form-control" v-model="product" >
                              <option value="0" > Select Product </option>
                              <option :value="row.id" v-for="(row, index) in this.productList" :key="index"> {{ row.name}} </option>
                              
                           </select>
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('product') }}</small>
                        </td>
                     </tr>
                     <tr>
                        <td class="label">
                           <span id="cph1_lblscshdate">Choose File :</span>
                        </td>
                        <td valign="top" class="NoMargin">
                           <input type="file" class="form-control" accept=".csv" @change="handleFileUpload( $event )" />
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('file') }}</small>
                        </td>
                     </tr>
                  </tbody>
               </table>

              
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="checkProceed">Upload File</button>
            </div>
         </div>
    
</template>
<script>

   // import JsonExcel from "@/components/JsonExcel";
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator; 
   export default {
      data () {
         return {  
             bank:'0',  
             product:'0',
              bankList:[],
              productList:[],
              file:'',
              json_fields: {
                    "Complete name": "name",
                    "City": "city",
                    "Telephone": "phone.mobile",
                    
                },
                json_data: [{}
                 
                  
                   
                ],
                
         }
     },
     components: {
   //   JsonExcel,
   },
    validators: {
         bank: function(value) {
            return Validator.custom(function () {
                  if ( value == '0' ) {
                     
                     return 'Please select valid option.';
                  }
               });
         },
         product: function(value) {
            return Validator.custom(function () {
                  if ( value == '0' ) {
                     
                     return 'Please select valid option.';
                  }
               });
         },
         file: function(value) {
            return Validator.value(value).required('This field is required.');
         }
      },

      created(){    
          axios.get("https://severify.com/api/bank/list-all")
           .then(response => {this.bankList = response.data.data;});       
      },
      methods:{
         resetForm(){
              this.bank = 0;
              this.product = 0;
              this.file = '';
              this.validation.reset();

           },
          updateChildRoles(event){
           let bank_id = event.target.value;
           this.product = '0';
           let vm = this;
           this.productList = [];
           this.bankList.forEach(element => {
              if(element.id == bank_id){
                 vm.productList = element.products;
              }
           });
        },
        
        handleFileUpload( event ){
            this.file = event.target.files[0];
        },
        checkProceed(){
           let vm = this;
            this.$validate()
               .then(function(success) {
                  if (success) {
                     vm.uploadFileCreateCase();
                  }
            });
        },
        uploadFileCreateCase(){
           let vm  = this;
           this.$loading.show({delay:0})
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('product', this.product);
            formData.append('bank', this.bank);
            axios.post( 'https://severify.com/api/cases/bulk-upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function(response){
                   vm.$loading.hide();
                vm.$loading.hide();
                  let msg = response.data.message;
                  if(response.data.status){
                     vm.resetForm();
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
                console.log('FAILURE!!');
                });
        }
      }   
   }
</script>