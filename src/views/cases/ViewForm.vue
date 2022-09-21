<template>
<CCard>
            <CCardBody> 
               <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="print-div">
                  <table class="mytable vf">
                     <tbody style="max-width:100%" class="vf">
                        <tr class="vf">
                           <td colspan="4" align="right" height="30px;" class="vf">
                              <a href="javascript:Print()" v-on:click="print()">Click here to print</a>
                           </td>
                        </tr>
                        <tr class="vf">
                           <td class="address_text ng-binding" align="center" colspan="4" v-if="case_data.bank">{{case_data.bank ? case_data.bank.name : ''}} {{ ' ' }} {{ case_data.product ? case_data.product.name:'' }}</td>
                           <td class="address_text ng-binding vf" align="center" colspan="4"  v-else v-html="'Common ' + case_data.category.name"></td>
                        </tr>
                        <tr class="vf">
                           <td width="25%" class="vf">Branch</td>
                           <td width="25%" class="ng-binding vf" v-if="case_data.bank">{{case_data.bank ? case_data.bank.name : ''}} {{ ' ' }} {{ case_data.product ? case_data.product.name:'' }}</td>
                           <td width="25%" class="ng-binding vf"  v-else v-html="'Common ' + case_data.category.name"></td>
                           <td width="25%" class="vf">Agency Name</td>
                           <td width="25%" class="ng-binding vf"> </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading" style="text-align: center">{{ case_data.fl_type == 'rv'?'Resident Verification Report':'Business verification Report' }}<br>
                              (Strictly Private &amp; Confidential) 
                           </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf"> Product</td>
                           <td colspan="3" class="ng-binding vf" v-if="case_data.bank">{{case_data.bank ? case_data.product.name : ''}} {{ ' ' }} {{ case_data.product ? case_data.product.name:'' }}</td>
                           <td colspan="3" class="ng-binding vf" v-else v-html="'Common ' + case_data.category.name"></td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Date</td>
                           <td class="ng-binding vf">{{ case_data.created_at | moment("add", tat_hour+" hours","add",tat_minute+" minutes", "dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                           <td class="vf">Reference No.</td>
                           <td class="ng-binding vf">{{ case_data.reference_number}}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">FI Date </td>
                           <td class="ng-binding vf">  </td>
                           <td class="vf">FI Time</td>
                           <td class="ng-binding vf"></td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">FI Flag </td>
                           <td class="ng-binding vf">  </td>
                           <td class="vf">Date Of Birth</td>
                           <td class="ng-binding vf">{{ case_data.dob ? case_data.dob:''}}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Applicant Name</td>
                           <td colspan="3" class="ng-binding vf">{{ case_data.applicant_name}}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Resident Address</td>
                           <td colspan="3" class="ng-binding vf">{{ (case_data.residence_house_no?case_data.residence_house_no:'')+' '+(case_data.residence_landmark?case_data.residence_landmark:'') +' '+(case_data.residence_city?case_data.residence_city:'')}}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Telephone(R) </td>
                           <td class="ng-binding vf">{{ case_data.residence_phone_number }}  </td>
                           <td class="vf">Mobile :</td>
                           <td class="ng-binding vf">{{ case_data.phone }}</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Details of which loan is applied  </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Make/Model  </td>
                           <td class="ng-binding vf">   </td>
                           <td class="vf">Loan Amt Rs.</td>
                           <td class="ng-binding vf">{{ case_data.amount}}</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Address Confirmation  </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Address Confirmed  </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.stability_less_6_month_last_address_confirm:'' }} </td>
                           <td class="vf"></td>
                           <td class="vf"></td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Person Met Details </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.name_of_person_met:'' }} </td>
                           <td class="vf">Relationship with applicant </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.met_person_relation:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Residence Info  </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Ownership Of Residence  </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.residence_ownership:'' }}</td>
                           <td class="vf">Stability</td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.residence_ownership:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Permanent Address  </td>
                           <td class="ng-binding vf">yes </td>
                           <td class="vf">Rent Per Month  </td>
                           <td class="ng-binding vf">0</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Family Info </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Total Family Members    </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.member_count:'' }}</td>
                           <td class="vf">No of Earning Members </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.earning_member_count:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Details of Earning Members    </td>
                           <td class="ng-binding vf"> {{case_data.residential_details ? case_data.residential_details.member_count:'' }}</td>
                           <td class="vf">Dependant   </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.dependent_member_count:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Other Info </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Office Address  </td>
                           <td colspan="3" class="ng-binding vf"></td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Residence Id Proof sighted  </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.id_proof_seen:'' }}</td>
                           <td class="vf">Agriculture Lending (If any)    </td>
                           <td class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.agri_land_with_location:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Describe Exterior of Premises</td>
                           <td colspan="3" class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.exterior_of_house:'' }}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Describe interior of Premises</td>
                           <td colspan="3" class="ng-binding vf">{{case_data.residential_details ? case_data.residential_details.house_interior:'' }}</td>
                        </tr>
                        <tr v-if=" case_data.is_rv == 1">
                           <td class="vf">Cross Verified Information </td>
                           <td class="ng-binding vf">{{ case_data.residential_neighbour.length > 0? case_data.residential_neighbour[0].neighbour_1_details:''}}</td>
                           <td class="ng-binding vf">{{ case_data.residential_neighbour.length > 0 ?case_data.residential_neighbour[0].neighbour_2_details:''}}</td>
                           <td class="vf"></td>
                        </tr>
                        <!-- <tr class="vf">
                           <td colspan="4" class="subheading">RESI CPV COMMENTS
                           </td>
                        </tr> -->
                        <!-- <tr class="vf">
                           <td colspan="4" class="ng-binding vf">
                              <br>
                              Resi Verification of : Payal || Ref No. : SM2326317 || Bank Name : Pramerica Life Insurance Ltd. || Product : employee fi || Applicant Name : Payal || Address confirmed: Yes || Contact Person (Relation) : bantar singh (father in low)|| Ownership : Company Accommodation || Stability :2015 || Total Family Members :5 || Earning : 2 || Details of Earning Members : 2 || Dependant : mother in low and kid || Office Address :no || Resi Id Proof sighted :no || Agri Lending if any :No || Interior : Good || Exterior : Good || Vehicle Details : Alto || Neighbour Check 1 :house no 2501 sawatri || Neighbour Check 2 :house no 2500 Ram jatan || CPV done by :bhupender || Visit Date and time :10/01/2021 03:24:19 PM || Additional Remarks :meet on spot father in law living hear 6 year Allowted house father in law.
                              <br>
                           </td>
                        </tr> -->
                        <tr class="vf">
                           <td colspan="4" class="subheading">AS CLAIMED / CONFIRMED
                           </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="ng-binding vf"></td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">NEGATIVE FEATURES (IF ANY)
                           </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="ng-binding vf">{{ case_data.fb_status}}</td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">FI Status</td>
                           <td colspan="3" class="ng-binding vf">{{ case_data.agent_response}}
                           </td>
                        </tr>

                        <tr class="vf">
                           <td class="vf">{{ comment_header}}</td>
                           <td colspan="3" class="ng-binding vf">{{  rev_comment }}
                           </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Applicant Photos
                           </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4">
                              <ul  v-for="(img, index) in case_data.submited_files" :key="index" style="list-style-type: none; margin-bottom: 0px;" class="ng-scope">
                                 <li style="display: inline; float: left; margin-left: 5px;">
                                    <!-- <img :src="'https://severify.com/'+img.name" class="imageDetail" @click="show(img.name)"> -->
                                    <img :src="'https://severify.com/'+img.name" class="imageDetail" >
                                 </li>
                              </ul>
                              
                           </td>
                        </tr>
                         <tr class="vf">
                           <td colspan="4" class="subheading">Uploaded Files
                           </td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4">
                              <ul  v-for="(img, index) in case_data.admin_uploads" :key="index" style="list-style-type: none; margin-bottom: 0px;" class="ng-scope">
                                 <li style="display: inline; float: left; margin-left: 5px;">
                                    <img :src="'https://severify.com/'+img.name" class="imageDetail" @click="show(img.name)">
                                 </li>
                              </ul>
                              
                           </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">VisitDate</td>
                           <td class="ng-binding vf">{{ case_data.enquery_time | moment( "dddd, MMMM Do YYYY") }}</td>
                           <td class="vf">VisitTime</td>
                           <td class="ng-binding vf">{{ case_data.enquery_time | moment( "h:mm:ss a") }}</td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4" class="subheading">Location 
                           </td>
                        </tr>
                        <tr class="vf">
                           <td class="vf">Latitude</td>
                           <td class="ng-binding vf">{{ case_data.latitude }}</td>
                           <td class="vf">Longitude</td>
                           <td class="ng-binding vf">{{ case_data.longitute }}</td>
                        </tr>
                        <tr >
                           <td class="vf">Distance From Office</td>
                           <td class="ng-binding vf"></td>
                           <td class="vf">Pincode(As Per Agent Location)</td>
                           <td class="ng-binding vf"></td>
                        </tr>
                        <tr class="vf">
                           <td colspan="4">
                              <iframe id="RV_Map"  height="400" frameborder="0" style="border: 0" :src="'https://maps.google.com/maps?q='+case_data.latitude+','+ case_data.longitute +'&amp;hl=es;z=14&amp;output=embed'"></iframe>
                           </td>
                        </tr>
                        <tr data-ng-show="ShowRV_AgentSign" class="ng-hide">
                           <td class="vf">Agent Signature
                           </td>
                           <td colspan="3" class="ng-binding vf" v-if="case_data.signature">
                              <img :src="'https://severify.com/'+img.name" v-for="(img, index) in case_data.signature" :key="index" height="50" width="100" @click="show(img.name)">
                              <br>
                              {{ case_data.enquery_time | moment( "dddd, MMMM Do YYYY h:mm:ss a") }}
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <br>
               </div>
            </CCardBody>
