<template>
  <CRow>
    <!-- <CCol sm="6" lg="3">
      <CWidgetDropdown color="dark" :header="total_case" text="Total Cases">
        <template #default>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" :header="active_case" text="Active Cases">
        <template #default>
          
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 }}}"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header="positive_verified" text="Positive Verified"
      >
        <template #default>
        </template>
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height:70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 }}}"
            point-hover-background-color="warning"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="danger" :header="open_case" text="N/A Cases">
        <template #default>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol> -->
    <!-- TEst TEst  -->
    <CCol class="handPointer" sm="6" md="3"   v-for="(row, index) in company_wise"
        :key="index" v-on:click="goToAllListing(row)">
        <CWidgetProgressIcon
        
        
          :header="row.total"
          :text="row.company ? row.company.name : 'Not Assignet'"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-speedometer" :height="36"/>
        </CWidgetProgressIcon>
      </CCol>
    
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'
import axios from 'axios';

export default {
  name: 'WidgetsDropdown',
  data(){
    return {
      total_case : 0,
      active_case : 0,
      positive_verified : 0,
      open_case : 0,
      company_wise:{}

    }
  },
  components: { CChartLineSimple, CChartBarSimple },
  created(){    
          axios.get("https://severify.com/api/dashboard")
           .then(response => {
             let data = response.data.data;

             console.log(response);
              this.total_case = data.total_case?data.total_case:'0';
              this.active_case= data.active_case?data.active_case:'0';
              this.positive_verified= data.positive_verified?data.positive_verified:'0';
              this.open_case= data.open_case?data.open_case:'0';
              this.company_wise= data.company_wise;
             
           });       
      },
      methods: {
        goToAllListing(item){
          this.$router.push(
               { 
                  name: 'List All' , 
                  query: {
                     company_id:item.company_id

                  }
            });
        }
      }
}
</script>
