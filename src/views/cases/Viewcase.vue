<template>
<!-- <div class="overlay">
   <div class="modal fade show bd-example-modal-lg" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">-->
            <CCard>
            <CCardBody> 
               <div id="" class="col-md-12" style="float: right; padding: 0px;">
                  <div class="box1">
                     <h3 id="H1">
                        <span id="cph1_lblHeaderShowProfile">View Case : {{ case_data.reference_number}}</span>
                     </h3>
                     <table width="99.40%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                        <tbody>
                           <tr>
                              <td width="15%" align="left" style="font-weight: bold">Organization :
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblCaseOrganization">{{case_data.company ? case_data.company.name : ''}}</span>
                              </td>
                           </tr>
                           <tr>
                              <td width="15%" align="left" style="font-weight: bold">Status :
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblCaseStatus">{{ case_data.fb_status ? case_data.fb_status  : 'N/A'}}</span>
                              </td>
                              <td width="15%" align="left" style="font-weight: bold">Sub Status :
                              </td>
                              <td width="25%" style="background-color: White">
                                 <span id="cph1_lblCaseSubStatus">{{ case_data.fb_sub_status ? case_data.fb_sub_status:'N/A' }}</span>
                              </td>
                           </tr>
                           <tr>
                              <td width="15%" align="left" style="font-weight: bold">Field Survey Status:
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblCPV_Status">{{ case_data.agent_response ? case_data.agent_response :'N/A'}}</span>
                              </td>
                              <td width="15%" align="left" style="font-weight: bold">Assign To :
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblAssignTo" v-if="case_data.agent"> {{ case_data.agent.first_name +' '+ case_data.agent.last_name}} </span>
                              </td>
                           </tr>
                           <tr>
                              <td width="15%" align="left" style="font-weight: bold">Task Type  :
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblTaskType">N/A</span>
                              </td>
                              <td width="15%" align="left" style="font-weight: bold">Created Date :
                              </td>
                              <td width="20%" style="background-color: White">
                                 <span id="cph1_lblCreatedDate">{{ case_data.created_at | moment( "dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     <table width="99.40%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                        <tbody>
                           <tr>
                              <td colspan="4">
                                 <div>
                                    <table cellspacing="0" rules="all" border="1" id="cph1_grdshowcase" style="width:99%;border-collapse:collapse;">
                                       <tbody>
                                          <tr>
                                             <th align="left" valign="top" scope="col" style="font-weight:bold;width:50%;">Case Specific Details:</th>
                                             <th align="left" valign="top" scope="col" style="width:50%;">&nbsp;</th>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Bank_Name</td>
                                             <td align="left" valign="top" style="width:50%;" >{{case_data.bank ? case_data.bank.name : 'Common'}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Product_Name</td>
                                             <td align="left" valign="top" style="width:50%;" v-if="case_data.bank">{{ case_data.product.name }}</td>
                                             <td align="left" valign="top" style="width:50%;" v-else v-html="case_data.category.name"></td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">CreatedBy</td>
                                             <td align="left" valign="top" style="width:50%;">{{case_data.creater ? case_data.creater.first_name+' '+case_data.creater.last_name : ''}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">ProductId</td>
                                             <td align="left" valign="top" style="width:50%;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Applicant_Name</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.applicant_name}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Reference_Number</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.reference_number}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Amount</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.amount ? case_data.amount : ''}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Remarks</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.message }} </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Guarantee_Name</td>
                                             <td align="left" valign="top" style="width:50%;">{{case_data.guarantee_name}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">CoApplicant_Name</td>
                                             <td align="left" valign="top" style="width:50%;">{{case_data.co_applicant_name}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Vehicle</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.vehicle }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">DueDate</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.created_at | moment("add", tat_hour+" hours","add",tat_minute+" minutes", "dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                                          </tr>
                                          <tr>



                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">WorkFlow</td>
                                             <td align="left" valign="top" style="width:50%;" v-if="case_data.bank">{{case_data.bank ? case_data.product.name : ''}} {{ ' ' }} {{ case_data.product ? case_data.product.name:'' }} </td>
                                             <td align="left" valign="top" style="width:50%;" v-else v-html="'Common ' + case_data.category.name"><span></span></td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Res_Address</td>
                                             <td align="left" valign="top" style="width:50%;">
                                                {{ 
                                                   (case_data.business_house_number?case_data.business_house_number:'') + ' '+
                                                   (case_data.business_landmark?case_data.business_landmark:'') + ' '+
                                                   (case_data.business_colony_details?case_data.business_colony_details:'') + ' '+
                                                   (case_data.business_city?case_data.business_city:'') + ' '+
                                                   (case_data.business_phone_number?case_data.business_phone_number:'')
                                                 }}
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Res_City</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.residence_city }} </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Res_Landmark</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.residence_landmark }} </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Phone_Number</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.phone }} </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">FI_Type</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.fl_type }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">ReferenceNumber</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.reference_number}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Name</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.applicant_name}}&nbsp;</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">FIType</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.fl_type  }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Address</td>
                                             <td align="left" valign="top" style="width:50%;">
                                                {{ 
                                                   (case_data.residence_house_number?case_data.residence_house_number:'') + ' '+
                                                   (case_data.residence_landmark?case_data.residence_landmark:'') + ' '+
                                                   (case_data.residence_colony_details?case_data.residence_colony_details:'') + ' '+
                                                   (case_data.residence_city?case_data.residence_city:'') + ' '+
                                                   (case_data.residence_phone_number?case_data.residence_phone_number:'')
                                                 }}
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">OfficeAddress</td>
                                             <td align="left" valign="top" style="width:50%;">
                                                {{ 
                                                   (case_data.business_house_number?case_data.business_house_number:'') + ' '+
                                                   (case_data.business_landmark?case_data.business_landmark:'') + ' '+
                                                   (case_data.business_colony_details?case_data.business_colony_details:'') + ' '+
                                                   (case_data.business_city?case_data.business_city:'') + ' '+
                                                   (case_data.business_phone_number?case_data.business_phone_number:'')
                                                 }}
                                             </td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">CoApplicantName</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.co_applicant_name }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">GuaranteeName</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.guarantee_name }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">MobileNumber</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.phone }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">OffContactNumber</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.business_phone_number }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">OffLandmark</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.business_landmark }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Landmark</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.residence_landmark }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">ProductName</td>
                                              <td align="left" valign="top" style="width:50%;" v-if="case_data.bank">{{ case_data.product ? case_data.product.name :'' }}</td>
                                             <td align="left" valign="top" style="width:50%;" v-else v-html="case_data.category.name"></td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">HouseNumber</td>
                                             <td align="left" valign="top" style="width:50%;" >{{ case_data.residence_house_no }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">ColonyName</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.residence_colony_details }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Bank</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.bank ? case_data.bank.name : "common"}}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">GeoLimit</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.geo_limit }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">TAT</td>
                                             <td align="left" valign="top" style="width:50%;">{{ case_data.tat_time }}</td>
                                          </tr>
                                          <tr>
                                             <td align="left" valign="top" style="font-weight:bold;width:50%;">Agent_DisplayName</td>
                                             <td align="left" valign="top" style="width:50%;"  v-if="case_data.agent">{{ case_data.agent.first_name +' '+ case_data.agent.last_name }}  </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </td>
                           </tr>
                           <!-- <tr>
                              <td align="center" colspan="4">
                                 <input type="submit" name="ctl00$cph1$btnOK" value="Close" onclick="showPopup('ShowProfile');" id="cph1_btnOK" class="btn btn-primary" style="width:101px;">
                              </td>
                           </tr> -->
                        </tbody>
                     </table>
                  </div>
               </div>
           </CCardBody>
           </CCard>
            <!--  <div class="modal-footer">
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Close</button>
            </div>
         </div>
      </div>
   </div>
</div> -->
</template>

<script>
 import axios from 'axios';
export default {
    data () {
       return {
          case_data:{}   ,
          tat_hour:0,
          tat_minute:0
       }
    },
    props:{
           currenSelectedCase:{
               type: Number
           }
       },
       mounted(){
          this.currenSelectedCase = this.$route.query.currenSelectedCase;
          this.getMyCaseDetails();

       },
    methods:{  
      getMyCaseDetails(){
         let vm = this;
         axios.get('https://severify.com/api/cases/get-my-case?id='+this.currenSelectedCase)
            .then(function (response) {
               vm.case_data = response.data.data[0];
               let tat = vm.case_data.tat_time.split(':');
               vm.tat_hour = tat[0]?tat[0]:0;
               vm.tat_minute = tat[1]?tat[1]:0;
                console.log(vm.case_data, vm.tat_hour, vm.tat_minute );
         })
         .catch(function (error) {
            console.log(error);
         });

      },
      closeModal(){
         this.$emit('closeModal', 'Value if required')
      }
    }

}
</script>