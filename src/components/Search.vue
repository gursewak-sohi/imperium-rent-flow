<script setup>
import FilterInput from './FilterInput.vue'
import JetType from './JetType.vue'
import SelectedJet from './SelectedJet.vue'
</script>
<template>
     <section class="search-section">
            <div class="container">
                <div class="mega-search">
                    <div id="searchTypeBlock" class="radio-options">
                        <div class="radio-unit">
                            <input id="oneWay" type="radio" value="one-way" name="flight-type" checked />
                            <label for="oneWay">
                                <span></span>One way
                        </label>
                        </div>
                        <div class="radio-unit">
                            <input id="roundTrip" type="radio" value="round-trip" name="flight-type" />
                            <label for="roundTrip">
                                <span></span>Round trip
                            </label>
                        </div>
                        <div class="radio-unit">
                            <input id="multiTrip" type="radio" value="multi-trip" name="flight-type" />
                            <label for="multiTrip">
                                <span></span>Multi trip
                            </label>
                        </div>
                    </div>
                    <!-- Round Trip -->
                    <FilterInput/>

                    <!-- Jet Type -->
                    <JetType/>
                    <!-- Selected Jet  -->
                    <SelectedJet/>
                </div>
            </div>
        </section>
</template>