</CCard>

</template>
<script>
   import axios from 'axios';
   export default {
       data () {
          return {
             case_data:[]    ,
             comment_header:'',
             images: []  ,
             rev_comment:''   ,
             tat_hour:'',
             tat_minute:''   ,
             dynamicWidth: '100px'  
          }
       },
       
       created(){
          this.currenSelectedCase = this.$route.query.currenSelectedCase;
          this.getMyCaseDetails();

       },
       methods:{
         getMyCaseDetails(){
               let vm = this;
               axios.get('https://severify.com/api/cases/get-my-case?id='+this.currenSelectedCase)
                  .then(function (response) {
                     vm.case_data = response.data.data[0];
                     vm.setMyVariable(vm.case_data);
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
         },
         show(path) {
            this.images = ['https://severify.com/'+path];
            this.$viewerApi({
               images: this.images,
            })
         },
         print(){
            const prtHtml = document.getElementById('print-div').innerHTML;
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML;
            }
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
               ${stylesHtml}
            </head>
            <body>
               ${prtHtml}
            </body>
            </html>`);
            WinPrint.document.close();
            WinPrint.focus();
              var scrollingElement = (WinPrint.document.scrollingElement || WinPrint.document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;
            
            setTimeout(function(){
             
               WinPrint.print();
            },1500);
            
            // WinPrint.close();
         },
         setMyVariable(case_details){
            console.log(case_details, '--');

            // if(!case_details.case_status)
            //    return;

            this.rev_comment = "Verification of -  "+case_details.applicant_name + " , ";
            this.rev_comment += "Ref No -  "+case_details.reference_number + " , ";

            if(case_details.bank){
               this.rev_comment += "Bank Name -  "+case_details.bank.name + " , ";
               this.rev_comment += "Product Name -  "+ case_details.product.name + " , ";
               

            }else{
               this.rev_comment += "Bank Name -  Common "+ case_details.category.name + " , ";
               this.rev_comment += "Product Name -  "+ case_details.category.name+ " , ";

            }           

            

                if(case_details.is_rv == 1 && case_details.residential_details){
                   this.comment_header = "RESI CPV COMMENTS";
                     
                     this.rev_comment += "name of person met - " + case_details.residential_details.name_of_person_met+ ", ";
                     this.rev_comment += "met person relation - " + case_details.residential_details.met_person_relation+ ", ";
                     this.rev_comment += "other relation - " + case_details.residential_details.other_relation+ ", ";
                     this.rev_comment += "id proof seen - " + case_details.residential_details.id_proof_seen+ ", ";
                     this.rev_comment += "member count - " + case_details.residential_details.member_count+ ", ";
                     this.rev_comment += "earning member count - " + case_details.residential_details.earning_member_count+ ", ";
                     this.rev_comment += "dependent member count - " + case_details.residential_details.dependent_member_count+ ", ";
                     this.rev_comment += "total stability - " + case_details.residential_details.total_stability+ ", ";
                     this.rev_comment += "stability less 6 month last address confirm - " + case_details.residential_details.stability_less_6_month_last_address_confirm+ ", ";
                     this.rev_comment += "residence ownership - " + case_details.residential_details.residence_ownership+ ", ";
                     this.rev_comment += "residence ownership other - " + case_details.residential_details.residence_ownership_other+ ", ";
                     this.rev_comment += "agri land with location - " + case_details.residential_details.agri_land_with_location+ ", ";
                     this.rev_comment += "applicant working company name location - " + case_details.residential_details.applicant_working_company_name_location+ ", ";
                     this.rev_comment += "vehicle details - " + case_details.residential_details.vehicle_details+ ", ";
                     this.rev_comment += "house class locality - " + case_details.residential_details.house_class_locality+ ", ";
                     this.rev_comment += "house interior - " + case_details.residential_details.house_interior+ ", ";
                     this.rev_comment += "house interior other - " + case_details.residential_details.house_interior_other+ ", ";
                     this.rev_comment += "living standard - " + case_details.residential_details.living_standard+ ", ";
                     this.rev_comment += "living standard other - " + case_details.residential_details.living_standard_other+ ", ";
                     this.rev_comment += "exterior of house - " + case_details.residential_details.exterior_of_house+ ", ";
                     this.rev_comment += "remark - " + case_details.residential_details.remark+ ", ";
                     if(case_details.residential_neighbour.length > 0){
                        this.rev_comment += "neighbour 1 details - " + case_details.residential_neighbour[0].neighbour_1_details+ ", ";
                        this.rev_comment += "neighbour 1 remark - " + case_details.residential_neighbour[0].neighbour_1_remark+ ", ";
                        this.rev_comment += "neighbour 2 details - " + case_details.residential_neighbour[0].neighbour_2_details+ ", ";
                        this.rev_comment += "neighbour 2 remark - " + case_details.residential_neighbour[0].neighbour_2_remark+ ", ";

                     }


                     
                     
                }

            if(case_details.is_bv == 1 ){
               this.comment_header = "BUSINESS CPV COMMENTS";
                this.rev_comment += "met person name - "+ case_details.case_study.met_person_name+ ",";
                this.rev_comment += "relation - "+ case_details.case_study.relation+ ",";
                this.rev_comment += "type of business - "+ case_details.case_study.type_of_business+ ",";
                     if(case_details.case_study.type_of_business == 'service' && case_details.service_details){

                     
                     this.rev_comment += "working since - " +case_details.service_details.working_since + " , ";
                     this.rev_comment += "designation - " +case_details.service_details.designation + " , ";
                     this.rev_comment += "department room number - " +case_details.service_details.department_room_number + " , ";
                     this.rev_comment += "employee code - " +case_details.service_details.employee_code + " , ";
                     this.rev_comment += "company nature of business - " +case_details.service_details.company_nature_of_business + " , ";
                     this.rev_comment += "drawing salary per month - " +case_details.service_details.drawing_salary_per_month + " , ";
                     this.rev_comment += "id proof seen - " +case_details.service_details.id_proof_seen + " , ";
                     this.rev_comment += "employee seen - " +case_details.service_details.employee_seen + " , ";
                     this.rev_comment += "signboard seen with name - " +case_details.service_details.signboard_seen_with_name + " , ";
                     this.rev_comment += "exterior off floor - " +case_details.service_details.exterior_off_floor + " , ";
                     this.rev_comment += "remark - " +case_details.service_details.remark + " , ";

                     if(case_details.office_neighbour.length > 0){
                        this.rev_comment += "neighbour 1 details -" +case_details.office_neighbour[0].neighbour_1_details + " , ";
                        this.rev_comment += "neighbour 1 remark - " +case_details.office_neighbour[0].neighbour_1_remark + " , ";
                        this.rev_comment += "neighbour 2 details - " +case_details.office_neighbour[0].neighbour_2_details + " , ";
                        this.rev_comment += "neighbour 2 remark - " +case_details.office_neighbour[0].neighbour_2_remark + " , ";

                     }
                     
                     
                     
                     
                     }else{

                     this.rev_comment += "id proof seen - " + case_details.self_employed.id_proof_seen + "," ;
                     this.rev_comment += "applicant is - " + case_details.self_employed.applicant_is + "," ;
                     this.rev_comment += "applicant is other - " + case_details.self_employed.applicant_is_other + "," ;
                     this.rev_comment += "nature of business - " + case_details.self_employed.nature_of_business + "," ;
                     this.rev_comment += "nature of business other - " + case_details.self_employed.nature_of_business_other + "," ;
                     this.rev_comment += "office ownership - " + case_details.self_employed.office_ownership + "," ;
                     this.rev_comment += "stability - " + case_details.self_employed.stability + "," ;
                     this.rev_comment += "stability other - " + case_details.self_employed.stability_other + "," ;
                     this.rev_comment += "stocks - " + case_details.self_employed.stocks + "," ;
                     this.rev_comment += "gst bill visiting card seen - " + case_details.self_employed.gst_bill_visiting_card_seen + "," ;
                     this.rev_comment += "gst bill visiting card seen details - " + case_details.self_employed.gst_bill_visiting_card_seen_details + "," ;
                     this.rev_comment += "business activity level seen - " + case_details.self_employed.business_activity_level_seen + "," ;
                     this.rev_comment += "employee seen - " + case_details.self_employed.employee_seen + "," ;
                     this.rev_comment += "applicant current account with bank - " + case_details.self_employed.applicant_current_account_with_bank + "," ;
                     this.rev_comment += "applicant has vehicle - " + case_details.self_employed.applicant_has_vehicle + "," ;
                     this.rev_comment += "signboard seen with name - " + case_details.self_employed.signboard_seen_with_name + "," ;
                     this.rev_comment += "exterior off floor - " + case_details.self_employed.exterior_off_floor + "," ;
                     this.rev_comment += "remark - " + case_details.self_employed.remark + "," ;

                     if( case_details.business_neighbour.length > 0){
                        this.rev_comment += "neighbour 1 details - " + case_details.business_neighbour[0].neighbour_1_details +" ,";
                        this.rev_comment += "neighbour 1 remark - " + case_details.business_neighbour[0].neighbour_1_remark +" ,";
                        this.rev_comment += "neighbour 2 details - " + case_details.business_neighbour[0].neighbour_2_details +" ,";
                        this.rev_comment += "neighbour 2 remark - " + case_details.business_neighbour[0].neighbour_2_remark +" ,";

                     }

                     
                     }
            }

            this.rev_comment += "Case Status -  "+case_details.case_study.case_status + " , ";
            if(case_details.case_study.case_status == 'negative'){
               this.rev_comment += "Reason -  "+case_details.case_study.rejection_reason + "( "+ case_details.case_study.rejection_reason_other +" )" + " , ";
            }

            this.rev_comment += "Remark -  "+case_details.remarks;
            

            
         },
         test(type){
            if(type == 'in'){
               this.dynamicWidth =  "200px";
            }else{
               this.dynamicWidth =  "100px";
            }
            console.log(type);
         }
       }
   
   }
</script>
<style scoped>

</style>

