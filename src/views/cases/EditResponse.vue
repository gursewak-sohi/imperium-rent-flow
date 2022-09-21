<template>
<div class="overlay">
   <div class="modal  show show bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Edit Response</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <form action="/Response/EditResponse?caseId=1391341&amp;token=bf4077d2-cff3-41ff-b4ad-3ce0b6f6e57a" method="post">
                  <div class="container form-border">                       
                     
                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Product Name   </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <input class="form-control" v-model="product_name" disabled   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                        </div>
                     </div>

                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Case Status  </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;"  class="form-control" v-model="agentFeedBack.case_status" >
                              <option value='positive' > Positive </option>
                              <option value='negative'> Negative </option>
                           </select>
                           <!-- <input   class="form-control" v-model="agentFeedBack.case_status"  style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" > -->
                        </div>
                     </div>

                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Additional Remark  </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <input class="form-control" v-model="agentFeedBack.additional_remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                        </div>
                     </div>
                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Latitude  </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <input class="form-control" v-model="agentFeedBack.latitude"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                        </div>
                     </div>
                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Longitute  </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <input class="form-control" v-model="agentFeedBack.longitute"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                        </div>
                     </div>
                     <div class="row" style="margin-top:5px; margin-bottom:5px;">
                        <div class="col-lg-5 col-md-5 col-sm-5">
                           <label> Applicant DOB   </label>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-7">
                           <input class="form-control" v-model="agentFeedBack.application_dob"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                        </div>
                     </div>

                     <!-- Details For RV Start -->
                     <div v-if="case_data.is_rv == 1">

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Name of person met </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.name_of_person_met"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Relationship with applicant </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.residential_details.met_person_relation"> 
                                    <option value='mother' >Mother</option>
                                    <option value='self' >Self</option>
                                    <option value='father' >Father</option>
                                    <option value='sister'>Sister</option>
                                    <option value='wife'>Wife</option>
                                    <option value='son_daughter'>Son/Daughter</option>
                                    <option value='brother'>Brother</option>
                                    <option value='relative'>relative</option>
                                    <option value='other'>other</option>
                                 </select>
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.residential_details.met_person_relation == 'other'">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Specify Other </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.other_relation"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Id proof seen *  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.id_proof_seen"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Total family members * </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.member_count"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Total earning member in the family  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.earning_member_count"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Total dependant member in the family </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.dependent_member_count"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Total stability  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.total_stability"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Stability < 6 month confirm last resi address* </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.stability_less_6_month_last_address_confirm"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> The residance ownership  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.residential_details.residence_ownership" >
                                    <option value='owned' >Owned</option>
                                    <option value='rented' >Rented</option>
                                    <option value='other' >Other</option>
                                 </select>
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.residential_details.residence_ownership == 'other'">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Specify Other</label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.residence_ownership_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Agri land with location </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.agri_land_with_location"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Applicant working company name & location*</label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.applicant_working_company_name_location"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Vehicle details.. free/finance (EMI) </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.vehicle_details"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> House class locality </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.residential_details.house_class_locality" >
                                    <option value='good' >Good</option>
                                    <option value='average' >Average</option>
                                    <option value='below_average' >Below average</option>
                                 </select>
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>House interior   </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.residential_details.house_interior" >
                                    <option value='good' >Good</option>
                                    <option value='above_average' >Above average</option>
                                    <option value='average' >Average</option>
                                    <option value='below_average' >Below average</option>
                                    <option value='other'>other</option>
                                 </select>
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.residential_details.house_interior == 'other'">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Specify Other  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.house_interior_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Living standard   </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.residential_details.living_standard" >
                                    <option value='good' >Good</option>
                                    <option value='above_average' >Above average</option>
                                    <option value='average' >Average</option>
                                    <option value='below_average' >Below average</option>
                                    <option value='other'>other</option>
                                 </select>
                              </div>
                           </div>
                           <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.residential_details.living_standard == 'other'">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Specify Other  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.living_standard_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;" >
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Exterior of house (area, floor, color) </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.exterior_of_house"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;" >
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label>Remark  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <input class="form-control" v-model="agentFeedBack.residential_details.remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 
                              </div>
                           </div>


                           <div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 1 Details  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.residential_details.neighbour_1_details"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 1 Remark  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.residential_details.neighbour_1_remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 2 Details  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.residential_details.neighbour_2_details"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 2 Remark  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.residential_details.neighbour_2_remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                           </div>
                     </div>

                     <!-- Details For RV End -->     

                     <!-- BV DETAILS STart-->
                  <div>
                        <div class="row" style="margin-top:5px; margin-bottom:5px;">
                           <div class="col-lg-5 col-md-5 col-sm-5">
                              <label> Met person name* </label>
                           </div>
                           <div class="col-lg-7 col-md-7 col-sm-7">
                              <input class="form-control" v-model="agentFeedBack.met_person_name"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                           </div>
                        </div>

                        <div class="row" style="margin-top:5px; margin-bottom:5px;">
                           <div class="col-lg-5 col-md-5 col-sm-5">
                              <label> Relation </label>
                           </div>
                           <div class="col-lg-7 col-md-7 col-sm-7">
                              <input class="form-control" v-model="agentFeedBack.relation"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                           </div>
                        </div>

                           <div class="row" style="margin-top:5px; margin-bottom:5px;">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                 <label> Type of work*  </label>
                              </div>
                              <div class="col-lg-7 col-md-7 col-sm-7">
                                 <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.type_of_business" disabled >
                                    
                                    <option value='self_employed' >self employed</option>
                                    <option value='service' >service</option>
                                 </select>
                              </div>
                           </div>

                           <div v-if="agentFeedBack.type_of_business == 'self_employed'">

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Id proff seen </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.id_proof_seen"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Applicant Designation* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.self_employed.applicant_is" >
                                       
                                       <option value='proprietor'>Proprietor</option>
                                       <option value='partner'>Partner</option>
                                       <option value='director'>Director</option>
                                       <option value='other'>Other</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.self_employed.applicant_is == 'other'">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Specify Other </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.applicant_is_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Nature of business*</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.self_employed.nature_of_business" >
                                       
                                       <option value='manufacturing'>Manufacturing</option>
                                       <option value='trading'>Trading</option>
                                       <option value='service_provider'>Service Provider</option>
                                       <option value='professional'>Professional</option>
                                       <option value='contractor'>Contractor</option>
                                       <option value='other'>Other</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;" v-if="agentFeedBack.self_employed.nature_of_business == 'other'">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Specify Other </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.nature_of_business_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label>Business Premisis*</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.self_employed.office_ownership" >
                                       
                                       <option value='owned'>Owned</option>
                                       <option value='parental'>Parental</option>
                                       <option value='spouse'>Spouse</option>
                                       <option value='rental'>Rental</option>
                                       <option value='shared'>Shared</option>
                                       <option value='lease'>Lease</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Stability* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.self_employed.stability" >
                                       
                                       <option value='by_birth' >By Birth</option>
                                       <option value='other'>Other</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;"  v-if="agentFeedBack.self_employed.stability == 'other'">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Other remark </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.stability_other"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Stocks seen </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.stocks"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> GST no and bill or visiting card seen </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.gst_bill_visiting_card_seen"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Business activity seen level* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.self_employed.business_activity_level_seen" >
                                       
                                       <option value='good' >Good</option>
                                       <option value='average'>Average</option>
                                       <option value='low'>Low</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Employees seen* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.employee_seen"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Applicant current account with bank branch * </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.applicant_current_account_with_bank"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> The applicant has vehicle </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.applicant_has_vehicle"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Signboard seen with name</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.signboard_seen_with_name"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Exterior and off floor</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.exterior_off_floor"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label>Remark</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.self_employed.remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>


                           </div>
                           <div v-if="agentFeedBack.type_of_business == 'service'">
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Stability* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.working_since"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Nature of job(designation)* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.service.designation" >
                                       
                                       <option value='manager'>Manager</option>
                                       <option value='super_viser'>Super Viser</option>
                                       <option value='field_job'>Field Job</option>
                                       <option value='clerk'>Clerk</option>
                                       <option value='class_4'>Class iv</option>
                                       <option value='other'>Other</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Department & room no.* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.department_room_number"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Employee code .* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.employee_code"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Company nature of business  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.service.company_nature_of_business" >
                                       
                                       <option value='service_provider'>Service provider</option>
                                       <option value='insurance_company'>Insurance company</option>
                                       <option value='manufacturing_company'>Manufacturing unit</option>
                                       <option value='it_computer_related_jobs'>IT - Computer related jobs</option>
                                       <option value='letter_head'>Letter head</option>
                                       <option value='other'>Other</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Applicant is drawing salary PM .* </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.drawing_salary_per_month"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Id proof seen * </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.service.id_proof_seen" >
                                       
                                       <option value='yes' >Yes</option>
                                       <option value='no'>No</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label>  Employee seen * </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.employee_seen"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Signboard seen with name</label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <select style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" class="form-control" v-model="agentFeedBack.signboard_seen_with_name" >
                                       
                                       <option value='yes' >Yes</option>
                                       <option value='no'>No</option>
                                    </select>
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Exterior and off floor. </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.exterior_off_floo"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Remark </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.service.remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                           </div>

                           <div>
                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 1 Details  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.neighbour_1_details"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 1 Remark  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.neighbour_1_remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 2 Details  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.neighbour_2_details"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>

                              <div class="row" style="margin-top:5px; margin-bottom:5px;">
                                 <div class="col-lg-5 col-md-5 col-sm-5">
                                    <label> Neighbour 2 Remark  </label>
                                 </div>
                                 <div class="col-lg-7 col-md-7 col-sm-7">
                                    <input class="form-control" v-model="agentFeedBack.neighbour_2_remark"   style="width:100%; border-radius:3px; border:1px solid #888888; padding:0 10px;" type="text" >
                                 </div>
                              </div>
                           </div>
                  </div>
                     <!-- BV DETAILS End-->
                
                     
                     
                  </div>
               </form>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="updateData">Save Response</button>
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Close</button>  
               <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
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
            case_data:[] ,
            product_name:'',
            fb_sub_status:'test test',
            case_study_id:'',
            agentFeedBack: {
                  case_study_id:'',
                  response_type:'autoloan',
                  met_person_name:'',
                  relation:'',
                  type_of_business:'',
                  self_employed:{
                     self_employed_id:'',
                     id_proof_seen:'',
                     applicant_is:'',
                     applicant_is_other:'',
                     nature_of_business:'',
                     nature_of_business_other:'',
                     office_ownership:'',
                     stability:'',
                     stability_other:'',
                     stocks:'',
                     gst_bill_visiting_card_seen:'',
                     gst_bill_visiting_card_seen_details:'',
                     business_activity_level_seen:'',
                     employee_seen:'',
                     applicant_current_account_with_bank:'',
                     applicant_has_vehicle:'',
                     signboard_seen_with_name:'',
                     exterior_off_floor:'',
                     remark:''
                  },
                  service:{
                     service_id:'',
                     working_since:'',
                     designation:'',
                     department_room_number:'',
                     employee_code:'',
                     company_nature_of_business:'',
                     drawing_salary_per_month:'',
                     id_proof_seen:'',
                     employee_seen:'',
                     signboard_seen_with_name:'',
                     exterior_off_floor:'',
                     remark:''
                  },
                  neighbour_id:'',
                  neighbour_1_details:'',
                  neighbour_1_remark:'',
                  neighbour_2_details:'',
                  neighbour_2_remark:'', 

                  residential_details : {
                     residential_id:'',
                     name_of_person_met:'',
                     met_person_relation:'',
                     other_relation:'',
                     id_proof_seen:'',
                     member_count:'',
                     earning_member_count:'',
                     dependent_member_count:'',
                     total_stability:'',
                     stability_less_6_month_last_address_confirm:'',
                     residence_ownership:'',
                     residence_ownership_other:'',
                     agri_land_with_location:'',
                     applicant_working_company_name_location:'',
                     vehicle_details:'',
                     house_class_locality:'',
                     house_interior:'',
                     house_interior_other:'',
                     living_standard:'',
                     living_standard_other:'',
                     exterior_of_house:'',
                     remark:'',

                     res_address_id:'',
                     neighbour_1_details:'',
                     neighbour_1_remark:'',
                     neighbour_2_details:'',
                     neighbour_2_remark:'',
                     
                  },
                  case_status:'',
                  rejection_reason:'',
                  rejection_reason_other:'',
                  additional_remark:'',
                  additional_files:[],
                  
                  latitude:'',
                  longitute:'',
                  agent_response:'',
                  agent_signature:[]
               },
          }
       },
       props:{
           currenSelectedCase:{
               type: Number
           }
       },
       created(){
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
                     console.log(vm.case_data, vm.tat_hour, vm.tat_minute , 'I am all in');
               })
               .catch(function (error) {
                  console.log(error);
               });

         },
         setMyVariable(case_details){

            console.log(case_details, 'case details')

            this.product_name  = case_details.product ? case_details.product.name : case_details.category.name;

                if(case_details.is_rv == 1){
                     this.agentFeedBack.residential_details.residential_id = case_details.residential_details.id;
                     this.agentFeedBack.residential_details.name_of_person_met = case_details.residential_details.name_of_person_met;
                     this.agentFeedBack.residential_details.met_person_relation = case_details.residential_details.met_person_relation;
                     this.agentFeedBack.residential_details.other_relation = case_details.residential_details.other_relation;
                     this.agentFeedBack.residential_details.id_proof_seen = case_details.residential_details.id_proof_seen;
                     this.agentFeedBack.residential_details.member_count = case_details.residential_details.member_count;
                     this.agentFeedBack.residential_details.earning_member_count = case_details.residential_details.earning_member_count;
                     this.agentFeedBack.residential_details.dependent_member_count = case_details.residential_details.dependent_member_count;
                     this.agentFeedBack.residential_details.total_stability = case_details.residential_details.total_stability;
                     this.agentFeedBack.residential_details.stability_less_6_month_last_address_confirm = case_details.residential_details.stability_less_6_month_last_address_confirm;
                     this.agentFeedBack.residential_details.residence_ownership = case_details.residential_details.residence_ownership;
                     this.agentFeedBack.residential_details.residence_ownership_other = case_details.residential_details.residence_ownership_other;
                     this.agentFeedBack.residential_details.agri_land_with_location = case_details.residential_details.agri_land_with_location;
                     this.agentFeedBack.residential_details.applicant_working_company_name_location = case_details.residential_details.applicant_working_company_name_location;
                     this.agentFeedBack.residential_details.vehicle_details = case_details.residential_details.vehicle_details;
                     this.agentFeedBack.residential_details.house_class_locality = case_details.residential_details.house_class_locality;
                     this.agentFeedBack.residential_details.house_interior = case_details.residential_details.house_interior;
                     this.agentFeedBack.residential_details.house_interior_other = case_details.residential_details.house_interior_other;
                     this.agentFeedBack.residential_details.living_standard = case_details.residential_details.living_standard;
                     this.agentFeedBack.residential_details.living_standard_other = case_details.residential_details.living_standard_other;
                     this.agentFeedBack.residential_details.exterior_of_house = case_details.residential_details.exterior_of_house;
                     this.agentFeedBack.residential_details.remark = case_details.residential_details.remark;


                     this.agentFeedBack.residential_details.res_address_id = case_details.residential_neighbour[0].id;
                     this.agentFeedBack.residential_details.neighbour_1_details = case_details.residential_neighbour[0].neighbour_1_details;
                     this.agentFeedBack.residential_details.neighbour_1_remark = case_details.residential_neighbour[0].neighbour_1_remark;
                     this.agentFeedBack.residential_details.neighbour_2_details = case_details.residential_neighbour[0].neighbour_2_details
                     this.agentFeedBack.residential_details.neighbour_2_remark = case_details.residential_neighbour[0].neighbour_2_remark;
                }

            if(case_details.is_bv == 1){
               this.agentFeedBack.met_person_name = case_details.case_study.met_person_name;
               this.agentFeedBack.relation = case_details.case_study.relation;
               this.agentFeedBack.type_of_business = case_details.case_study.type_of_business;
                     if(case_details.case_study.type_of_business == 'service'){

                     this.agentFeedBack.service.service_id = case_details.service_details.id ;
                     this.agentFeedBack.service.working_since = case_details.service_details.working_since ;
                     this.agentFeedBack.service.designation = case_details.service_details.designation ;
                     this.agentFeedBack.service.department_room_number = case_details.service_details.department_room_number ;
                     this.agentFeedBack.service.employee_code = case_details.service_details.employee_code ;
                     this.agentFeedBack.service.company_nature_of_business = case_details.service_details.company_nature_of_business ;
                     this.agentFeedBack.service.drawing_salary_per_month = case_details.service_details.drawing_salary_per_month ;
                     this.agentFeedBack.service.id_proof_seen = case_details.service_details.id_proof_seen ;
                     this.agentFeedBack.service.employee_seen = case_details.service_details.employee_seen ;
                     this.agentFeedBack.service.signboard_seen_with_name = case_details.service_details.signboard_seen_with_name ;
                     this.agentFeedBack.service.exterior_off_floor = case_details.service_details.exterior_off_floor ;
                     this.agentFeedBack.service.remark = case_details.service_details.remark ;
                     
                     this.agentFeedBack.neighbour_id = case_details.office_neighbour[0].id;
                     this.agentFeedBack.neighbour_1_details = case_details.office_neighbour[0].neighbour_1_details;
                     this.agentFeedBack.neighbour_1_remark = case_details.office_neighbour[0].neighbour_1_remark;
                     this.agentFeedBack.neighbour_2_details = case_details.office_neighbour[0].neighbour_2_details;
                     this.agentFeedBack.neighbour_2_remark = case_details.office_neighbour[0].neighbour_2_remark;
                     
                     }else{

                     this.agentFeedBack.self_employed.self_employed_id =  case_details.self_employed.id;
                     this.agentFeedBack.self_employed.id_proof_seen =  case_details.self_employed.id_proof_seen;
                     this.agentFeedBack.self_employed.applicant_is =  case_details.self_employed.applicant_is;
                     this.agentFeedBack.self_employed.applicant_is_other =  case_details.self_employed.applicant_is_other;
                     this.agentFeedBack.self_employed.nature_of_business =  case_details.self_employed.nature_of_business;
                     this.agentFeedBack.self_employed.nature_of_business_other =  case_details.self_employed.nature_of_business_other;
                     this.agentFeedBack.self_employed.office_ownership =  case_details.self_employed.office_ownership;
                     this.agentFeedBack.self_employed.stability =  case_details.self_employed.stability;
                     this.agentFeedBack.self_employed.stability_other =  case_details.self_employed.stability_other;
                     this.agentFeedBack.self_employed.stocks =  case_details.self_employed.stocks;
                     this.agentFeedBack.self_employed.gst_bill_visiting_card_seen =  case_details.self_employed.gst_bill_visiting_card_seen;
                     this.agentFeedBack.self_employed.gst_bill_visiting_card_seen_details =  case_details.self_employed.gst_bill_visiting_card_seen_details;
                     this.agentFeedBack.self_employed.business_activity_level_seen =  case_details.self_employed.business_activity_level_seen;
                     this.agentFeedBack.self_employed.employee_seen =  case_details.self_employed.employee_seen;
                     this.agentFeedBack.self_employed.applicant_current_account_with_bank =  case_details.self_employed.applicant_current_account_with_bank;
                     this.agentFeedBack.self_employed.applicant_has_vehicle =  case_details.self_employed.applicant_has_vehicle;
                     this.agentFeedBack.self_employed.signboard_seen_with_name =  case_details.self_employed.signboard_seen_with_name;
                     this.agentFeedBack.self_employed.exterior_off_floor =  case_details.self_employed.exterior_off_floor;
                     this.agentFeedBack.self_employed.remark =  case_details.self_employed.remark;

                     this.agentFeedBack.neighbour_id = case_details.business_neighbour[0].id;
                     this.agentFeedBack.neighbour_1_details = case_details.business_neighbour[0].neighbour_1_details;
                     this.agentFeedBack.neighbour_1_remark = case_details.business_neighbour[0].neighbour_1_remark;
                     this.agentFeedBack.neighbour_2_details = case_details.business_neighbour[0].neighbour_2_details;
                     this.agentFeedBack.neighbour_2_remark = case_details.business_neighbour[0].neighbour_2_remark;
                     }
            }

            this.agentFeedBack.case_status = case_details.case_study.case_status;
            this.agentFeedBack.case_study_id = case_details.case_study.id;

            this.agentFeedBack.latitude = case_details.latitude;
            this.agentFeedBack.longitute = case_details.longitute;
            this.agentFeedBack.rejection_reason_other= case_details.case_study.rejection_reason_other;
            this.agentFeedBack.rejection_reason= case_details.case_study.rejection_reason;
            
            this.agentFeedBack.additional_remark= case_details.case_study.additional_remark;
            this.agentFeedBack.application_dob= case_details.case_study.application_dob;
            this.agentFeedBack.additional_files = case_details.submited_files && case_details.submited_files[0] ? case_details.submited_files:[];
            this.agentFeedBack.agent_signature = (case_details.signature && case_details.signature[0])? case_details.signature[0]['name']:'';

            
         },
         updateData(){
            let vm = this;
            let formData = new FormData();
            for ( var key in this.agentFeedBack ) {
               if(key == 'self_employed' || key == 'service' || key == 'residential_details'){
                  formData.append(key, JSON.stringify(this.agentFeedBack[key]));
               }else{
                  formData.append(key, this.agentFeedBack[key]); 
               }
            }
            formData.append('case_id', this.currenSelectedCase); 
            try{
               axios.post('https://severify.com/api/update-case-study', formData)
               .then(function (response) {
                  console.log(response, 'test function test');
                  vm.$toast.open({
                     message:response.data.message,
                     type:response.data.status?'success':'error',
                     position:'top-right',
                     duration:3000,
                     dismissible:true
                  });                  
                  vm.closeModal();
               })
               .catch(function (error) {
                  console.log(error);
               });

            } catch(error){

            }

         },
         closeModal(){
            this.$emit('closeModal', 'Value if required')
         }
       }
   
   }
</script>