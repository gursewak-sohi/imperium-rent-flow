<template>
<div class="overlay">
   <div class="modal  show bd-example-modal-xl" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-xl" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Case History</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <table cellspacing="0" rules="all" id="cph1_gvCaseHistory" style="border-width:1px;border-style:solid;width:99%;border-collapse:collapse;">
                  <tbody>
                     <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Sub Status</th>
                        <th scope="col">Assigned User</th>
                        <th scope="col">Status Effective Date</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Case Comment</th>
                        <th scope="col">Case Commented By</th>
                        <th scope="col">Commented Date</th>
                     </tr>
                     <tr v-for="(row, index) in case_history_list" :key="index">
                        <td>{{ row.status ? row.status : 'N/A'}}</td>
                        <td>{{ row.fb_status ? row.fb_status : 'N/A'}}</td>
                        <td>{{ row.agent ? row.agent.first_name +' '+ row.agent.last_name : ''}}</td>
                        <td>{{ row.updated_at | moment( "dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                        <td>{{ row.remarks ? row.remarks : 'N/A'}}</td>
                        <td>{{row.creater ? row.creater.first_name+' '+row.creater.last_name : ''}}</td>
                        <td>{{ row.created_at | moment( "dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                        <td>{{ row.admin_comment? row.admin_comment : 'N/A'}}</td>
                        <td>&nbsp;</td>
                        <td>{{ row.updated_at | moment( "dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Close</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
<script>
import axios from 'axios';
   export default {
       data () {
          return {
            case_history_list:[]
          }
       },
       props:{
           currenSelectedCase:{
               type: Number
           },
           current_case_id:{
               type: String
           }
       },
       created(){
         this.getMyCaseHistory();
       },
       methods:{
          getMyCaseHistory(){
            this.$loading.show({delay:0})
            let vm = this;
            let formData = new FormData();              
            formData.append('case_id', this.current_case_id);
            axios.post('https://severify.com/api/cases/case-history', formData).then(function(response){
              vm.$loading.hide();
              vm.case_history_list = response.data.data;
              console.log(vm.case_history_list,'Get Response');
            })
            .catch(function(){

            }); 
          },
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           }
       }
   
   }
</script>