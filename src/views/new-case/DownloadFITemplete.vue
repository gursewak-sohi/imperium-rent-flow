<template>
   
         <div class="modal-content">
         
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
                  </tbody>
               </table>
             
              
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="download">Download Template</button>
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
             bank:'0',  
             product:'0',
              bankList:[],
              productList:[],
             
                
         }
     },
     components: {

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
         }
      },

      created(){    
          axios.get("https://severify.com/api/bank/list-all")
           .then(response => {this.bankList = response.data.data;});       
      },
      methods:{
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
        download(){
            let vm = this;
               this.$validate()
                  .then(function(success) {
                     if (success) {
                         window.location.href = 'https://severify.com/assets/csv/InputFileHeader.csv';
                     }
               });
          
        },
        resetForm(){
              this.bank = 0;
              this.product = 0;
              this.validation.reset();

           },
      }   
   }
</script>