<template>
<div class="overlay">
  <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Get Clone</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ... {{ currenSelectedCase }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeModal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
    data () {
       return {
           
       }
    },
    props:{
        currenSelectedCase:{
            type: Number
        }
    },
    methods:{
        closeModal(){
            this.$emit('closeModal', 'Value if required')
        }
    }

}
</script>